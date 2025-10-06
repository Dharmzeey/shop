'use client';

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faBars, faX, faSearch, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useCartContext } from "@/contexts/cartContext";
import { useAuthContext } from "@/contexts/authContext";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { logout } from "@/services/authApis";
import { fetchProductCategories } from "@/services/productApi";
import { Category } from "@/types/productInterfaces";

export default function Header() {
    const pathName = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { cartCount } = useCartContext();
    const user = useAuthContext();

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);

    useEffect(() => {
        async function loadCategories() {
            try {
                const data = await fetchProductCategories();
                setFetchedCategories(data);
            } catch (err) {
                console.log(err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    useEffect(() => {
        setMenuOpen(false);
        setUserMenuOpen(false);
    }, [pathName]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/products/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleLogout = () => {
        logout();
        router.push("/");
        setUserMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container-width section-padding">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative w-12 h-12 transition-transform duration-200 group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Dharmzeey Shop - Your All-in-One Marketplace"
                                fill
                                className="object-contain"
                                priority
                                sizes="48px"
                            />
                        </div>
                        {/* <span className="text-xl font-bold text-gray-900 hidden sm:block">Dharmzeey Shop</span> */}
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                        <form onSubmit={handleSearchSubmit} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-main-color/20 focus:border-main-color transition-all duration-200"
                                />
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-main-color text-white px-4 py-1.5 rounded-xl hover:bg-teal-700 transition-colors duration-200"
                                >
                                    Search
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Categories */}
                        <div className="flex items-center space-x-4 text-sm font-medium">
                            {
                                fetchedCategories?.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/products/${encodeURIComponent(category.name)}`}
                                        className="text-gray-700 hover:text-main-color transition-colors duration-200"
                                    >
                                        {category.name.split("&")[0]}
                                    </Link>
                                ))
                            }
                        </div>

                        {/* User Actions */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <>
                                    <Link href="/account/wishlist" className="relative p-2 text-gray-700 hover:text-main-color transition-colors duration-200">
                                        <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                                    </Link>

                                    <Link href="/cart" className="relative p-2 text-gray-700 hover:text-main-color transition-colors duration-200">
                                        <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
                                        {cartCount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 bg-main-color text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                                            >
                                                {cartCount > 99 ? '99+' : cartCount}
                                            </motion.span>
                                        )}
                                    </Link>

                                    <div className="relative">
                                        <button
                                            onClick={toggleUserMenu}
                                            className="flex items-center space-x-2 p-2 text-gray-700 hover:text-main-color transition-colors duration-200"
                                        >
                                            <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                                            <span className="text-sm font-medium">Account</span>
                                        </button>

                                        <AnimatePresence>
                                            {userMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2"
                                                >
                                                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                                        Profile
                                                    </Link>
                                                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                                        Orders
                                                    </Link>
                                                    <Link href="/account/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                                                        Wishlist
                                                    </Link>
                                                    <hr className="my-2 border-gray-100" />
                                                    <button
                                                        onClick={handleLogout}
                                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                    >
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-main-color transition-colors duration-200">
                                        Login
                                    </Link>
                                    <Link href="/signup" className="btn-primary text-sm">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex lg:hidden items-center space-x-3">
                        <Link href="/cart" className="relative p-2">
                            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 text-gray-700" />
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 bg-main-color text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                                >
                                    {cartCount > 99 ? '99+' : cartCount}
                                </motion.span>
                            )}
                        </Link>

                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-700 hover:text-main-color transition-colors duration-200"
                        >
                            <FontAwesomeIcon icon={menuOpen ? faX : faBars} className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-4">
                    <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-main-color/20 focus:border-main-color transition-all duration-200"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100"
                    >
                        <div className="section-padding py-4 space-y-4">
                            {/* Categories */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Categories</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {
                                        fetchedCategories?.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/products/${encodeURIComponent(category.name)}`}
                                                className="p-3 bg-gray-50 rounded-xl text-center text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                {category.name.split("&")[0]}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* User Actions */}
                            {user ? (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Account</h3>
                                    <div className="space-y-1">
                                        <Link href="/account" className="block p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                                            Profile
                                        </Link>
                                        <Link href="/account/orders" className="block p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                                            Orders
                                        </Link>
                                        <Link href="/account/wishlist" className="block p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200">
                                            Wishlist
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left p-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Link href="/login" className="block w-full text-center p-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                        Login
                                    </Link>
                                    <Link href="/signup" className="block w-full text-center p-3 text-sm font-medium bg-main-color text-white rounded-xl hover:bg-teal-700 transition-colors duration-200">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}