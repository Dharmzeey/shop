"use client";
import { Product } from "@/types/productInterfaces";
import { RECENTLY_VIEWED_URL } from "@/utils/urls/productUrls";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageComponent from "../interractivity/image";
import { numberWithCommas } from "@/utils/filter";
import slugify from "slugify";

type Props = {
    productId: string;
};

export default function RecentlyViewed({ productId }: Props) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function fetchRecentlyViewed() {
            const viewedProducts = localStorage.getItem("recentlyViewed");
            if (viewedProducts) {
                const listViewedProducts: string[] = JSON.parse(viewedProducts);
                if (listViewedProducts.length > 0) {
                    try {
                        const response = await fetch(RECENTLY_VIEWED_URL(listViewedProducts));
                        if (response.ok) {
                            const products: Product[] = await response.json();
                            // Filter out current product
                            const filteredProducts = products.filter(p => p.id !== productId);
                            setProducts(filteredProducts);
                        }
                    } catch (error) {
                        console.error("Failed to fetch recently viewed products:", error);
                    }
                }
            }
        }
        fetchRecentlyViewed();
    }, [productId]);

    useEffect(() => {
        function addToRecentlyViewed(productId: string) {
            const existingViewed = localStorage.getItem("recentlyViewed");
            let viewedProducts: string[] = existingViewed
                ? JSON.parse(existingViewed)
                : [];
            
            // Remove if already exists and add to front
            viewedProducts = viewedProducts.filter(id => id !== productId);
            viewedProducts = [productId, ...viewedProducts].slice(0, 10);
            
            localStorage.setItem("recentlyViewed", JSON.stringify(viewedProducts));
        }
        addToRecentlyViewed(productId);
    }, [productId]);

    if (products.length === 0) return null;

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">Recently Viewed</h3>
                    <p className="text-gray-600 mt-1">Products you&apos;ve looked at recently</p>
                </div>
                <button 
                    onClick={() => {
                        localStorage.removeItem("recentlyViewed");
                        setProducts([]);
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                    Clear History
                </button>
            </div>
            
            <div className="relative">
                {/* Gradient Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                
                {/* Products Scroll Container */}
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-6 pb-4" style={{ width: `${products.length * 280}px` }}>
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="flex-shrink-0 w-64"
                            >
                                <Link href={`/products/${product.category}/${slugify(product.name)}-${product.id}`}>
                                    <div className="card group h-full">
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                            <ImageComponent
                                                src={product.image}
                                                alt={`${product.name} - Recently viewed product`}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                                            
                                            {/* Recently Viewed Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                                    Recently Viewed
                                                </span>
                                            </div>
                                        </div>
                                        
                                        {/* Info */}
                                        <div className="p-4">
                                            <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-main-color transition-colors duration-200">
                                                {product.name}
                                            </h4>
                                            <div className="text-sm text-gray-500 mb-2">{product.brand}</div>
                                            <div className="text-lg font-bold text-main-color">
                                                ₦{numberWithCommas(product.price)}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}