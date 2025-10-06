    "use client";

    import Link from "next/link";
    import { numberWithCommas } from "@/utils/filter";
    import { Product } from "@/types/productInterfaces";
    import ImageComponent from "../interractivity/image";
    import slugify from "slugify";
    import { motion } from "framer-motion";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
    import { useCartContext } from "@/contexts/cartContext";
    import { addToCartApi } from "@/services/cartApis";
    import { useState } from "react";
    import { toast } from "react-toastify";
    import Wishlist from "../cart/wishlist";


    export default function ProductCategory({
        products,
        gadgetType,
    }: {
        products: Product[];
        gadgetType: string;
    }) {

        const { updateCartCount } = useCartContext();
        const add = async (productId: string) => {

            const response = await addToCartApi({
                product_id: productId,
                action: "update",
                quantity: 1
            });

            if (response.status === 202) {
                toast.success("Item added to cart successfully", {
                    position: "top-center",
                    className: "my-toast",
                });
            } else {
                toast.error("Failed to add item to cart", {
                    position: "top-center",
                    className: "my-toast",
                });
            }

            updateCartCount();
        };

        return (
            <>
                {products.length >= 1 && (
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03, duration: 0.3 }}
                                className="group"
                            >
                                <div className="card h-full flex flex-col max-w-sm mx-auto">
                                    <Link
                                        href={`/products/${product.category}/${slugify(product.name)}-${product.id}`}
                                        className="block"
                                    >
                                        {/* Image Section */}
                                        <div className="relative aspect-square bg-gray-50 overflow-hidden">
                                            <ImageComponent
                                                src={product.image}
                                                alt={`${product.name} - ${product.category} at Dharmzeey Shop`}
                                            />

                                            {/* Status Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                <span className={`status-badge ${product.utilizationStatus === "Brand New" ? "status-new" : "status-used"}`}>
                                                    {product.utilizationStatus}
                                                </span>
                                                <span className={`status-badge ${product.availabilityStatus === "In Stock" ? "status-in-stock" : "status-out-of-stock"}`}>
                                                    {product.availabilityStatus}
                                                </span>
                                            </div>

                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                                            {/* Quick Actions */}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                                                <div className="flex flex-col gap-1">
                                                    <Wishlist product_id={product.id} userWishlist={product.user_wishlist} />
                                                    <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-main-color hover:bg-white transition-all duration-200 shadow-lg"
                                                        onClick={async (e) => { e.preventDefault(); await add(product.id) }}
                                                    >
                                                        <FontAwesomeIcon icon={faShoppingCart} className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    {/* Product Info */}
                                    <div className="p-3 flex-1 flex flex-col">
                                        <Link href={`/products/${product.category}/${slugify(product.name)}-${product.id}`}>
                                            <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-main-color transition-colors duration-200">
                                                {product.name}
                                            </h3>
                                        </Link>

                                        <div className="mt-auto">
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-bold text-main-color">
                                                    ₦{numberWithCommas(product.price)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {product.brand}
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full mt-2 btn-primary text-xs py-2"
                                            >
                                                Add to Cart
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </>
        );
    }