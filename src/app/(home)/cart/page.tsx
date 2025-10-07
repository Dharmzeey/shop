'use client';

import CartItem from "@/components/cart/cartItem";
import { EmptyCart } from "@/components/cart/emptyCart";
import Loading from "@/components/loading";
import { getCartApi } from "@/services/cartApis";
import { CartData } from "@/types/cartInterfaces";
import { numberWithCommas } from "@/utils/filter";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faTruck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function CartPage() {
    const [grandTotalPrice, setGrandTotalPrice] = useState<number>();
    const [data, setData] = useState<CartData[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchCart() {
            const response = await getCartApi();
            if (response.status === 200) {
                setGrandTotalPrice(response.data.grand_total_price);
                setData(response.data.data);
            }
            setIsLoading(false);
        }
        fetchCart();
    }, []);

    async function updateGrandTotalPrice() {
        const response = await getCartApi();
        if (response.status === 200) {
            setGrandTotalPrice(response.data.grand_total_price);
        }
    }

    const removeCartItem = (productId: string) => {
        setData(prevData => prevData?.filter(item => item.product.id !== productId));
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container-width section-padding py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200">
                        <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
                        <p className="text-gray-600">
                            {data && data.length > 0 ? `${data.length} item${data.length > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
                        </p>
                    </div>
                </div>
            </div>

            {data && data.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {data.map((productInfo, index) => (
                                <motion.div
                                    key={productInfo.product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.3 }}
                                >
                                    <CartItem
                                        cartItem={productInfo}
                                        updteGrandTotal={updateGrandTotalPrice}
                                        removeCartItem={removeCartItem}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="sticky top-24"
                        >
                            <div className="card p-6 space-y-6">
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({data.length} items)</span>
                                        <span>₦{numberWithCommas(grandTotalPrice || 0)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">Free</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-lg font-bold text-gray-900">
                                            <span>Total</span>
                                            <span className="text-main-color">₦{numberWithCommas(grandTotalPrice || 0)}</span>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link href="/cart/checkout" className="block w-full btn-primary text-center py-4 text-lg font-semibold">
                                        Proceed to Checkout
                                    </Link>
                                </motion.div>

                                {/* Trust Indicators */}
                                <div className="space-y-3 pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 text-green-500" />
                                        <span>Secure checkout with SSL encryption</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                                        <FontAwesomeIcon icon={faTruck} className="w-4 h-4 text-blue-500" />
                                        <span>Free delivery within Ibadan</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <EmptyCart />
            )}
        </div>
    );
}