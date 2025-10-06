"use client";
import { initiatePaymentApi } from "@/services/paymentApis";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Payment() {
    const router = useRouter();
    const pathName = usePathname();
    const [accessCode, setAccessCode] = useState<string | undefined>(undefined);
    const [initializing, setInitializing] = useState<boolean>(true);
    const [processing, setProcessing] = useState<boolean>(false);

    useEffect(() => {
        async function initiatePayment() {
            const response = await initiatePaymentApi();
            if (response.status === 200) {
                setAccessCode(response.data);
            } else if (response.status === 404) {
                alert("No items in cart to be paid for, keep shopping");
                router.push("/");
            } else if (response.status === 401) {
                router.push(`/login?callbackUrl=${encodeURIComponent(pathName!)}`);
            }
            setInitializing(false);
            setProcessing(true);
        }
        initiatePayment();
    }, [router, pathName]);

    useEffect(() => {
        async function loadPaystackAndProcess() {
            if (accessCode !== undefined) {
                // Dynamically import PaystackPop only on the client side
                const PaystackPop = (await import("@paystack/inline-js")).default;
                const popup = new PaystackPop();
                const paymentStatus = popup.resumeTransaction(accessCode as string);

                setProcessing(false);
                // router.push('/account/orders/pending')
            }
        }
        loadPaystackAndProcess();
    }, [accessCode, router]);

    return (
        <div className="p-5 md:p-10 container-width min-h-[50vh] flex justify-center items-center">
            {initializing ? (
                <h1>Initializing...</h1>
            ) : processing ? (
                <h1>Processing...</h1>
            ) : (
                <b></b>
            )}
        </div>
    );
}
