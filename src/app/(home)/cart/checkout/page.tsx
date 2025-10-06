'use client';

import { checkoutDetailsApi, checkoutItemsApi } from "@/services/cartApis";
import { CheckoutDetails, CheckoutItemsData } from "@/types/cartInterfaces";
import { numberWithCommas } from "@/utils/filter";
import { useEffect, useState } from "react"
import Loading from "../../loading";
import CheckoutItem from "@/components/cart/checkoutItem";
import { usePathname, useRouter } from "next/navigation";
import NewDeliveryInfo from "@/components/cart/newDeliveryInfo";
import DefaultDeliveryInfo from "@/components/cart/defaultDeliveryInfo";
import { resendEmailVerificationApi } from "@/services/authApis";
import { EmptyCart } from "@/components/cart/emptyCart";

export default function CheckoutPage() {
    const router = useRouter();
    const pathName = usePathname();
    const [grandTotalPrice, setGrandTotalPrice] = useState<number>(); // This will also take into delivery fee
    const [totalPrice, setTotalPrice] = useState<number>(); // This is without delivery fee
    const [deliveryFee, setDeliveryFee] = useState<number>(0); // This is delivery fee
    const [checkoutData, setCheckoutData] = useState<CheckoutItemsData[]>();
    const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>();
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [selectedDelivery, setSelectedDelivery] = useState(""); // Track selected delivery



    useEffect(() => {
        async function fetchCheckout() {
            const response = await checkoutItemsApi();
            if (response.status === 200) {
                setGrandTotalPrice(response.data.grand_total)
                setTotalPrice(response.data.grand_total)
                setCheckoutData(response.data.item_list)
                setIsLoading(false)
            }
            setIsLoading(false)
        }
        fetchCheckout()
    }, [])

    useEffect(() => {
        async function verifyUser() {
            // this will send a code to the user and then they must verify
            await resendEmailVerificationApi()
            router.push("/email-verification/confirm")
        }

        async function fetchCheckoutDetails() {
            const response = await checkoutDetailsApi();
            if (response.status === 404) {
                alert("You have not filled you Basic / Address information")
                router.push('/account')
                setIsLoading(false)
            } else if (response.status === 403) {
                verifyUser()
                setIsLoading(false)
            } else if (response.status === 401) {
                router.push(`/login?callbackUrl=${encodeURIComponent(pathName!)}`);
            }
            setCheckoutDetails(response.data)
            setIsLoading(false)
        }
        fetchCheckoutDetails()
    }, [router, pathName])

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDelivery(event.target.value); // Update selected delivery option
    };

    const updateGrandTotalPrice = (deliveryFee: string) => {
        setDeliveryFee(parseInt(deliveryFee))
        setGrandTotalPrice(totalPrice! + parseInt(deliveryFee));
    };

    return (
        <div className="p-5 md:p-10 container-width">
            {
                isLoading ?
                    <Loading />
                    :
                    (
                        <>
                            {grandTotalPrice && grandTotalPrice > 0 ?
                                <>
                                    <h1 className="font-bold mb-2 text-secondary-gray-color text-lg">Order Information</h1>
                                    <div className="flex justify-between font-bold mb-2 text-lg">
                                        <span>Total</span>
                                        <span className="text-main-color font-semibold">₦ {numberWithCommas(grandTotalPrice)}</span>
                                    </div>
                                </>
                                :
                                <></> // added this so as not to show 0
                            }
                            {
                                checkoutData !== undefined && checkoutData.length > 0 ?
                                    <>
                                        <div className="leading-6">
                                            {
                                                checkoutData.map(
                                                    (checkoutItem) => <CheckoutItem
                                                        key={checkoutItem.cart_item_id}
                                                        cartItem={checkoutItem} />
                                                )
                                            }
                                        </div>
                                        {
                                            deliveryFee > 0 &&
                                            <div className="my-3 flex justify-between font-bold text-lg text-secondary-color">
                                                <div>Delivery Fee: </div>
                                                <div>₦  {numberWithCommas(deliveryFee)}</div>
                                            </div>
                                        }
                                        {/* Delivery Information */}
                                        <h1 className="font-bold my-2 text-secondary-gray-color text-lg">Delivery Information</h1>
                                        <section className="flex flex-col gap-3">
                                            <div>
                                                <label htmlFor="default-delivery" className="flex gap-1 font-bold mb-2">
                                                    <input
                                                        type="radio"
                                                        name="delivery"
                                                        value="default-delivery"
                                                        id="default-delivery"
                                                        onChange={handleDeliveryChange}
                                                    />
                                                    <span>Use default delivery address</span>
                                                </label>
                                                {selectedDelivery === "default-delivery" && checkoutDetails && (
                                                    <DefaultDeliveryInfo
                                                        checkoutDetails={checkoutDetails}
                                                        updateGrandTotalPrice={updateGrandTotalPrice}
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="new-delivery" className="flex gap-1 font-bold mt-1">
                                                    <input
                                                        type="radio"
                                                        name="delivery"
                                                        value="new-delivery"
                                                        id="new-delivery"
                                                        onChange={handleDeliveryChange}
                                                    />
                                                    <span>Use another delivery address</span>
                                                </label>
                                                {selectedDelivery === "new-delivery" && <NewDeliveryInfo updateGrandTotalPrice={updateGrandTotalPrice} />}
                                            </div>
                                        </section>
                                    </>
                                    :
                                    <>
                                        <EmptyCart />
                                    </>
                            }
                        </>
                    )

            }
        </div>
    )
}