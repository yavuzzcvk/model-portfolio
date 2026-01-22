import { getBiography } from '@/lib/api';

export default async function SplitPage() {
    const biographyData = await getBiography();

    // API başarısız olursa yedek veriler
    const content = biographyData?.content || "Biyografi içeriği yükleniyor...";
    const image = biographyData?.image_url || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1600&fit=crop";
    const experiences = biographyData?.experience || [];

    return (
        <div className="min-h-screen flex flex-col md:flex-row font-serif">

            {/* Metin Bölümü */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
                <div className="max-w-2xl text-center">
                    <h1 className="text-2xl md:text-3xl font-normal text-gray-900 mb-10 tracking-wide">
                        Bio
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
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}