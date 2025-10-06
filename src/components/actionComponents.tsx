'use client';

import Link from "next/link";
import { motion } from "framer-motion";

type ActionButtonProp = {
    buttonText: string;
    buttonBgColor: "bg-main-color" | "bg-[#f00]" | "bg-secondary-color";
    onClickFn: () => void;
};

type ActionLinkProp = {
    linkUrl: string;
    linkText: string;
    buttonBgColor: "bg-main-color" | "bg-secondary-color";
};

function ActionButton(buttonProp: ActionButtonProp) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-sm"
        >
            <button
                onClick={buttonProp.onClickFn}
                className={`${buttonProp.buttonBgColor} hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl w-full transition-all duration-200 shadow-lg hover:shadow-xl`}
            >
                {buttonProp.buttonText.toUpperCase()}
            </button>
        </motion.div>
    );
}

function ActionLink(linkProp: ActionLinkProp) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full max-w-sm"
        >
            <Link
                href={linkProp.linkUrl}
                className={`${linkProp.buttonBgColor} hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl w-full transition-all duration-200 shadow-lg hover:shadow-xl block text-center`}
            >
                {linkProp.linkText.toUpperCase()}
            </Link>
        </motion.div>
    );
}

export { ActionButton, ActionLink };