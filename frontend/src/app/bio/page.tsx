import { getBiography } from '@/lib/api';
import { Metadata } from 'next';
import { getBreadcrumbSchema } from '@/lib/schemas';

export async function generateMetadata(): Promise<Metadata> {
    const biographyData = await getBiography();
    const description = biographyData?.content?.slice(0, 160) || "Learn about Okan Uzun's background, experience, and professional journey. Professional portfolio and biography information.";
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    return {
        title: "Biography | Okan Uzun",
        description: description,
        keywords: "biography, experience, professional background, Okan Uzun",
        alternates: {
            canonical: `${baseUrl}/bio`
        },
        openGraph: {
            title: "Biography | Okan Uzun",
            description: description,
            type: "profile",
            url: `${baseUrl}/bio`,
            ...(biographyData?.image_url && {
                images: [
                    {
                        url: biographyData.image_url,
                        width: 1200,
                        height: 1600,
                        alt: "Okan Uzun Biography"
                    }
                ]
            })
        },
        twitter: {
            card: "summary_large_image",
            title: "Biography | Okan Uzun",
            description: description,
        }
    };
}

export default async function SplitPage() {
    const biographyData = await getBiography();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    // API başarısız olursa yedek veriler
    const content = biographyData?.content || "Biyografi içeriği yükleniyor...";
    const image = biographyData?.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1600&fit=crop";
    const experiences = biographyData?.experience || [];

    // Breadcrumb Schema
    const breadcrumbItems = [
        { name: "Home", url: baseUrl },
        { name: "Biography", url: `${baseUrl}/bio` }
    ];
    const breadcrumbSchema = getBreadcrumbSchema(baseUrl, breadcrumbItems);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="min-h-screen flex flex-col md:flex-row font-serif">

            {/* Metin Bölümü */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
                <div className="max-w-2xl text-center">
                    <h1 className="text-2xl md:text-3xl font-normal text-gray-900 mb-10 tracking-wide">
                        Okan Uzun - Biography
                    </h1>

                    <div className="space-y-6 text-gray-800 leading-relaxed text-[15px]">
                        <p>
                            {content}
                        </p>

                        {experiences.length > 0 && (
                            <div className="space-y-2 mt-8">
                                {experiences.map((experience, index) => (
                                    <p key={index}>{experience.title}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Resim Bölümü */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
                <img
                    src={image}
                    alt="Portföy"
                    className="w-full h-full object-cover object-top"
                />
            </div>
        </div>
        </>
    );
}