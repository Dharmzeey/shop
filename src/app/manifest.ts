import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Dharmzeey Shop - Complete Online Marketplace',
        short_name: 'Dharmzeey Shop',
        description: 'Your complete online marketplace for electronics, fashion, home essentials, beauty, sports, and more. Shop everything you need in one place.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0D9488',
        orientation: 'portrait',
        categories: ['shopping', 'marketplace', 'ecommerce'],
        icons: [
            {
                "purpose": "maskable",
                "sizes": "512x512",
                "src": "icon512_maskable.png",
                "type": "image/png"
            },
            {
                "purpose": "any",
                "sizes": "512x512",
                "src": "icon512_rounded.png",
                "type": "image/png"
            }
        ],
        screenshots: [
            {
                src: '/screenshot-wide.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
            },
            {
                src: '/screenshot-narrow.png',
                sizes: '750x1334',
                type: 'image/png',
                form_factor: 'narrow',
            },
        ],
    };
}