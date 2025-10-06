'use client';

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faCertificate, faTools, faPhone, faCalendarAlt, faCheckCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function WarrantyPage() {
    const warrantyTypes = [
        {
            icon: faCertificate,
            title: "Brand New Products",
            duration: "1-2 Years",
            description: "Full manufacturer warranty with international coverage",
            color: "from-green-500 to-emerald-600"
        },
        {
            icon: faShieldAlt,
            title: "UK/US Used",
            duration: "6 Months",
            description: "Comprehensive warranty covering major components",
            color: "from-blue-500 to-indigo-600"
        },
        {
            icon: faTools,
            title: "Certified Pre-Owned",
            duration: "3 Months",
            description: "Quality assurance warranty for tested devices",
            color: "from-orange-500 to-red-500"
        }
    ];

    const warrantyCovers = [
        "Manufacturing defects and hardware failures",
        "Software issues and system malfunctions", 
        "Battery performance problems",
        "Display and screen defects",
        "Audio and speaker issues",
        "Charging port and connectivity problems"
    ];

    const warrantyExcludes = [
        "Physical damage from drops or impacts",
        "Water damage or liquid exposure",
        "Damage from unauthorized repairs",
        "Normal wear and tear",
        "Cosmetic damage that doesn't affect functionality",
        "Damage from misuse or abuse"
    ];

    const claimSteps = [
        {
            step: "1",
            title: "Contact Support",
            description: "Reach out to our warranty team with your issue"
        },
        {
            step: "2", 
            title: "Provide Details",
            description: "Share purchase receipt and describe the problem"
        },
        {
            step: "3",
            title: "Assessment",
            description: "Our technicians will evaluate the device"
        },
        {
            step: "4",
            title: "Resolution",
            description: "Repair, replace, or refund based on warranty terms"
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
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Warranty Information</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    We stand behind the quality of our products. Learn about our comprehensive warranty coverage and how to make a claim.
                </p>
            </motion.div>

            {/* Warranty Types */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Warranty Coverage
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {warrantyTypes.map((warranty, index) => (
                        <motion.div
                            key={warranty.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card overflow-hidden"
                        >
                            <div className={`bg-gradient-to-r ${warranty.color} p-6 text-white text-center`}>
                                <FontAwesomeIcon icon={warranty.icon} className="w-12 h-12 mb-3" />
                                <h3 className="text-lg font-bold mb-1">{warranty.title}</h3>
                                <div className="text-2xl font-bold">{warranty.duration}</div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 text-sm text-center">{warranty.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* What's Covered */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-green-500" />
                        <h3 className="text-lg font-bold text-gray-900">What&apos;s Covered</h3>
                    </div>
                    <ul className="space-y-3">
                        {warrantyCovers.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{item}</span>
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
                    <div className="flex items-center gap-3 mb-4">
                        <FontAwesomeIcon icon={faExclamationTriangle} className="w-6 h-6 text-red-500" />
                        <h3 className="text-lg font-bold text-gray-900">What&apos;s Not Covered</h3>
                    </div>
                    <ul className="space-y-3">
                        {warrantyExcludes.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <FontAwesomeIcon icon={faExclamationTriangle} className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Warranty Claim Process */}
            <section className="mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    How to Make a Warranty Claim
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {claimSteps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6 text-center relative"
                        >
                            <div className="w-12 h-12 bg-main-color text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                                {step.step}
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            
                            {/* Connector Line */}
                            {index < claimSteps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200 transform -translate-y-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact for Warranty */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
            >
                <FontAwesomeIcon icon={faPhone} className="w-12 h-12 text-main-color mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Warranty Support?</h3>
                <p className="text-gray-600 mb-6">
                    Our warranty team is ready to help you with any product issues or claims.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+2348067414548" className="btn-primary">
                        Call Warranty Support
                    </a>
                    <a href="mailto:warranty@dharmzeey.com" className="btn-secondary">
                        Email Warranty Team
                    </a>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 mr-2" />
                    Available Mon-Sat: 9AM-6PM
                </div>
            </motion.div>
        </div>
    );
}