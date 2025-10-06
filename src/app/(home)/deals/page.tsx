"use client";

import { useState, useEffect } from "react";
import { Deal } from "@/types/productInterfaces";
import { DEALS_URL } from "@/utils/urls/productUrls";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageComponent from "@/components/interractivity/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faClock, faTag } from "@fortawesome/free-solid-svg-icons";

export default function DealsPage() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await fetch(DEALS_URL);
                if (!response.ok) {
                    throw new Error("Failed to fetch deals");
                }
                const data: Deal[] = await response.json();
                setDeals(data);
            } catch (err: any) {
                alert(err.message);
                setDeals([]);
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    if (loading) {
        return (
            <div className="container-width section-padding py-16">
                <div className="flex justify-center items-center h-[40vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-color"></div>
                </div>
            </div>
        );
    }

    const featuredDeals = [
        {
            id: "featured-1",
            title: "iPhone 15 Pro Max",
            details: "Latest flagship with titanium design",
            image: "/logo.png",
            link_to: "/products/Phones",
            discount: "15%",
            originalPrice: "₦1,200,000",
            salePrice: "₦1,020,000"
        },
        {
            id: "featured-2", 
            title: "MacBook Air M3",
            details: "Powerful performance, all-day battery",
            image: "/logo.png",
            link_to: "/products/Laptops",
            discount: "10%",
            originalPrice: "₦850,000",
            salePrice: "₦765,000"
        },
        {
            id: "featured-3",
            title: "PlayStation 5",
            details: "Next-gen gaming console",
            image: "/logo.png",
            link_to: "/products/Console",
            discount: "5%",
            originalPrice: "₦450,000", 
            salePrice: "₦427,500"
        }
    ];

    const displayDeals = deals.length > 0 ? deals : featuredDeals;

    return (
        <div className="container-width section-padding py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-main-color" />
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Hot Deals</h1>
                    <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-main-color" />
                </div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Don&apos;t miss out on these amazing limited-time offers on our top products!
                </p>
            </motion.div>

            {/* Deals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {displayDeals.map((deal, index) => (
                    <motion.div
                        key={deal.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="group"
                    >
                        <Link href={deal.link_to} className="block">
                            <div className="card overflow-hidden h-full">
                                {/* Deal Image */}
                                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                                    <ImageComponent src={deal.image} alt={deal.title} />
                                    
                                    {/* Discount Badge */}
                                    <div className="absolute top-3 left-3">
                                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                                            <FontAwesomeIcon icon={faTag} className="w-3 h-3" />
                                            {deals.length > 0 ? "Special Deal" : `${(deal as any).discount} OFF`}
                                        </div>
                                    </div>

                                    {/* Timer Badge */}
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
                                            <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                                            Limited Time
                                        </div>
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200" />
                                </div>

                                {/* Deal Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-main-color transition-colors duration-200">
                                        {deal.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {deal.details}
                                    </p>
                                    
                                    {/* Pricing */}
                                    {deals.length === 0 && (
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-xl font-bold text-main-color">
                                                {(deal as any).salePrice}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                                {(deal as any).originalPrice}
                                            </span>
                                        </div>
                                    )}

                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full btn-primary text-center py-3"
                                    >
                                        Shop Now
                                    </motion.div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center bg-gradient-to-r from-main-color to-orange-600 rounded-2xl p-8 text-white"
            >
                <h2 className="text-2xl font-bold mb-4">Don&apos;t Miss Out!</h2>
                <p className="text-lg mb-6 opacity-90">
                    Subscribe to our newsletter and be the first to know about exclusive deals
                </p>
                <div className="max-w-md mx-auto">
                    <div className="flex rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none text-sm"
                        />
                        <button className="px-6 py-3 bg-white text-main-color text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                            Subscribe
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}