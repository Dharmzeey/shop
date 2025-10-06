'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-[70vh] relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.05, 0.2]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/3 left-1/3 w-40 h-40 bg-main-color/10 rounded-full blur-2xl"
                />
                <motion.div
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.05, 0.2, 0.05]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                />
            </div>
            
            {/* Main Loading Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo Container */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative mb-8"
                >
                    <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl bg-white p-2">
                        <Image
                            src="/logo.png"
                            alt="Dharmzeey Shop"
                            width={80}
                            height={80}
                            className="object-contain w-full h-full"
                        />
                    </div>
                    
                    {/* Orbiting Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 w-32 h-32 -m-4"
                    >
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-main-color rounded-full -translate-x-1/2" />
                        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-orange-500 rounded-full -translate-x-1/2" />
                        <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-y-1/2" />
                        <div className="absolute right-0 top-1/2 w-2 h-2 bg-green-500 rounded-full -translate-y-1/2" />
                    </motion.div>
                </motion.div>
                
                {/* Loading Spinner */}
                {/* <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="relative mb-6"
                >
                    <svg className="w-16 h-16" viewBox="0 0 50 50">
                        <motion.circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="2"
                        />
                        <motion.circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke="#FF5100"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="31.416"
                            animate={{ 
                                strokeDashoffset: [31.416, 0, 31.416],
                                rotate: [0, 360, 720]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </svg>
                </motion.div> */}
                
                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="text-center"
                >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Products</h3>
                    <motion.p 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-sm text-gray-600"
                    >
                        Preparing the best deals for you...
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}