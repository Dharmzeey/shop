'use client';

import { faShieldAlt, faClock, faBoxOpen, faMoneyBillWave, faTruck, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";



export default function ShippingPage() {
    const shippingZones = [
        {
            zone: "Oyo State",
            duration: "1-2 Business Days",
            cost: "Free",
            description: "Free same-day or next-day delivery within Ibadan",
            color: "from-green-500 to-emerald-600"
        },
        {
            zone: "Southwest Nigeria",
            duration: "2-3 Business Days", 
            cost: "₦2,000 - ₦3,500",
            description: "Lagos, Ogun, Osun, Ondo, Ekiti states",
            color: "from-blue-500 to-indigo-600"
        },
        {
            zone: "Other States",
            duration: "3-5 Business Days",
            cost: "₦3,500 - ₦6,000",
            description: "All other Nigerian states",
            color: "from-orange-500 to-red-500"
        }
    ];

    const shippingFeatures = [
        {
            icon: faShieldAlt,
            title: "Secure Packaging",
            description: "All items are carefully packaged to prevent damage during transit"
        },
        {
            icon: faClock,
            title: "Real-Time Tracking",
            description: "Track your order from our warehouse to your doorstep"
        },
        {
            icon: faBoxOpen,
            title: "Careful Handling",
            description: "Electronics are handled with special care by trained professionals"
        },
        {
            icon: faMoneyBillWave,
            title: "Insurance Included",
            description: "All shipments are insured against loss or damage"
        }
    ];

    const deliveryOptions = [
        {
            title: "Standard Delivery",
            description: "Regular delivery during business hours",
            timeframe: "9AM - 6PM",
            cost: "Standard rates apply"
        },
        {
            title: "Express Delivery",
            description: "Priority delivery for urgent orders",
            timeframe: "Same day (Ibadan only)",
            cost: "Additional ₦1,500"
        },
        {
            title: "Weekend Delivery",
            description: "Saturday delivery available",
            timeframe: "10AM - 4PM",
            cost: "Additional ₦1,000"
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
                    <FontAwesomeIcon icon={faTruck} className="w-8 h-8 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Shipping Information</h1>
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Fast, secure, and reliable delivery across Nigeria. Learn about our shipping options, costs, and delivery timeframes.
                </p>
            </motion.div>

            {/* Free Shipping Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-main-color to-orange-600 rounded-2xl p-8 text-white text-center mb-12"
            >
                <h2 className="text-xl font-bold mb-2">Free Delivery in Ibadan!</h2>
                <p className="text-lg opacity-90">
                    Enjoy complimentary delivery on all orders within Ibadan
                </p>
            </motion.div>

            {/* Shipping Zones */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Delivery Zones & Pricing
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {shippingZones.map((zone, index) => (
                        <motion.div
                            key={zone.zone}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card overflow-hidden"
                        >
                            <div className={`bg-gradient-to-r ${zone.color} p-6 text-white text-center`}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-8 h-8 mb-3" />
                                <h3 className="text-lg font-bold mb-1">{zone.zone}</h3>
                                <div className="text-sm opacity-90">{zone.description}</div>
                            </div>
                            <div className="p-6 text-center">
                                <div className="mb-4">
                                    <div className="text-lg font-bold text-main-color">{zone.cost}</div>
                                    <div className="text-sm text-gray-600">{zone.duration}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Shipping Features */}
            <section className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Why Choose Our Delivery Service
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {shippingFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6 text-center"
                        >
                            <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={feature.icon} className="w-6 h-6 text-main-color" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Delivery Options */}
            <section className="mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-gray-900 mb-8 text-center"
                >
                    Delivery Options
                </motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deliveryOptions.map((option, index) => (
                        <motion.div
                            key={option.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="card p-6"
                        >
                            <h3 className="text-base font-semibold text-gray-900 mb-3">{option.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Time:</span>
                                    <span className="font-medium">{option.timeframe}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Cost:</span>
                                    <span className="font-medium text-main-color">{option.cost}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Important Notes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="card p-6 mb-12"
            >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Important Shipping Notes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Order Processing</h4>
                        <ul className="space-y-1">
                            <li>• Orders are processed within 24 hours</li>
                            <li>• Cut-off time for same-day delivery: 2PM</li>
                            <li>• Weekend orders processed on Monday</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Delivery Requirements</h4>
                        <ul className="space-y-1">
                            <li>• Valid phone number required</li>
                            <li>• Someone must be available to receive</li>
                            <li>• ID verification may be required</li>
                        </ul>
                    </div>
                </div>
            </motion.div>

            {/* Contact for Shipping */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
            >
                <FontAwesomeIcon icon={faTruck} className="w-12 h-12 text-main-color mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Questions About Shipping?</h3>
                <p className="text-gray-600 mb-6">
                    Need help with delivery options or tracking your order? Our shipping team is here to assist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+2348067414548" className="btn-primary">
                        Call Shipping Support
                    </a>
                    <a href="mailto:shipping@dharmzeey.com" className="btn-secondary">
                        Email Shipping Team
                    </a>
                </div>
            </motion.div>
        </div>
    );
}