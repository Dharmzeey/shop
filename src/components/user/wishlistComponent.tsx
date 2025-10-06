'use client';

import { WishlistItem } from "@/types/userInterfaces";
import { numberWithCommas } from "@/utils/filter";
import ImageComponent from "../interractivity/image";
import { ActionLink } from "../actionComponents";
import { faTrash, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeWishlist } from "@/services/userApis";
import { useCartContext } from "@/contexts/cartContext";
import { addToCartApi } from "@/services/cartApis";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import slugify from "slugify";
import { motion } from "framer-motion";

type Wishlist = {
    wishlist: WishlistItem;
};

function WishlistCard({ wishlist }: Wishlist) {
    const { updateCartCount } = useCartContext();
    const router = useRouter();

    const add = async () => {
        const response = await addToCartApi({
            product_id: wishlist.id,
            action: "update",
            quantity: 1,
        });

        if (response.status === 202) {
            await removeWishlist(wishlist.id);
            toast.info("Item added to cart", {
                position: "top-center",
                className: "my-toast",
            });
            updateCartCount();
            router.push("/cart");
        } else {
            toast.error("Failed to add item to cart", {
                position: "top-center",
                className: "my-toast",
            });
        }
    };

    const remove = async () => {
        const response = await removeWishlist(wishlist.id);
        if (response.status === 204) {
            toast.success("Removed from wishlist", {
                position: "top-center",
                className: "my-toast",
            });
            location.reload();
        } else {
            toast.error("Failed to remove from wishlist", {
                position: "top-center",
                className: "my-toast",
            });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <div className="card h-full max-w-sm mx-auto rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden">
                <Link
                    href={`/products/${wishlist.category}/${slugify(wishlist.name)}-${wishlist.id}`}
                    className="block"
                >
                    {/* Image Section */}
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                        <ImageComponent
                            src={wishlist.image}
                            alt={`${wishlist.name} - ${wishlist.category} at Dharmzeey Shop`}
                        />

                        {/* Status Badges (if available) */}
                        {wishlist.utilizationStatus && wishlist.availabilityStatus && (
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                <span
                                    className={`status-badge ${wishlist.utilizationStatus === "Brand New"
                                        ? "status-new"
                                        : "status-used"
                                        }`}
                                >
                                    {wishlist.utilizationStatus}
                                </span>
                                <span
                                    className={`status-badge ${wishlist.availabilityStatus === "In Stock"
                                        ? "status-in-stock"
                                        : "status-out-of-stock"
                                        }`}
                                >
                                    {wishlist.availabilityStatus}
                                </span>
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

                        {/* Quick Actions — Wishlist Remove Button */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                            <div className="flex flex-col gap-1">
                                <button
                                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white transition-all duration-200 shadow-lg"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        remove();
                                    }}
                                    aria-label="Remove from wishlist"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Product Info */}
                <div className="p-3 flex-1 flex flex-col">
                    <Link
                        href={`/products/${wishlist.category}/${slugify(wishlist.name)}-${wishlist.id}`}
                    >
                        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-main-color transition-colors duration-200">
                            {wishlist.name}
                        </h3>
                    </Link>

                    <div className="mt-auto">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-bold text-main-color">
                                ₦{numberWithCommas(wishlist.price)}
                            </div>
                            {wishlist.brand && (
                                <div className="text-xs text-gray-500">{wishlist.brand}</div>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={add}
                            className="w-full mt-2 btn-primary text-xs py-2"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="mr-1 w-3 h-3" />
                            Add to Cart
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function EmptyWishlist() {
    return (
        <div className="text-center py-16 px-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-6">You haven’t added any products to your wishlist yet.</p>
            <div className="flex justify-center">
                <ActionLink
                    linkUrl="/"
                    linkText="Start Shopping Now"
                    buttonBgColor="bg-main-color"
                />
            </div>
        </div>
    );
}

export { WishlistCard, EmptyWishlist };