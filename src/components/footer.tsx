"use client";

import { useEffect, useState } from "react";
import { faPhoneVolume, faMapMarkerAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import { fetchProductCategories } from "@/services/productApi";
import { Category } from "@/types/productInterfaces";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchProductCategories();
                setCategories(data || []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([]);
            }
        }
        loadCategories();
    }, []);

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container-width section-padding py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div>
                                <h3 className="text-xl font-bold">Dharmzeey Shop</h3>
                                <p className="text-sm text-gray-400">Your Complete Marketplace</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed text-justify">
                            Your one-stop destination for everything you need. From electronics to fashion,
                            home essentials to beauty products. We deliver quality products across all
                            categories with fast shipping and excellent customer service.
                        </p>
                        <div className="flex space-x-3">
                            <SocialIcon
                                url="https://x.com/dharmzeey"
                                bgColor="#1DA1F2"
                                style={{ width: "36px", height: "36px" }}
                                className="hover:scale-110 transition-transform duration-200"
                            />
                            <SocialIcon
                                url="https://www.instagram.com/dharmzeey"
                                bgColor="#E4405F"
                                style={{ width: "36px", height: "36px" }}
                                className="hover:scale-110 transition-transform duration-200"
                            />
                            <SocialIcon
                                url="https://web.facebook.com/dharmzeey"
                                bgColor="#1877F2"
                                style={{ width: "36px", height: "36px" }}
                                className="hover:scale-110 transition-transform duration-200"
                            />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Shop By Category</h4>
                        <ul className="space-y-3 text-sm">
                            {categories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/products/${encodeURIComponent(category.name)}`}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link href="/deals" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Special Deals
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Customer Service</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/account/orders" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href="/support" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Help & Support
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Returns & Exchanges
                                </Link>
                            </li>
                            <li>
                                <Link href="/warranty" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Warranty Information
                                </Link>
                            </li>
                            <li>
                                <Link href="/trade-in" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    Trade-In Program
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start space-x-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 text-main-color mt-1 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-300 leading-relaxed">Nigeria</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faPhoneVolume} className="w-4 h-4 text-main-color" />
                                <a href="tel:+2349035877851" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    +234 903 587 7851
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-main-color" />
                                <a href="mailto:support@shop.dharmzeey.com" className="text-gray-300 hover:text-white transition-colors duration-200">
                                    support@shop.dharmzeey.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container-width section-padding py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm text-gray-400">© {currentYear} Dharmzeey Shop. All rights reserved.</div>
                        <div className="flex items-center space-x-6 text-sm">
                            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Terms of Service
                            </Link>
                            <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors duration-200">
                                Shipping Info
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
