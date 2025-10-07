import { faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import { numberWithCommas } from "@/utils/filter";
import { CartData } from "@/types/cartInterfaces";
import { modifyCartApi } from "@/services/cartApis";
import ImageComponent from "../interractivity/image";
import { useCartContext } from "@/contexts/cartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import slugify from "slugify";

export default function CartItem({
    cartItem,
    updteGrandTotal,
    removeCartItem,
}: {
    cartItem: CartData;
    updteGrandTotal: () => void;
    removeCartItem: (productId: string) => void;
}) {
    const productCount = cartItem.product.stock;
    const [count, setCount] = useState(cartItem.quantity);
    const [isUpdating, setIsUpdating] = useState(false);
    const { updateCartCount } = useCartContext();

    const increament = async () => {
        if (isUpdating) return;

        if (productCount != undefined && count < productCount) {
            setIsUpdating(true);
            const response = await modifyCartApi({ product_id: cartItem.product.id, action: "increament" });
            if (response.status === 202) {
                updteGrandTotal();
                setCount(count + 1);
                toast.success("Cart updated successfully", {
                    position: "top-center",
                    className: "my-toast",
                });
            } else {
                toast.error("Failed to update cart", {
                    position: "top-center",
                    className: "my-toast",
                });
            }
            setIsUpdating(false);
        } else {
            toast.info("Maximum available quantity reached", {
                position: "top-center",
                className: "my-toast",
            });
        }
        updateCartCount();
    };

    const decreament = async () => {
        if (isUpdating) return;

        if (productCount != undefined && count > 1) {
            setIsUpdating(true);
            const response = await modifyCartApi({ product_id: cartItem.product.id, action: "decreament" });
            if (response.status === 202) {
                updteGrandTotal();
                setCount(count - 1);
                toast.success("Cart updated successfully", {
                    position: "top-center",
                    className: "my-toast",
                });
            } else {
                toast.error("Failed to update cart", {
                    position: "top-center",
                    className: "my-toast",
                });
            }
            setIsUpdating(false);
        } else {
            toast.info("Minimum quantity is 1", {
                position: "top-center",
                className: "my-toast",
            });
        }
        updateCartCount();
    };

    const remove = async () => {
        if (isUpdating) return;

        setIsUpdating(true);
        const response = await modifyCartApi({ product_id: cartItem.product.id, action: "remove" });
        if (response.status === 202) {
            removeCartItem(cartItem.product.id);
            updteGrandTotal();
            toast.success("Item removed from cart", {
                position: "top-center",
                className: "my-toast",
            });
        } else {
            toast.error("Failed to remove item", {
                position: "top-center",
                className: "my-toast",
            });
        }
        setIsUpdating(false);
        await updateCartCount();
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="card p-6 mb-4"
        >
            <div className="flex gap-6">
                {/* Product Image */}
                <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                    <Link href={`/products/${cartItem.product.category}/${slugify(cartItem.product.name)}-${cartItem.product.id}`}>
                        <ImageComponent src={cartItem.product.image} alt={cartItem.product.name} />
                    </Link>
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-2 md:flex-row justify-between items-start">
                        <div className="flex-1">
                            <Link href={`/products/${cartItem.product.category}/${slugify(cartItem.product.name)}-${cartItem.product.id}`}>
                                <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-main-color transition-colors duration-200">
                                    {cartItem.product.name}
                                </h3>
                            </Link>
                            <div className="text-sm text-gray-500 mt-1">{cartItem.product.brand}</div>
                            <div className="flex items-center gap-2 mt-2">
                                {
                                    cartItem.product.utilizationStatus && (
                                        <span className={`status-badge text-xs ${cartItem.product.utilizationStatus === "Brand New" ? "status-new" : "status-used"}`}>
                                            {cartItem.product.utilizationStatus}
                                        </span>
                                    )
                                }
                            </div>
                        </div>

                        <div className="md:text-right">
                            <div className="text-xl font-bold text-main-color">
                                ₦{numberWithCommas(cartItem.product.price)}
                            </div>
                            <div className="text-sm text-gray-500">per item</div>
                        </div>
                    </div>

                    {/* Quantity Controls & Actions */}
                    <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 mr-4">Quantity:</span>
                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-gray-50 hover:bg-main-color hover:text-white transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                                    onClick={decreament}
                                    disabled={isUpdating || count <= 1}
                                >
                                    −
                                </motion.button>
                                <span className="w-16 h-10 flex items-center justify-center font-medium bg-white">
                                    {count}
                                </span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-gray-50 hover:bg-main-color hover:text-white transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                                    onClick={increament}
                                    disabled={isUpdating || count >= productCount}
                                >
                                    +
                                </motion.button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 text-gray-400 hover:text-red-500 transition-colors duration-200 rounded-xl hover:bg-red-50"
                                onClick={remove}
                                disabled={isUpdating}
                                title="Remove from cart"
                            >
                                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 text-gray-400 hover:text-main-color transition-colors duration-200 rounded-xl hover:bg-orange-50"
                                title="Move to wishlist"
                            >
                                <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-xl font-bold text-gray-900">
                            ₦{numberWithCommas(cartItem.product.price * count)}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}