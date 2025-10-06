"use client";
import { useCartContext } from "@/contexts/cartContext";
import { addToCartApi } from "@/services/cartApis";
import { Product } from "@/types/productInterfaces";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck } from "@fortawesome/free-solid-svg-icons";

const IncreamentDecreamentCheck = ({ product }: { product: Product }) => {
    const productCount = product.stock;
    const [count, setCount] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const { updateCartCount } = useCartContext();

    const increament = () => {
        if (productCount != undefined && count < productCount) {
            setCount(count + 1);
        } else {
            toast.info("Maximum available quantity reached", {
                position: "top-center",
                className: "my-toast",
            });
        }
    };

    const decreament = () => {
        if (count > 1) {
            setCount(count - 1);
        } else {
            toast.info("Minimum quantity is 1", {
                position: "top-center",
                className: "my-toast",
            });
        }
    };

    const add = async () => {
        if (isAdding) return;
        
        setIsAdding(true);
        const response = await addToCartApi({ 
            product_id: product.id, 
            action: "update", 
            quantity: count 
        });
        
        if (response.status === 202) {
            setJustAdded(true);
            toast.success("Item added to cart successfully", {
                position: "top-center",
                className: "my-toast",
            });
            setTimeout(() => setJustAdded(false), 2000);
        } else {
            toast.error("Failed to add item to cart", {
                position: "top-center",
                className: "my-toast",
            });
        }
        
        updateCartCount();
        setCount(1);
        setIsAdding(false);
    };

    const isOutOfStock = product.availabilityStatus === "Out of Stock";

    return (
        <div className="space-y-6">
            {/* Quantity Selector */}
            <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                    Quantity
                </label>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-gray-50 hover:bg-main-color hover:text-white transition-all duration-200 flex items-center justify-center font-semibold disabled:opacity-50"
                            onClick={decreament}
                            disabled={count <= 1 || isOutOfStock}
                        >
                            −
                        </motion.button>
                        <span className="w-16 h-12 flex items-center justify-center font-semibold text-lg bg-white">
                            {count}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-12 h-12 bg-gray-50 hover:bg-main-color hover:text-white transition-all duration-200 flex items-center justify-center font-semibold disabled:opacity-50"
                            onClick={increament}
                            disabled={count >= productCount || isOutOfStock}
                        >
                            +
                        </motion.button>
                    </div>
                    <div className="text-sm text-gray-500">
                        {productCount} available
                    </div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
                whileHover={{ scale: isOutOfStock ? 1 : 1.02 }}
                whileTap={{ scale: isOutOfStock ? 1 : 0.98 }}
                className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-3 ${
                    isOutOfStock
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : justAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-main-color hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                }`}
                onClick={add}
                disabled={isOutOfStock || isAdding}
            >
                {isAdding ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Adding...</span>
                    </>
                ) : justAdded ? (
                    <>
                        <FontAwesomeIcon icon={faCheck} className="w-5 h-5" />
                        <span>Added to Cart!</span>
                    </>
                ) : isOutOfStock ? (
                    <span>Out of Stock</span>
                ) : (
                    <>
                        <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                        <span>Add to Cart</span>
                    </>
                )}
            </motion.button>

            {/* Stock Status */}
            <div className="text-center">
                {isOutOfStock ? (
                    <p className="text-red-600 font-medium">This item is currently out of stock</p>
                ) : productCount <= 5 ? (
                    <p className="text-orange-600 font-medium">Only {productCount} left in stock!</p>
                ) : (
                    <p className="text-green-600 font-medium">In stock and ready to ship</p>
                )}
            </div>
        </div>
    );
};

export default IncreamentDecreamentCheck;