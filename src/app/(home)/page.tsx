"use client";

import { useState, useEffect } from "react";
import ProductCategory from "@/components/products/productCategory";
import HomeCarousel from "@/components/products/homeCarousel";
import { fetchAllProducts, fetchProductCategories } from "@/services/productApi";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faTruck, faExchangeAlt, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { Category } from "@/types/productInterfaces";

export default function Home() {
    const [products, setProducts] = useState<any[]>([]);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchProductCategories();
                setFetchedCategories(data);
            } catch (err) {
                console.log(err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await fetchAllProducts();
                setProducts(data);
            } catch (err) {
                console.log(err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main-color"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[40vh] p-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Error</h1>
                <p className="text-lg text-gray-600">{error}</p>
            </div>
        );
    }

    // Assign colors to categories dynamically
    const categoryColors = [
        "from-teal-500 to-cyan-600",
        "from-rose-500 to-pink-600",
        "from-amber-500 to-orange-600",
        "from-violet-500 to-purple-600",
        "from-green-500 to-emerald-600",
        "from-blue-500 to-indigo-600",
        "from-fuchsia-500 to-pink-500",
        "from-lime-500 to-green-500",
        "from-yellow-500 to-orange-500",
        "from-gray-500 to-slate-600",
    ];

    const categories = fetchedCategories?.map((cat, idx) => ({
        ...cat,
        color: categoryColors[idx % categoryColors.length],
    }));

    const features = [
        {
            icon: faShieldAlt,
            title: "Guaranteed Quality",
            description: "All products come with warranty and quality assurance"
        },
        {
            icon: faTruck,
            title: "Fast Delivery",
            description: "Quick and secure delivery across Nigeria"
        },
        {
            icon: faExchangeAlt,
            title: "Trade-In Program",
            description: "Exchange your old devices for the latest models"
        },
        {
            icon: faHeadset,
            title: "24/7 Support",
            description: "Expert customer support whenever you need help"
        }
    ];

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="container-width section-padding pt-8"
                >
                    {/* Hero Text */}
                    {/* <div className="text-center mb-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-2xl md:text-4xl font-bold text-gray-900 mb-4"
                        >
                            Premium <span className="gradient-text">Electronics</span>
                            <br />Made Simple
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg text-gray-600 max-w-2xl mx-auto"
                        >
                            Discover the latest smartphones, laptops, and accessories from trusted brands. 
                            Trade in your old devices and upgrade to the future.
                        </motion.p>
                    </div> */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative rounded-2xl overflow-hidden shadow-xl mb-12"
                    >
                        <HomeCarousel />
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-6 bg-white">
                <div className="container-width section-padding">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Why Shop With Us?</h2>
                        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                            We&apos;re committed to providing you with the best shopping experience across all categories
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="text-center p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-200"
                            >
                                <div className="w-12 h-12 bg-main-color/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <FontAwesomeIcon icon={feature.icon} className="w-5 h-5 text-main-color" />
                                </div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-xs">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-width section-padding">
                    {products.length > 0 ? (
                        <>
                            {categories?.map((category, index) => {
                                const filteredProducts = products
                                    .filter((product) => product.category === category.name)
                                    .slice(0, 8);

                                if (filteredProducts.length === 0) return null;

                                return (
                                    <motion.section
                                        key={category.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        className="mb-16"
                                    >
                                        <div className="flex items-center justify-between mb-6 ml-6">
                                            <div className="flex items-center space-x-4">
                                                {/* <div className="text-2xl">{category.icon}</div> */}
                                                <div>
                                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                                                        <div className="relative">
                                                            <span className={`absolute -left-5 top-4 transform -translate-y-1/2 h-6 w-3 bg-gradient-to-b inline-block rounded-full ${category.color}`}></span>
                                                        </div>
                                                        {category.name}
                                                    </h2>
                                                    <p className="text-sm text-gray-600">{category.description}</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/products/${category.name}`}
                                                className="group flex items-center space-x-1 text-main-color hover:text-teal-700 text-sm font-medium transition-colors duration-200"
                                            >
                                                <span>View All</span>
                                                <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                                            </Link>
                                        </div>
                                        <ProductCategory products={filteredProducts} gadgetType={category.name} />
                                    </motion.section>
                                );
                            })}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[40vh] p-4 text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-4">No Products Found</h1>
                            <p className="text-lg text-gray-600">Currently, there are no products available.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gradient-to-r from-teal-600 to-cyan-600">
                <div className="container-width section-padding">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-center text-white"
                    >
                        <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Updated</h2>
                        <p className="text-sm md:text-base mb-6 opacity-90">
                            Get notified about new arrivals, exclusive deals, and special offers
                        </p>
                        <div className="max-w-md mx-auto">
                            <div className="flex rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 bg-transparent text-white placeholder-white/70 focus:outline-none text-sm"
                                />
                                <button className="px-6 py-3 bg-white text-teal-700 text-sm font-medium hover:bg-gray-100 transition-colors duration-200">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}