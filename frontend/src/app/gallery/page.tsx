'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronUp } from 'lucide-react';
import { getGalleryItems, GalleryItem as APIGalleryItem } from '@/lib/api';

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [activeFilter, setActiveFilter] = useState<'image' | 'video'>('image');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [galleryData, setGalleryData] = useState<APIGalleryItem[]>([]);
    const [loading, setLoading] = useState(true);

    // SEO Meta tags for gallery page
    useEffect(() => {
        if (typeof document !== 'undefined') {
            // Update document title
            document.title = 'Gallery | Okan Uzun';
            
            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', 'View Okan Uzun portfolio gallery - Photos and videos from professional work and projects.');
            
            // Update canonical URL
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
            canonical.setAttribute('href', `${baseUrl}/gallery`);
            
            // Add breadcrumb schema
            let breadcrumbScript = document.querySelector('script[data-breadcrumb="gallery"]');
            if (!breadcrumbScript) {
                const breadcrumbSchema = {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        {
                            "@type": "ListItem",
                            "position": 1,
                            "name": "Home",
                            "item": baseUrl
                        },
                        {
                            "@type": "ListItem",
                            "position": 2,
                            "name": "Gallery",
                            "item": `${baseUrl}/gallery`
                        }
                    ]
                };
                breadcrumbScript = document.createElement('script');
                breadcrumbScript.setAttribute('type', 'application/ld+json');
                breadcrumbScript.setAttribute('data-breadcrumb', 'gallery');
                breadcrumbScript.innerHTML = JSON.stringify(breadcrumbSchema);
                document.head.appendChild(breadcrumbScript);
            }
            
            // Update OG tags
            let ogTitle = document.querySelector('meta[property="og:title"]');
            if (!ogTitle) {
                ogTitle = document.createElement('meta');
                ogTitle.setAttribute('property', 'og:title');
                document.head.appendChild(ogTitle);
            }
            ogTitle.setAttribute('content', 'Gallery | Okan Uzun');
            
            let ogDescription = document.querySelector('meta[property="og:description"]');
            if (!ogDescription) {
                ogDescription = document.createElement('meta');
                ogDescription.setAttribute('property', 'og:description');
                document.head.appendChild(ogDescription);
            }
            ogDescription.setAttribute('content', 'View Okan Uzun portfolio gallery');
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await getGalleryItems();
            setGalleryData(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    interface GalleryItem {
        id: string;
        type: 'image' | 'video';
        src: string;
        alt: string;
    }

    const photoItems: GalleryItem[] = galleryData
        .filter(item => Boolean(item.image_url))
        .map(item => ({
            id: `${item.id}-image`,
            type: 'image' as const,
            src: item.image_url ?? '',
            alt: `Okan Uzun professional modeling portfolio photo - Gallery image ${item.id}`
        }));

    const videoItems: GalleryItem[] = galleryData
        .filter(item => Boolean(item.video_url))
        .map(item => ({
            id: `${item.id}-video`,
            type: 'video' as const,
            src: item.video_url ?? '',
            alt: `Okan Uzun professional modeling portfolio video - Gallery video ${item.id}`
        }));

    const filteredItems = activeFilter === 'image' ? photoItems : videoItems;

    useEffect(() => {
        if (selectedImage !== null && selectedImage >= filteredItems.length) {
            setSelectedImage(null);
        }
    }, [filteredItems.length, selectedImage]);

    const handlePrevious = () => {
        if (selectedImage !== null && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    const handleNext = () => {
        if (selectedImage !== null && selectedImage < filteredItems.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (selectedImage === null) return;

        if (e.key === 'ArrowLeft') handlePrevious();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setSelectedImage(null);
    };

    // Keyboard navigation
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown as any);
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4">Okan Uzun - Gallery</h1>

                    {/* Filter Segment */}
                    <div className="flex justify-center gap-8 mt-8 border-b border-gray-100 pb-4">
                        <button
                            onClick={() => { setActiveFilter('image'); setSelectedImage(null); }}
                            className={`text-sm uppercase tracking-widest transition-colors ${activeFilter === 'image' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}
                        >
                            Photos
                        </button>
                        <button
                            onClick={() => { setActiveFilter('video'); setSelectedImage(null); }}
                            className={`text-sm uppercase tracking-widest transition-colors ${activeFilter === 'video' ? 'text-black font-semibold' : 'text-gray-400 hover:text-black'}`}
                        >
                            Videos
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-600 font-serif">Yükleniyor...</p>
                    </div>
                ) : (
                    /* Masonry Grid */
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="break-inside-avoid cursor-pointer group relative overflow-hidden mb-4"
                                onClick={() => setSelectedImage(index)}
                            >
                                <div className="relative w-full">
                                    {item.type === 'video' ? (
                                        <video
                                            src={item.src}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                            muted
                                        />
                                    ) : (
                                        <Image
                                            src={item.src}
                                            alt={item.alt}
                                            width={800}
                                            height={900}
                                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            unoptimized
                                        />
                                    )}
                                    {item.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4 md:p-12"
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-gray-800 hover:text-black transition-colors z-50 bg-white/80 rounded-full"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Previous Button */}
                    {selectedImage > 0 && (
                        <button
                            className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center text-gray-800 hover:text-black transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    )}

                    {/* Next Button */}
                    {selectedImage < filteredItems.length - 1 && (
                        <button
                            className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center text-gray-800 hover:text-black transition-colors z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* Content */}
                    <div
                        className="relative max-w-full max-h-full aspect-auto flex items-center justify-center overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {filteredItems[selectedImage].type === 'image' ? (
                            <div className="relative w-screen h-[85vh]">
                                <Image
                                    src={filteredItems[selectedImage].src}
                                    alt={filteredItems[selectedImage].alt}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    unoptimized
                                    priority
                                />
                            </div>
                        ) : (
                            <video
                                src={filteredItems[selectedImage].src}
                                controls
                                autoPlay
                                className="max-w-full max-h-[85vh] shadow-2xl"
                            />
                        )}
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 font-serif text-sm">
                        {selectedImage + 1} / {filteredItems.length}
                    </div>
                </div>
            )}
            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-4 bg-[#4B1E26] text-white rounded-full shadow-2xl transition-all duration-500 z-40 hover:scale-110 active:scale-95 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6" />
            </button>
        </div>
    );
}

