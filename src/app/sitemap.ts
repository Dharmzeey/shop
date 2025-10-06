import { MetadataRoute } from 'next';
import { fetchAllProducts, fetchProductCategories } from '@/services/productApi';
import { Category, Product } from '@/types/productInterfaces';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shop.dharmzeey.com';

    let categories: Category[] = [];
    try {
        categories = await fetchProductCategories();
    } catch (err) {
        console.error('⚠️ Failed to fetch categories:', err);
        categories = [];
    }

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...categories.map((category) => ({
            url: `${baseUrl}/products/${encodeURIComponent(category.name)}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        })),
        {
            url: `${baseUrl}/cart`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    let products: Product[] = [];
    try {
        products = await fetchAllProducts();
    } catch (err) {
        console.error('⚠️ Failed to fetch products:', err);
        products = [];
    }

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/products/${encodeURIComponent(product.category)}/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticPages, ...productPages];
}
