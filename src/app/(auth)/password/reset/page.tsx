"use client";

import { verifyResetCode } from "@/actions/authActions";
import { SubmitButton } from "@/components/submitButton";
import { EditableInputFIeld } from "@/components/interractivity/input";
import { forgotPasswordApi } from "@/services/authApis";
import { useRouter } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import { toast} from "react-toastify";
import { ZodIssue } from "zod";

const initialState = {
    message: "",
};

export default function ResetPasswordCode() {
    const [state, formAction] = useActionState(verifyResetCode, initialState);
    const router = useRouter();
    const [resetEmailCount, setResetEmailCount] = useState(0);
    const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
    const [resetEmail, setResetEmail] = useState<string | null>(null);
    const [resetToken, setResetToken] = useState<string | null>(null);

    useEffect(() => {
        // Check if the reset data exist
        const email = localStorage.getItem('resetEmail');
        const token = localStorage.getItem('resetToken');

        if (!email || !token) {
            // Redirect back to forgot password if data is missing
            router.push('/password/forgot');
            return;
        }

        // Set localStorage values into state
        setResetEmail(email);
        setResetToken(token);
    }, [router]);

    useEffect(() => {
        if (state.status === 200) {
            // Store the new reset token for the final step
            if (state.token) {
                localStorage.setItem('resetToken', state.token);
                toast.success(`${state.message}`, {
                    position: "top-center",
                    className: "my-toast",
                });
                router.push("/password/new");
            }
        }
    }, [state, router]);

    // Countdown logic for resending the reset code
    useEffect(() => {
        if (resetEmailCount > 0) {
            const timer = setTimeout(
                () => setResetEmailCount(resetEmailCount - 1),
                1000
            );
            return () => clearTimeout(timer); // Clean up the timer
        }
    }, [resetEmailCount]);

    // Handle resend password reset logic
    async function handleResendPasswordReset() {
        const response = await forgotPasswordApi({ email: resetEmail! }); // Include email in the API call bang operator becasue the resetEmail has been checked in the onclick
        if (response.status === 201) {
            toast.success(`${response.message}`, {
                position: "top-center",
                className: "my-toast",
            });
            router.push("/");
        } else if (response.status === 401) {
            toast.info(`${response.message}`, {
                position: "top-center",
                className: "my-toast",
            });
            router.push("/login");
        } else {
            setResetEmailCount(120); // Set timer for resend button
            toast.info(`${response.message}`, {
                position: "top-center",
                className: "my-toast",
            });
        }
    }

    useEffect(() => {
        setErrors(state.errors)
    }, [state])

    const getErrorForField = (fieldName: string) => {
        return errors?.filter((error) => error.path.includes(fieldName)).map((error) => error.message).join(', '); // Combines multiple messages if any
    };


    return (
        <>
            <form action={formAction}>
                {/* Email PIN input */}
                <div>
                    <EditableInputFIeld
                        inputFor="email-pin"
                        inputText="Code Sent to Email"
                        inputType="text"
                        inputId="email-pin"
                        inputName="email-pin"
                        required
                        error={getErrorForField('email_pin')}
                    />
                    <div className="text-right">
                        <button
                            disabled={resetEmailCount > 0} // Disable button when countdown is active
                            type="button"
                            className={`text-blue-700 underline ${resetEmailCount > 0 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={resetEmail ? handleResendPasswordReset : undefined}
                        >
                            Resend code
                        </button>
                        {resetEmailCount > 0 && <span> ({resetEmailCount} sec)</span>}{" "}
                        {/* Show countdown */}
                    </div>
                </div>

                {/* Include hidden inputs for resetEmail and resetToken */}
                <input type="hidden" name="reset-email" value={resetEmail || ""} />
                <input type="hidden" name="reset-token" value={resetToken || ""} />

                {/* Submit Button */}
                <SubmitButton pendingText="Verifying..." buttonText="verify code" />

                {/* Display feedback message */}
                <p aria-live="polite" className="sr-onl text-red-600" role="status">
                    {state?.message} {state?.error}
                </p>
            </form>
        </>
    );
}
