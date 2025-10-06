'use client';

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faUserShield, faLock, faEye, faCookie, faEnvelope, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function PrivacyPage() {
    const privacyPrinciples = [
        {
            icon: faUserShield,
            title: "Data Protection",
            description: "Your personal information is encrypted and securely stored"
        },
        {
            icon: faLock,
            title: "Secure Transactions",
            description: "All payments are processed through secure, encrypted channels"
        },
        {
            icon: faEye,
            title: "Transparency",
            description: "We clearly explain how we collect and use your information"
        },
        {
            icon: faCookie,
            title: "Cookie Control",
            description: "You have full control over cookie preferences and tracking"
        }
    ];

    const dataTypes = [
        {
            category: "Personal Information",
            items: ["Name, email address, phone number", "Shipping and billing addresses", "Account credentials and preferences"]
        },
        {
            category: "Transaction Data", 
            items: ["Purchase history and order details", "Payment information (securely processed)", "Shipping and delivery information"]
        },
        {
            category: "Usage Information",
            items: ["Website browsing patterns", "Product preferences and wishlist", "Customer service interactions"]
        }
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
                    <FontAwesomeIcon icon={faShieldAlt} className="w-8 h-8 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
                </p>
                <div className="text-sm text-gray-500 mt-4">
                    Last updated: January 2025
                </div>
            </motion.div>

            {/* Privacy Principles */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Our Privacy Principles
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {privacyPrinciples.map((principle, index) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={principle.icon} className="w-6 h-6 text-main-color" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{principle.title}</h3>
                            <p className="text-gray-600 text-sm">{principle.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Information We Collect
                </motion.h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {dataTypes.map((type, index) => (
                        <motion.div
                            key={type.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6"
                        >
                            <h3 className="text-base font-semibold text-gray-900 mb-4">{type.category}</h3>
                            <ul className="space-y-2">
                                {type.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="flex items-start gap-2">
                                        <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-main-color mt-1 flex-shrink-0" />
                                        <span className="text-gray-600 text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Privacy Sections */}
            <div className="space-y-8 mb-12">
                {[
                    {
                        title: "How We Use Your Information",
                        content: "We use your personal information to process orders, provide customer support, improve our services, send important updates about your orders, and offer personalized recommendations. We never sell your personal information to third parties."
                    },
                    {
                        title: "Information Sharing",
                        content: "We only share your information with trusted service providers who help us operate our business (payment processors, shipping companies, customer service platforms). All partners are bound by strict confidentiality agreements."
                    },
                    {
                        title: "Data Security",
                        content: "We implement industry-standard security measures including SSL encryption, secure servers, regular security audits, and access controls. Your payment information is processed through PCI-compliant payment processors."
                    },
                    {
                        title: "Your Rights",
                        content: "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications and request data portability. Contact us to exercise these rights."
                    },
                    {
                        title: "Cookies and Tracking",
                        content: "We use cookies to improve your browsing experience, remember your preferences, and analyze website traffic. You can control cookie settings through your browser preferences."
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

            {/* Contact for Privacy */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
            >
                <FontAwesomeIcon icon={faEnvelope} className="w-12 h-12 text-main-color mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy Questions?</h3>
                <p className="text-gray-600 mb-6">
                    If you have any questions about our privacy practices or want to exercise your privacy rights, we&apos;re here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:privacy@dharmzeey.com" className="btn-primary">
                        Contact Privacy Team
                    </a>
                    <a href="tel:+2348067414548" className="btn-secondary">
                        Call Support
                    </a>
                </div>
            </motion.div>
        </div>
    );
}