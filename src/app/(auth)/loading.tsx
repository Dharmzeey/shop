'use client';

import { motion } from "framer-motion";

export default function LoadingPage() {
    return (
        <div className="flex items-center justify-center h-[60vh] relative">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{ 
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-8 h-8 bg-main-color/20 rounded-full blur-sm"
                />
                <motion.div
                    animate={{ 
                        y: [0, 15, 0],
                        opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-orange-500/20 rounded-full blur-sm"
                />
            </div>
            
            {/* Main Loading Animation */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Morphing Shape */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative mb-6"
                >
                    <motion.div
                        animate={{ 
                            borderRadius: ["50%", "25%", "50%"],
                            rotate: [0, 180, 360]
                        }}
                        transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-20 h-20 bg-gradient-to-br from-main-color to-orange-500 relative overflow-hidden"
                    >
                        <motion.div
                            animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.8, 0.3, 0.8]
                            }}
                            transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-2 bg-white/30 rounded-full"
                        />
                    </motion.div>
                </motion.div>
                
                {/* Text Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-center"
                >
                    <motion.h3 
                        animate={{ 
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-base font-semibold text-gray-900 mb-1"
                    >
                        Authenticating
                    </motion.h3>
                    <p className="text-xs text-gray-600">Securing your session...</p>
                </motion.div>
            </div>
        </div>
    );
}