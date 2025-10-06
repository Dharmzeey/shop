'use client';

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faMoneyBillWave, faRecycle, faCheckCircle, faMobile, faLaptop, faGamepad, faHeadphones } from "@fortawesome/free-solid-svg-icons";

export default function TradeInPage() {
    const tradeInSteps = [
        {
            icon: faMobile,
            title: "Bring Your Device",
            description: "Visit our store with your old device and accessories"
        },
        {
            icon: faCheckCircle,
            title: "Device Assessment",
            description: "Our experts evaluate your device's condition and value"
        },
        {
            icon: faMoneyBillWave,
            title: "Get Quote",
            description: "Receive an instant trade-in value for your device"
        },
        {
            icon: faExchangeAlt,
            title: "Trade & Upgrade",
            description: "Apply the value towards your new purchase"
        }
    ];

    const acceptedDevices = [
        {
            icon: faMobile,
            title: "Smartphones",
            description: "iPhone, Samsung Galaxy, Google Pixel, and more",
            brands: ["Apple", "Samsung", "Google", "OnePlus", "Huawei"]
        },
        {
            icon: faLaptop,
            title: "Laptops",
            description: "MacBooks, Windows laptops, and Chromebooks",
            brands: ["Apple", "Dell", "HP", "Lenovo", "ASUS"]
        },
        {
            icon: faGamepad,
            title: "Gaming Consoles",
            description: "PlayStation, Xbox, Nintendo Switch",
            brands: ["Sony", "Microsoft", "Nintendo"]
        },
        {
            icon: faHeadphones,
            title: "Accessories",
            description: "AirPods, smartwatches, tablets, and more",
            brands: ["Apple", "Samsung", "Bose", "Sony"]
        }
    ];

    const valuationFactors = [
        "Device model and age",
        "Physical condition and functionality",
        "Original accessories included",
        "Current market demand",
        "Battery health (for mobile devices)",
        "Screen condition and clarity"
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
                    <FontAwesomeIcon icon={faExchangeAlt} className="w-8 h-8 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Trade-In Program</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Upgrade to the latest technology while getting value for your current device. Our trade-in program makes it easy and rewarding.
                </p>
            </motion.div>

            {/* Benefits Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-main-color to-orange-600 rounded-2xl p-8 text-white text-center mb-12"
            >
                <h2 className="text-xl font-bold mb-4">Why Trade In With Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6" />
                        <span>Best Trade-In Values</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faRecycle} className="w-6 h-6" />
                        <span>Eco-Friendly Recycling</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={faExchangeAlt} className="w-6 h-6" />
                        <span>Instant Credit</span>
                    </div>
                </div>
            </motion.div>

            {/* Trade-In Process */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    How It Works
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tradeInSteps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6 text-center relative"
                        >
                            <div className="w-16 h-16 bg-main-color/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={step.icon} className="w-8 h-8 text-main-color" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{step.title}</h3>
                            <p className="text-gray-600 text-sm">{step.description}</p>
                            
                            {/* Step Number */}
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-main-color text-white rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </div>
                            
                            {/* Connector */}
                            {index < tradeInSteps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200 transform -translate-y-1/2" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Accepted Devices */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    What We Accept
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {acceptedDevices.map((device, index) => (
                        <motion.div
                            key={device.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={device.icon} className="w-6 h-6 text-main-color" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{device.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{device.description}</p>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {device.brands.map((brand) => (
                                    <span key={brand} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Valuation Factors */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="card p-8 mb-12"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">How We Determine Trade-In Value</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {valuationFactors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-main-color flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{factor}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Trade In?</h3>
                {/* <p className="text-gray-600 mb-6">
                    Visit our store today for a free device evaluation and instant trade-in quote.
                </p> */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+2348067414548" className="btn-primary">
                        Call for Quote
                    </a>
                    <a href="mailto:tradein@dharmzeey.com" className="btn-secondary">
                        Email Trade-In Team
                    </a>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                    <strong>Store Locations:</strong><br />
                    Shop 9, F. Abel Complex, Iwo Road, Ibadan<br />
                    Shop 10, Railway Shopping Complex, Dugbe, Ibadan
                </div>
            </motion.div>
        </div>
    );
}