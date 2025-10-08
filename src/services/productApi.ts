// import "server-only";

import { Brand, Category, Product } from "@/types/productInterfaces";
import {
    PRODUCT_CATEGORIES_URL,
    PRODUCTS_URL,
    PRODUCT_BRAND_URL,
    PRODUCT_BY_BRAND_URL,
    PRODUCT_BY_CATEGORY_URL,
    PRODUCT_DETAILS_URL,
    SIMILAR_PRODUCTS_URL,
} from "@/utils/urls/productUrls";
import { fetchAccessTokenCookie } from "@/utils/cookieUtils";

export async function fetchProductCategories() {
    const response = await fetch(PRODUCT_CATEGORIES_URL, {
        next: { revalidate: 300 } // Purge and recache every 5 minutes (300 seconds)
    });
    // console.log(response)
    const categories: Category[] = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return categories;
}

export async function fetchAllProducts() {
    const token = await fetchAccessTokenCookie();
    const response = await fetch(PRODUCTS_URL, {
        // headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token?.value || ""}`
        // },
        // next: { revalidate: 300 }
    });
    // console.log(response)
    const products: Product[] = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return products;
}

export async function fetchProductById(id: string) {
    const token = await fetchAccessTokenCookie();
    const response = await fetch(PRODUCT_DETAILS_URL(id), {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value || ""}`
        },
        next: { revalidate: 300 }
    });
    // console.log(response)
    const product: Product = await response.json();
    // console.log(response)
    if (!response.ok) {
        return null;
    }
    return product;
}

export async function fetchProductBrands(categoryName: string) {
    const response = await fetch(PRODUCT_BRAND_URL(categoryName), {
        next: { revalidate: 300 }
    });
    // console.log(response)
    const brands: Brand[] = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch brands");
    }
    return brands;
}

export async function fetchProductsByCategory(categoryName: string) {
    const token = await fetchAccessTokenCookie();
    const response = await fetch(PRODUCT_BY_CATEGORY_URL(categoryName), {
        // headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token?.value || ""}`
        // },
        // next: { revalidate: 300 }
    });
    // console.log(response)
    const products: Product[] = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return products;
}

export async function fetchProductsByBrand(categoryName: string, brandName: string) {
    const response = await fetch(PRODUCT_BY_BRAND_URL(categoryName, brandName), {
        cache: "force-cache"
    });
    // console.log(response)
    const products: Product[] = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return products;
}

export async function fetchSimilarProducts(productId: string) {
    const response = await fetch(SIMILAR_PRODUCTS_URL(productId), {
        next: { revalidate: 300 }
    });
    // console.log(response)
    const products: Product[] = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return products;
}
