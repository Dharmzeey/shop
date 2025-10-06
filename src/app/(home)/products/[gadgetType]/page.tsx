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

    const brands = await fetchProductBrands(gadgetType);

    if (!brands || brands.length === 0) {
        return {
            title: "Products Not Found | Dharmzeey Shop",
            description: "The products or category you're looking for are not available in our shop.",
        };
    }

    const brandNames = brands.map((brand) => brand.name).join(", ");
    const title = brandName
        ? `${brandName} ${gadgetType} - Premium ${gadgetType} Collection`
        : `${gadgetType} - Premium ${gadgetType} Collection`;

    const description = brandName
        ? `Shop premium ${brandName} ${gadgetType.toLowerCase()} at Dharmzeey Shop. Brand new and certified pre-owned ${brandName} devices with warranty. Best prices in Nigeria.`
        : `Explore our premium ${gadgetType.toLowerCase()} collection including ${brandNames}. Brand new, UK/US direct imports, and certified pre-owned devices with warranty.`;

    const keywords = [
        gadgetType,
        `${gadgetType} Nigeria`,
        `buy ${gadgetType}`,
        `${gadgetType} store`,
        `premium ${gadgetType}`,
        ...brands.map(brand => `${brand.name} ${gadgetType}`),
        ...(brandName ? [`${brandName} ${gadgetType}`, `${brandName} store Nigeria`] : []),
        "electronics store Nigeria",
        "Dharmzeey Shop"
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
                    alt: `${gadgetType} at Dharmzeey Shop`,
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
            canonical: `/products/${gadgetType}${brandName ? `?brandName=${brandName}` : ''}`,
        },
        other: {
            "product:category": gadgetType,
            ...(brandName && { "product:brand": brandName }),
        },
    };
};

export default async function DevicePage({ params, searchParams }: Props) {
    const { gadgetType } = await params;
    const { brandName } = await searchParams;

    console.log("Gadget Type:", gadgetType);

    const brands = await fetchProductBrands(gadgetType);
    const products = brandName
        ? await fetchProductsByBrand(gadgetType, brandName)
        : await fetchProductsByCategory(gadgetType);

    if (brands.length >= 1 && products.length >= 1) {
        return (
            <ProductClient
            gadgetType={decodeURIComponent(gadgetType)}
            brands={brands}
            products={products}
            />
        );
    }

    return <ProductNotFound />;
}