'use client';

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faShoppingCart, faShieldAlt, faExclamationTriangle, faGavel, faHandshake, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function TermsPage() {
    const termsSections = [
        {
            icon: faShoppingCart,
            title: "Purchase Terms",
            content: "All purchases are subject to product availability. Prices are subject to change without notice. We reserve the right to limit quantities and refuse service. Payment must be received before product shipment."
        },
        {
            icon: faShieldAlt,
            title: "Product Warranties",
            content: "Warranty terms vary by product type and condition. Brand new items include manufacturer warranty. Used items come with our store warranty. Warranty does not cover damage from misuse, accidents, or normal wear and tear."
        },
        {
            icon: faExclamationTriangle,
            title: "Limitation of Liability",
            content: "Our liability is limited to the purchase price of the product. We are not responsible for indirect, incidental, or consequential damages. Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you."
        },
        {
            icon: faGavel,
            title: "Dispute Resolution",
            content: "Any disputes will be resolved through binding arbitration in accordance with Nigerian law. You agree to resolve disputes individually and waive any right to class action proceedings."
        }
    ];

    const userResponsibilities = [
        "Provide accurate and complete information",
        "Use products in accordance with manufacturer guidelines",
        "Report any issues or defects promptly",
        "Maintain confidentiality of account credentials",
        "Comply with all applicable laws and regulations",
        "Respect intellectual property rights"
    ];

    const prohibitedUses = [
        "Reselling products for commercial purposes without authorization",
        "Using our services for illegal or unauthorized purposes",
        "Attempting to gain unauthorized access to our systems",
        "Interfering with the proper functioning of our website",
        "Posting false or misleading information",
        "Violating any applicable laws or regulations"
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
                    <FontAwesomeIcon icon={faFileContract} className="w-8 h-8 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Terms of Service</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Please read these terms carefully before using our services. By using Dharmzeey shop, you agree to be bound by these terms.
                </p>
                <div className="text-sm text-gray-500 mt-4">
                    Effective Date: October 1, 2025
                </div>
            </motion.div>

            {/* Agreement Notice */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-12"
            >
                <div className="flex items-start gap-4">
                    <FontAwesomeIcon icon={faHandshake} className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                        <h3 className="text-base font-semibold text-blue-900 mb-2">Agreement to Terms</h3>
                        <p className="text-blue-800 text-sm">
                            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
                            If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Key Terms */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Key Terms & Conditions
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {termsSections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-main-color/10 rounded-lg flex items-center justify-center">
                                    <FontAwesomeIcon icon={section.icon} className="w-5 h-5 text-main-color" />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* User Responsibilities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="card p-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <FontAwesomeIcon icon={faHandshake} className="w-5 h-5 text-green-500" />
                        Your Responsibilities
                    </h3>
                    <ul className="space-y-3">
                        {userResponsibilities.map((responsibility, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faHandshake} className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{responsibility}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="card p-6"
                >
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5 text-red-500" />
                        Prohibited Uses
                    </h3>
                    <ul className="space-y-3">
                        {prohibitedUses.map((use, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{use}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Additional Terms */}
            <div className="space-y-6 mb-12">
                {[
                    {
                        title: "Intellectual Property",
                        content: "All content on this website, including text, graphics, logos, and images, is the property of Dharmzeey Shop and is protected by copyright and trademark laws. You may not use our content without written permission."
                    },
                    {
                        title: "Privacy and Data Protection",
                        content: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to our privacy practices."
                    },
                    {
                        title: "Modifications to Terms",
                        content: "We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date. Your continued use of our services after changes constitutes acceptance of the new terms."
                    },
                    {
                        title: "Governing Law",
                        content: "These terms are governed by the laws of the Federal Republic of Nigeria. Any legal proceedings will be conducted in the appropriate courts of Nigeria."
                    }
                ].map((section, index) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="card p-6"
                    >
                        <h3 className="text-base font-semibold text-gray-900 mb-3">{section.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                    </motion.div>
                ))}
            </div>

            {/* Contact */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
            >
                <FontAwesomeIcon icon={faEnvelope} className="w-12 h-12 text-main-color mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Questions About Our Terms?</h3>
                <p className="text-gray-600 mb-6">
                    If you have any questions about these terms of service, please don&apos;t hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:legal@dharmzeey.com" className="btn-primary">
                        Email Legal Team
                    </a>
                    <a href="tel:+2348067414548" className="btn-secondary">
                        Call Support
                    </a>
                </div>
            </motion.div>
        </div>
    );
}