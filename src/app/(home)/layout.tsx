import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Providers } from "@/contexts/providers";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "Dharmzeey Shop - Premium Products Store",
        template: "%s | Dharmzeey Shop"
    },
    description: "Discover premium products, clothings, accessories, and more.",
    keywords: [
        "online store Nigeria", "premium products", "best deals", "quality items",
        "electronics", "fashion", "home goods", "affordable shopping", "trusted seller",
        "customer satisfaction", "fast shipping", "exclusive offers", "new arrivals",
        "top brands", "gift ideas", "shop now"
    ],
    openGraph: {
        title: "Dharmzeey Shop - Quality Item  Store",
        description: "Your trusted destination for premium products in Nigeria",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@dharmzeey",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <div className={`${inter.className} min-h-screen bg-gray-50`}>
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
                <ToastContainer
                    limit={3}
                    autoClose={3000}
                    transition={Slide}
                    closeOnClick
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="z-50"
                    toastClassName="rounded-xl shadow-lg border"
                />
            </div>
        </Providers>
    );
}