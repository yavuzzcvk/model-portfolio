import { Metadata } from 'next';
import { getMeasurements } from '@/lib/api';
import { getBreadcrumbSchema } from '@/lib/schemas';
import MeasurementsClient from '@/components/measurements-client';

export async function generateMetadata(): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    return {
        title: 'Measurements | Okan Uzun',
        description: 'Professional model measurements and specifications for Okan Uzun. Height, chest, waist, shoe size and physical attributes.',
        keywords: 'measurements, model specifications, height, chest, waist, shoe size, physical attributes, Okan Uzun',
        alternates: {
            canonical: `${baseUrl}/measurements`
        },
        openGraph: {
            title: 'Measurements | Okan Uzun',
            description: 'Professional model measurements and specifications for Okan Uzun.',
            url: `${baseUrl}/measurements`,
            type: 'profile',
            siteName: 'Okan Uzun Portfolio'
        },
        twitter: {
            card: 'summary',
            title: 'Measurements | Okan Uzun',
            description: 'Professional model measurements and specifications for Okan Uzun.'
        }
    };
}

export default async function MeasurementsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const measurementData = await getMeasurements();
    
    const breadcrumbSchema = getBreadcrumbSchema(baseUrl, [
        { name: 'Home', url: baseUrl },
        { name: 'Measurements', url: `${baseUrl}/measurements` }
    ]);
    
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <MeasurementsClient initialData={measurementData} />
        </>
    );
}
