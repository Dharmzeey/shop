import ProductClient from "@/components/products/ProductItems";
import ProductNotFound from "@/components/products/productNotFound";
import {
    fetchProductBrands,
    fetchProductsByBrand,
    fetchProductsByCategory,
} from "@/services/productApi";
import { Metadata } from "next";

type Props = {
    params: Promise<{
        gadgetType: string;
    }>;
    searchParams: Promise<{
        brandName?: string;
    }>;
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { gadgetType } = await props.params;
    const { brandName } = await props.searchParams;

    // ✅ Decode URL-encoded values (e.g., Smart%20Watches → Smart Watches)
    const decodedGadgetType = decodeURIComponent(gadgetType);
    const decodedBrandName = brandName ? decodeURIComponent(brandName) : undefined;

    const brands = await fetchProductBrands(gadgetType);

    if (!brands || brands.length === 0) {
        return {
            title: "Products Not Found | Dharmzeey Shop",
            description: "The products or category you're looking for are not available in our shop.",
        };
    }

    const brandNames = brands.map((brand) => brand.name).join(", ");
    const title = decodedBrandName
        ? `${decodedBrandName} ${decodedGadgetType} - Premium ${decodedGadgetType} Collection`
        : `${decodedGadgetType} - Premium ${decodedGadgetType} Collection`;

    const description = decodedBrandName
        ? `Shop premium ${decodedBrandName} ${decodedGadgetType.toLowerCase()} at Dharmzeey Shop. Brand new and certified pre-owned ${decodedBrandName} devices with warranty. Best prices in Nigeria.`
        : `Explore our premium ${decodedGadgetType.toLowerCase()} collection including ${brandNames}. Brand new, UK/US direct imports, and certified pre-owned devices with warranty.`;

    const keywords = [
        decodedGadgetType,
        `${decodedGadgetType} Nigeria`,
        `buy ${decodedGadgetType}`,
        `${decodedGadgetType} store`,
        `premium ${decodedGadgetType}`,
        ...brands.map((brand) => `${brand.name} ${decodedGadgetType}`),
        ...(decodedBrandName
            ? [
                `${decodedBrandName} ${decodedGadgetType}`,
                `${decodedBrandName} store Nigeria`,
            ]
            : []),
        "electronics store Nigeria",
        "Dharmzeey Shop",
    ];

    return {
        title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            type: "website",
            images: [
                {
                    url: "/og-category.jpg",
                    width: 1200,
                    height: 630,
                    alt: `${decodedGadgetType} at Dharmzeey Shop`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["/og-category.jpg"],
        },
        alternates: {
            canonical: `/products/${encodeURIComponent(decodedGadgetType)}${decodedBrandName ? `?brandName=${encodeURIComponent(decodedBrandName)}` : ""
                }`,
        },
        other: {
            "product:category": decodedGadgetType,
            ...(decodedBrandName && { "product:brand": decodedBrandName }),
        },
    };
};

export default async function DevicePage({ params, searchParams }: Props) {
    const { gadgetType } = await params;
    const { brandName } = await searchParams;

    // ✅ Decode before use
    const decodedGadgetType = decodeURIComponent(gadgetType);

    const brands = await fetchProductBrands(gadgetType);
    const products = brandName
        ? await fetchProductsByBrand(gadgetType, brandName)
        : await fetchProductsByCategory(gadgetType);

    if (brands.length >= 1 && products.length >= 1) {
        return (
            <ProductClient
                gadgetType={decodedGadgetType}
                brands={brands}
                products={products}
            />
        );
    }

    return <ProductNotFound />;
}
