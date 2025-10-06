'use client';

import { faBox, faCheckCircle, faUndo, faShieldAlt, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";



export default function ReturnsPage() {
    const returnSteps = [
        {
            icon: faBox,
            title: "Contact Us",
            description: "Reach out within 30 days of purchase to initiate your return"
        },
        {
            icon: faCheckCircle,
            title: "Get Approval",
            description: "We'll review your request and provide return instructions"
        },
        {
            icon: faUndo,
            title: "Ship Item Back",
            description: "Package the item securely and ship it back to us"
        },
        {
            icon: faShieldAlt,
            title: "Receive Refund",
            description: "Get your refund within 5-7 business days after we receive the item"
        }
    ];

    const returnConditions = [
        "Item must be in original condition with all accessories",
        "Original packaging and documentation required",
        "No physical damage or signs of misuse",
        "Return initiated within 30 days of purchase",
        "Proof of purchase (receipt or order confirmation)"
    ];

    const nonReturnableItems = [
        "Items damaged by customer misuse",
        "Products with missing accessories or parts",
        "Items purchased more than 30 days ago",
        "Customized or personalized products",
        "Software or digital products"
    ];

    return (
        <div className="container-width section-padding py-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FontAwesomeIcon icon={faUndo} className="w-8 h-8 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Returns & Exchanges</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We want you to be completely satisfied with your purchase. If you&apos;re not happy, we&apos;re here to help with our hassle-free return policy.
                </p>
            </motion.div>

            {/* Return Policy Highlight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-main-color to-orange-600 rounded-2xl p-8 text-white text-center mb-12"
            >
                <h2 className="text-xl font-bold mb-2">30-Day Return Policy</h2>
                <p className="text-lg opacity-90">
                    Return any item within 30 days for a full refund or exchange
                </p>
            </motion.div>

            {/* Return Process */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    How to Return an Item
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {returnSteps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="text-center"
                        >
                            <div className="relative mb-4">
                                <div className="w-16 h-16 bg-main-color/10 rounded-2xl flex items-center justify-center mx-auto">
                                    <FontAwesomeIcon icon={step.icon} className="w-8 h-8 text-main-color" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-main-color text-white rounded-full flex items-center justify-center text-sm font-bold">
                                    {index + 1}
                                </div>
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Return Conditions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Returnable Items */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-green-500" />
                        <h3 className="text-lg font-bold text-gray-900">Return Requirements</h3>
                    </div>
                    <ul className="space-y-3">
                        {returnConditions.map((condition, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{condition}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Non-Returnable Items */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="w-6 h-6 text-red-500" />
                        <h3 className="text-lg font-bold text-gray-900">Non-Returnable Items</h3>
                    </div>
                    <ul className="space-y-3">
                        {nonReturnableItems.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Contact for Returns */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Start a Return?</h3>
                <p className="text-gray-600 mb-6">
                    Contact our support team to begin the return process. We&apos;ll guide you through every step.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+2348067414548" className="btn-primary">
                        Call Support
                    </a>
                    <a href="mailto:support@dharmzeey.com" className="btn-secondary">
                        Email Us
                    </a>
                </div>
            </motion.div>
        </div>
    );
}