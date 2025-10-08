import React from "react";
import { numberWithCommas } from "@/utils/filter";
import { fetchProductById } from "@/services/productApi";
import IncreamentDecreamentCheck from "@/components/cart/cartModification";
import ProductNotFound from "@/components/products/productNotFound";
import ImageComponent from "@/components/interractivity/image";
import SimilarProducts from "@/components/products/similarProducts";
import RecentlyViewed from "@/components/products/recentlyViewed";
import Wishlist from "@/components/cart/wishlist";
import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faTruck, faExchangeAlt, faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
    params: Promise<{
        productInfo: string;
    }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const params = await props.params;
    const product = await fetchProductById(params.productInfo.slice(-36));

    console.log(product)

    if (!product) {
        return {
            title: `Product Not Found | Dharmzeey Shop`,
            description: `The product you are looking for does not exist or is unavailable.`,
        };
    }

    // const productSchema = {
    //     "@context": "https://schema.org",
    //     "@type": "Product",
    //     "name": product.name,
    //     "description": product.description,
    //     "image": product.image,
    //     "brand": {
    //         "@type": "Brand",
    //         "name": product.brand
    //     },
    //     "category": product.category,
    //     "offers": {
    //         "@type": "Offer",
    //         "price": product.price,
    //         "priceCurrency": "NGN",
    //         "availability": product.availabilityStatus === "In Stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    //         "condition": product.utilizationStatus === "Brand New" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition"
    //     },
    //     "aggregateRating": {
    //         "@type": "AggregateRating",
    //         "ratingValue": "4.0",
    //         "reviewCount": "25"
    //     }
    // };

    return {
        title: `${product.name} - ${product.brand} ${product.category}`,
        description: `${product.description.slice(0, 160)}... Buy ${product.name} at Dharmzeey Shop. Price: ₦${numberWithCommas(product.price)}`,
        keywords: [
            product.name,
            product.brand,
            product.category,
            `${product.brand} ${product.category}`,
            `buy ${product.name}`,
            `${product.name} price`,
            `${product.utilizationStatus} ${product.category}`,
            "quality products",
            "Dharmzeey Shop"
        ],
        openGraph: {
            title: `${product.name} - ${product.brand} ${product.category}`,
            description: `${product.description.slice(0, 160)}...`,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 800,
                    alt: product.name,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} - ${product.brand} ${product.category}`,
            description: `${product.description.slice(0, 160)}...`,
            images: [product.image],
        },
        other: {
            "product:price:amount": product.price.toString(),
            "product:price:currency": "NGN",
            "product:availability": product.availabilityStatus,
            "product:condition": product.utilizationStatus,
            "product:brand": product.brand,
            "product:category": product.category,
        },
        alternates: {
            canonical: `/products/${product.category}/${params.productInfo}`,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
};

export default async function ProductDetail({ params }: Props) {
    const resolvedParams = await params;
    const productId = resolvedParams.productInfo.slice(-36);
    const product = await fetchProductById(productId);

    if (!product) return <ProductNotFound />;

    const features = [
        "Genuine product guarantee",
        "1-year warranty included",
        "Free delivery within Ibadan",
        // "30-day return policy",
        // "Expert technical support"
    ];

    return (
        <div className="container-width section-padding py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                <Link href="/" className="hover:text-main-color transition-colors duration-200">Home</Link>
                <span>/</span>
                <Link href={`/products/${product.category}`} className="hover:text-main-color transition-colors duration-200">
                    {product.category}
                </Link>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-xs block">{product.name.split(" ").slice(0, 12).join(" ")}{product.name.split(" ").length > 12 ? "..." : ""}</span>
            </nav>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                {/* Left Column - Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square max-w-md mx-auto lg:max-w-none rounded-xl overflow-hidden bg-gray-50 group">
                        <ImageComponent src={product.image} alt={product.name} />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-200" />
                    </div>

                    {/* Thumbnail Gallery - Placeholder for future multiple images */}
                    <div className="grid grid-cols-4 gap-2 max-w-md mx-auto lg:max-w-none">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-main-color transition-all duration-200 cursor-pointer">
                                <ImageComponent src={product.image} alt={`${product.name} view ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Product Info */}
                <div className="space-y-6">
                    {/* Status Badges */}
                    <div className="flex gap-3">
                        {
                            product.utilizationStatus && (
                                <span className={`status-badge ${product.utilizationStatus === "Brand New" ? "status-new" : "status-used"}`}>
                                    {product.utilizationStatus}
                                </span>
                            )
                        }
                        <span className={`status-badge ${product.availabilityStatus === "In Stock" ? "status-in-stock" : "status-out-of-stock"}`}>
                            {product.availabilityStatus}
                        </span>
                    </div>

                    {/* Product Title & Brand */}
                    <div>
                        <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                        <h1 className="text-base md:text-lg font-bold text-gray-900 mb-3">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-600">(4.0) • 25 reviews</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <div className="text-lg font-bold text-main-color">
                            ₦{numberWithCommas(product.price)}
                        </div>
                        <div className="text-xs text-gray-500">
                            Price includes VAT • Free delivery within Ibadan
                        </div>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900">What&apos;s Included</h3>
                        <ul className="space-y-2">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <IncreamentDecreamentCheck product={product} />
                            <Wishlist product_id={productId} userWishlist={product.user_wishlist} />
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center justify-center space-x-4 py-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-1 text-xs text-gray-600">
                                <FontAwesomeIcon icon={faShieldAlt} className="w-3 h-3 text-green-500" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-600">
                                <FontAwesomeIcon icon={faTruck} className="w-3 h-3 text-blue-500" />
                                <span>Fast Delivery</span>
                            </div>
                            {/* <div className="flex items-center space-x-1 text-xs text-gray-600">
                                <FontAwesomeIcon icon={faExchangeAlt} className="w-3 h-3 text-purple-500" />
                                <span>Easy Returns</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Product Description</h2>
                <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>
                </div>
            </div>

            {/* Similar Products Section */}
            <SimilarProducts productId={productId} />

            {/* Recently Viewed Section */}
            <RecentlyViewed productId={productId} />
        </div>
    );
}