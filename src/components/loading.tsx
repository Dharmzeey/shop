import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[70vh] relative overflow-hidden">
            {/* Animated Background */}
            {/* <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-main-color/5 via-transparent to-orange-500/5" />
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-main-color/10 rounded-full blur-xl"
                />
                <motion.div
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    }}
                    className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"
                />
            </div> */}
            
            {/* Main Loading Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo with Pulse Effect */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8"
                >
                    {/* <motion.div
                        animate={{ 
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg"
                    >
                        <Image
                            src="/logo.png"
                            alt="Dharmzeey Shop"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </motion.div> */}
                    
                    {/* Rotating Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 border-2 border-main-color/30 border-t-main-color rounded-2xl"
                    />
                </motion.div>
                
                {/* Modern Spinner */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="relative mb-6"
                >
                    <div className="w-16 h-16 relative">
                        {/* Outer Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 border-2 border-gray-200 border-t-main-color rounded-full"
                        />
                        {/* Inner Ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-2 border-2 border-gray-100 border-b-orange-500 rounded-full"
                        />
                        {/* Center Dot */}
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-6 bg-main-color rounded-full"
                        />
                    </div>
                </motion.div>
                
                {/* Loading Text with Dots Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="text-center"
                >
                    <div className="flex items-center gap-1">
                        <span className="text-gray-600 font-medium text-sm">Loading</span>
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="flex gap-1"
                        >
                            <span className="w-1 h-1 bg-main-color rounded-full" />
                            <span className="w-1 h-1 bg-main-color rounded-full" />
                            <span className="w-1 h-1 bg-main-color rounded-full" />
                        </motion.div>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                        className="text-xs text-gray-500 mt-2"
                    >
                        Please wait while we load your content
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}