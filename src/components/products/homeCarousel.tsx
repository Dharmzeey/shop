"use client";

import { useEffect, useState } from "react";
import { Deal } from "@/types/productInterfaces";
import { DEALS_URL } from "@/utils/urls/productUrls";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ImageComponent from "../interractivity/image";

export default function HomeCarousel() {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [error, setError] = useState<string | null>(null);

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
                setError(err.message);
                setDeals([]);
            }
        };
        fetchDeals();
    }, []);

    useEffect(() => {
        if (deals.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % deals.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [deals.length]);

    const defaultSlides = [
        // {
        //     id: "default-1",
        //     title: "Everyday Essentials",
        //     details: "From groceries to home care — shop what you need, when you need it.",
        //     image: "/logo.png",
        //     link_to: "/products/Essentials"
        // },
        {
            id: "default-2",
            title: "Fashion & Style",
            details: "Trendy outfits, and accessories that match your vibe.",
            image: "/logo.png",
            link_to: "/products/Fashion"
        },
        {
            id: "default-3",
            title: "Home & Living",
            details: "Curtains, blinds, décor, and tools to make your space feel like home.",
            image: "/logo.png",
            link_to: "/products/Home"
        },
        {
            id: "default-4",
            title: "Beauty & Care",
            details: "Skincare, haircare, and wellness essentials picked just for you.",
            image: "/logo.png",
            link_to: "/products/Beauty"
        },
        {
            id: "default-6",
            title: "Snacks & Treats",
            details: "Delicious bites, sweet treats, and quick snacks for every craving.",
            image: "/logo.png",
            link_to: "/products/Groceries"
        },
        // {
        //     id: "default-5",
        //     title: "Electronics & More",
        //     details: "Smart gadgets, phones, and accessories — the latest tech made simple.",
        //     image: "/logo.png",
        //     link_to: "/products/Electronics"
        // }
    ];

    const slidesToShow = deals.length > 0 ? deals : defaultSlides;

    if (error && deals.length === 0) {
        return (
            <div className="relative h-[250px] md:h-[350px] bg-gradient-to-br from-main-color via-orange-500 to-red-500 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10 text-center text-white px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-bold mb-3"
                    >
                        Welcome to Dharmzeey Shop
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg mb-6 opacity-90"
                    >
                        Your Premium Products Destination
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link href="/products/Phones" className="btn-secondary">
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            </div>
        );
    }

    return (
        <div className="relative h-[250px] md:h-[350px] rounded-2xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full h-full"
                >
                    {slidesToShow[currentSlide] && (
                        <Link href={slidesToShow[currentSlide].link_to} className="block w-full h-full group">
                            <div className="relative w-full h-full">
                                <ImageComponent
                                    src={slidesToShow[currentSlide].image}
                                    alt={slidesToShow[currentSlide].title}
                                />

                                {/* Modern Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                {/* Content */}
                                <div className="absolute inset-0 flex items-end p-6 md:p-8">
                                    <div className="text-white max-w-lg">
                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3, duration: 0.4 }}
                                            className="space-y-2"
                                        >
                                            <h2 className="text-xl md:text-2xl font-bold leading-tight">
                                                {slidesToShow[currentSlide].title}
                                            </h2>
                                            <p className="text-sm md:text-base opacity-90 leading-relaxed">
                                                {slidesToShow[currentSlide].details}
                                            </p>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="inline-block mt-3"
                                            >
                                                <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-200">
                                                    Shop Now →
                                                </span>
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Decorative Elements */}
                                <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-full blur-xl opacity-60" />
                                <div className="absolute bottom-20 right-20 w-8 h-8 bg-main-color/30 rounded-full blur-lg" />
                            </div>
                        </Link>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Modern Indicators */}
            {slidesToShow.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {slidesToShow.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            whileHover={{ scale: 1.2 }}
                            className={`relative overflow-hidden transition-all duration-300 ${index === currentSlide
                                    ? 'w-8 h-2 bg-white rounded-full'
                                    : 'w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full'
                                }`}
                        >
                            {index === currentSlide && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute inset-0 bg-white rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Modern Navigation Arrows */}
            {slidesToShow.length > 1 && (
                <>
                    <motion.button
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + slidesToShow.length) % slidesToShow.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 border border-white/20"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, x: 2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slidesToShow.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 border border-white/20"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </>
            )}
        </div>
    );
}