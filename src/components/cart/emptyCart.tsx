import { ActionLink } from "../actionComponents";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center py-20"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
            >
                <FontAwesomeIcon icon={faShoppingCart} className="w-12 h-12 text-gray-400" />
            </motion.div>
            
            <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-4"
            >
                Your Cart is Empty
            </motion.h2>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="text-lg text-gray-600 mb-8 text-center max-w-md"
            >
                Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
            </motion.p>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
            >
                <ActionLink buttonBgColor="bg-main-color" linkUrl="/" linkText="Continue Shopping" />
                <ActionLink buttonBgColor="bg-secondary-color" linkUrl="/account/wishlist" linkText="View Wishlist" />
            </motion.div>
        </motion.div>
    );
}

export { EmptyCart };