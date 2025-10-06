'use client';

import { fetchSimilarProducts } from "@/services/productApi";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageComponent from "../interractivity/image";
import { numberWithCommas } from "@/utils/filter";
import slugify from "slugify";
import { useState, useEffect } from "react";

type Props = {
    productId: string;
};

export default function SimilarProducts({ productId }: Props) {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        let isMounted = true;
        fetchSimilarProducts(productId).then((data) => {
            if (isMounted) setProducts(data);
        });
        return () => {
            isMounted = false;
        };
    }, [productId]);

    if (!products || products.length === 0) return null;

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900">You Might Also Like</h3>
                    <p className="text-gray-600 mt-1">Similar products that other customers loved</p>
                </div>
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
                                                alt={`${product.name} - Similar to current product`}
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
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