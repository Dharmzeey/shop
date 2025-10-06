import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "Dharmzeey Shop - Your Complete Online Marketplace",
        template: "%s | Dharmzeey Shop"
    },
    description: "Shop everything you need in one place. Browse electronics, fashion, home essentials, beauty products, sports gear, books and more. Fast delivery, secure payments, and excellent customer service.",
    keywords: [
        "online shopping Nigeria", "buy online", "ecommerce marketplace", "electronics online",
        "fashion store", "home goods", "beauty products", "sports equipment",
        "online marketplace", "shop online Nigeria", "fast delivery",
        "books online", "gadgets", "accessories"
    ],
    authors: [{ name: "Dharmzeey Shop" }],
    creator: "Dharmzeey Shop",
    publisher: "Dharmzeey Shop",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://shop.dharmzeey.com'),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Dharmzeey Shop - Your Complete Online Marketplace",
        description: "Shop everything you need in one place. Browse electronics, fashion, home essentials, beauty products, and more with fast delivery.",
        url: "/",
        siteName: "Dharmzeey Shop",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Dharmzeey Shop - Complete Online Marketplace",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dharmzeey Shop - Your Complete Online Marketplace",
        description: "Shop everything you need in one place. Electronics, fashion, home essentials, and more.",
        images: ["/og-image.jpg"],
        creator: "@dharmzeey",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-verification-code",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#0D9488" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            </head>
            <body className="font-inter antialiased bg-gray-50">
                <div className="flex flex-col min-h-screen">
                    {children}
                </div>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Store",
                            "name": "Dharmzeey Shop",
                            "description": "Complete online marketplace offering electronics, fashion, home goods, beauty products, and more",
                            "url": process.env.NEXT_PUBLIC_SITE_URL,
                            "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "Nigeria"
                            },
                            "telephone": "+234-903-587-7851",
                            "sameAs": [
                                "https://x.com/dharmzeey",
                                "https://www.instagram.com/dharmzeey",
                                "https://web.facebook.com/dharmzeey"
                            ]
                        })
                    }}
                />
            </body>
        </html>
    );
}