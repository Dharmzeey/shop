import { Product } from "@/types/productInterfaces";
import { numberWithCommas } from "@/utils/filter";
import ImageComponent from "../interractivity/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";

export default function ListItems({ device }: { device: Product }) {
    return (
        <motion.div 
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="group card h-full flex flex-col max-w-sm"
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <ImageComponent
                    src={device.image}
                    alt={`${device.name} - ${device.category} at Dharmzeey Shop`}
                />
                
                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className={`status-badge text-xs ${device.utilizationStatus === "Brand New" ? "status-new" : "status-used"}`}>
                        {device.utilizationStatus}
                    </span>
                    {device.availabilityStatus === "Out of Stock" && (
                        <span className="status-badge status-out-of-stock text-xs">
                            Out of Stock
                        </span>
                    )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-200" />
                
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="flex flex-col gap-1">
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-red-500 hover:bg-white transition-all duration-200 shadow-lg"
                            onClick={(e) => { e.preventDefault(); }}
                        >
                            <FontAwesomeIcon icon={faHeart} className="w-3 h-3" />
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:text-main-color hover:bg-white transition-all duration-200 shadow-lg"
                            onClick={(e) => { e.preventDefault(); }}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} className="w-3 h-3" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Product Info */}
            <div className="p-3 flex-1 flex flex-col">
                <div className="flex-1">
                    <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-main-color transition-colors duration-200">
                        {device.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon 
                                    key={i}
                                    icon={faStar} 
                                    className={`w-2.5 h-2.5 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">(4.0)</span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">{device.brand}</div>
                </div>

                <div className="space-y-2">
                    <div className="font-bold text-main-color text-sm">
                        ₦{numberWithCommas(device.price)}
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-primary text-xs py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={device.availabilityStatus === "Out of Stock"}
                    >
                        {device.availabilityStatus === "Out of Stock" ? "Out of Stock" : "Add to Cart"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}