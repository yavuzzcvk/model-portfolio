import { Metadata } from 'next';
import { getGalleryItems } from '@/lib/api';
import { getBreadcrumbSchema } from '@/lib/schemas';
import GalleryClient from '@/components/gallery-client';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    return {
        title: 'Gallery | Okan Uzun',
        description: 'View Okan Uzun portfolio gallery - Photos and videos from professional work and projects.',
        keywords: 'gallery, portfolio, photos, videos, modeling, professional work, Okan Uzun',
        alternates: {
            canonical: `${baseUrl}/gallery`
        },
        openGraph: {
            title: 'Gallery | Okan Uzun',
            description: 'View Okan Uzun portfolio gallery - Photos and videos from professional work and projects.',
            url: `${baseUrl}/gallery`,
            type: 'website',
            siteName: 'Okan Uzun Portfolio'
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Gallery | Okan Uzun',
            description: 'View Okan Uzun portfolio gallery - Photos and videos from professional work and projects.'
        }
    };
}

export default async function GalleryPage() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const galleryData = await getGalleryItems();
    
    const breadcrumbSchema = getBreadcrumbSchema(baseUrl, [
        { name: 'Home', url: baseUrl },
        { name: 'Gallery', url: `${baseUrl}/gallery` }
    ]);
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <GalleryClient initialData={galleryData} />
        </>
    );
}

