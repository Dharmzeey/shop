import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";

type SubmitButtonProp = {
  buttonText: string;
  pendingText: string;
};

export function SubmitButton(buttonProp: SubmitButtonProp) {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-center mt-8">
      <motion.button
        whileHover={{ scale: pending ? 1 : 1.02 }}
        whileTap={{ scale: pending ? 1 : 0.98 }}
        type="submit"
        aria-disabled={pending}
        disabled={pending}
        className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
      >
        {pending && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        )}
        <span className="relative z-10">
          {pending ? buttonProp.pendingText : buttonProp.buttonText.toUpperCase()}
        </span>
      </motion.button>
    </div>
  );
}