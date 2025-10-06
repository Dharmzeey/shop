import { MetadataRoute } from 'next';
import { fetchAllProducts, fetchProductCategories } from '@/services/productApi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shop.dharmzeey.com';
    const categories = await fetchProductCategories();


    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        ...categories?.map((category) => ({
            url: `${baseUrl}/products/${encodeURIComponent(category.name)}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        })),
        {
            url: `${baseUrl}/cart`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/signup`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
    ];

    // Dynamic product pages
    try {
        const products = await fetchAllProducts();
        const productPages = products.map((product) => ({
            url: `${baseUrl}/products/${encodeURIComponent(product.category)}/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

        return [...staticPages, ...productPages];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return staticPages;
    }
}