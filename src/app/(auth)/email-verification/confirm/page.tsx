"use client";

import { verifyCode } from "@/actions/authActions";
import { SubmitButton } from "@/components/submitButton";
import { EditableInputFIeld } from "@/components/interractivity/input";
import { resendEmailVerificationApi } from "@/services/authApis";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import { toast } from "react-toastify";
import { ZodIssue } from "zod";

const initialState = {
  message: "",
  error: undefined,
};

export default function EmailVerification() {
  const pathName = usePathname();
  const [state, formAction] = useActionState(verifyCode, initialState);
  const [errors, setErrors] = useState<ZodIssue[] | undefined>([]);
  const router = useRouter();
  const [resetEmailCount, setResetEmailCount] = useState(0);

  useEffect(() => {
    if (state.status === 200) {
      router.push("/");
    } else if (state.status === 401) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathName!)}`);
    }
  }, [state, router, pathName]);

  // Countdown logic
  useEffect(() => {
    if (resetEmailCount > 0) {
      const timer = setTimeout(() => setResetEmailCount(resetEmailCount - 1), 1000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [resetEmailCount]);

  useEffect(() => {
    setErrors(state.errors)
  }, [state])

  const getErrorForField = (fieldName: string) => {
    return errors?.filter((error) => error.path.includes(fieldName)).map((error) => error.message).join(', '); // Combines multiple messages if any
  };


  async function handleResendEmailVerification() {
    const response = await resendEmailVerificationApi();
    if (response.message === "Email has already been verified") {
      toast.success(`${response.message}`, {
        position: "top-center",
        className: "my-toast",
      });
      router.push("/");
    } else if (response.message === "You need to login first") {
      alert(`${response.message}`)
      toast.info(`${response.message}`, {
        position: "top-center",
        className: "my-toast",
      });
      router.push("/login");
    } else {
      setResetEmailCount(120);
      toast.info(`${response.message}`, {
        position: "top-center",
        className: "my-toast",
      });
    }
  }


  return (
    <>
      <form action={formAction}>
        {/* email */}
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
              onClick={handleResendEmailVerification}
            >
              Resend code
            </button>
            {resetEmailCount > 0 && <span> ({resetEmailCount} sec)</span>}{" "}
            {/* Show countdown */}
          </div>
        </div>
        {/* Phone number */}
        {/* <div>
          <InputFIeld
            inputFor="email-pin"
            inputText="Code Sent to Phone Number"
            inputType="text"
            inputId="email-pin"
            inputName="email-pin"
            required
          />
          <div className="text-right">
            <button
              disabled={resetEmailCount > 0} // Disable button when countdown is active
              type="button"
              className={`text-blue-700 underline ${
                resetEmailCount > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleResendEmailVerification}
            >
              Resend code
            </button>
            {resetEmailCount > 0 && <span> ({resetEmailCount} sec)</span>}{" "}
          </div>
        </div> */}
        <SubmitButton pendingText="Verifying..." buttonText="verify code" />
        {/* Display feedback message */}
        <p aria-live="polite" className="sr-onl text-red-600" role="status">
          {state.error} {state.message}
        </p>
      </form>
    </>
  );
}
