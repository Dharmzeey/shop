'use client';

import { motion } from "framer-motion";

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-[60vh] relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <motion.div
                    animate={{ 
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #FF5100 2px, transparent 2px),
                                         radial-gradient(circle at 75% 75%, #FF5100 1px, transparent 1px)`,
                        backgroundSize: "50px 50px"
                    }}
                />
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative mb-6"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="w-16 h-16 border-4 border-gray-200 rounded-full relative"
                    >
                        <motion.div
                            animate={{ rotate: [0, -360] }}
                            transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 border-4 border-transparent border-t-main-color border-r-main-color rounded-full"
                        />
                        <div className="absolute inset-2 bg-main-color/10 rounded-full" />
                    </motion.div>
                </motion.div>
                
                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="text-center"
                >
                    <motion.h3 
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-base font-semibold text-gray-900 mb-2"
                    >
                        Loading...
                    </motion.h3>
                    <p className="text-xs text-gray-600">Please wait a moment</p>
                </motion.div>
            </div>
        </div>
    );
}