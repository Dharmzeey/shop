'use client';

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faEnvelope, faMapMarkerAlt, faClock, faQuestionCircle, faTools, faHeadset } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SupportPage() {
    const contactMethods = [
        {
            icon: faPhoneVolume,
            title: "Phone Support",
            description: "Speak directly with our support team",
            contact: "+234 806 741 4548",
            availability: "Mon-Sat: 9AM-6PM",
            action: "tel:+2348067414548"
        },
        {
            icon: faEnvelope,
            title: "Email Support", 
            description: "Send us your questions anytime",
            contact: "support@dharmzeey.com",
            availability: "24/7 Response",
            action: "mailto:support@dharmzeey.com"
        },
        {
            icon: faMapMarkerAlt,
            title: "Visit Our Store",
            description: "Get hands-on help at our locations",
            contact: "Shop 9, F. Abel Complex, Iwo Road",
            availability: "Mon-Sat: 9AM-6PM",
            action: "#"
        }
    ];

    const faqItems = [
        {
            question: "What warranty do you offer on products?",
            answer: "All brand new products come with manufacturer warranty. UK/US used items have 6-month warranty, while certified pre-owned devices have 3-month warranty."
        },
        {
            question: "Do you offer delivery services?",
            answer: "Yes! We offer free delivery within Ibadan and paid delivery to other states. Delivery typically takes 1-3 business days within Lagos."
        },
        {
            question: "Can I trade in my old device?",
            answer: "Absolutely! We have a comprehensive trade-in program. Bring your old device and we'll evaluate it for trade-in value towards your new purchase."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept bank transfers, card payments, and cash payments. Online payments are processed securely through Paystack."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is confirmed, you'll receive tracking information via email and SMS. You can also check your order status in your account dashboard."
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
                    <FontAwesomeIcon icon={faHeadset} className="w-8 h-8 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customer Support</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We&apos;re here to help! Get in touch with our support team for any questions about products, orders, or technical assistance.
                </p>
            </motion.div>

            {/* Contact Methods */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Get In Touch
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactMethods.map((method, index) => (
                        <motion.div
                            key={method.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6 text-center hover:shadow-lg transition-all duration-200"
                        >
                            <div className="w-16 h-16 bg-main-color/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={method.icon} className="w-8 h-8 text-main-color" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                            <div className="space-y-2">
                                <a 
                                    href={method.action}
                                    className="block text-main-color font-medium hover:text-orange-600 transition-colors duration-200"
                                >
                                    {method.contact}
                                </a>
                                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                                    <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                                    <span>{method.availability}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Frequently Asked Questions
                </motion.h2>
                
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-main-color/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="w-4 h-4 text-main-color" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">{item.question}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Additional Help */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="mt-16 text-center bg-gray-50 rounded-2xl p-8"
            >
                <FontAwesomeIcon icon={faTools} className="w-12 h-12 text-main-color mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Still Need Help?</h3>
                <p className="text-gray-600 mb-6">
                    Can&apos;t find what you&apos;wwre looking for? Our technical support team is ready to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/account" className="btn-primary">
                        Check Your Account
                    </Link>
                    <a href="mailto:support@dharmzeey.com" className="btn-secondary">
                        Email Technical Support
                    </a>
                </div>
            </motion.div>
        </div>
    );
}