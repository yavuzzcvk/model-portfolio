"use client";

import { useState, useEffect } from 'react';
import { getMeasurements, MeasurementData } from '@/lib/api';

export default function ModelProfile() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [measurementData, setMeasurementData] = useState<MeasurementData | null>(null);
    const [loading, setLoading] = useState(true);

    // SEO Meta tags for measurements page
    useEffect(() => {
        if (typeof document !== 'undefined') {
            // Update document title
            document.title = 'Measurements | Okan Uzun';
            
            // Update meta description
            let metaDescription = document.querySelector('meta[name="description"]');
            if (!metaDescription) {
                metaDescription = document.createElement('meta');
                metaDescription.setAttribute('name', 'description');
                document.head.appendChild(metaDescription);
            }
            metaDescription.setAttribute('content', 'Professional model measurements and specifications for Okan Uzun. Height, chest, waist, shoe size and physical attributes.');
            
            // Update canonical URL
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.setAttribute('rel', 'canonical');
                document.head.appendChild(canonical);
            }
            const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
            canonical.setAttribute('href', `${baseUrl}/measurements`);
            
            // Add breadcrumb schema
            let breadcrumbScript = document.querySelector('script[data-breadcrumb="measurements"]');
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
                            "name": "Measurements",
                            "item": `${baseUrl}/measurements`
                        }
                    ]
                };
                breadcrumbScript = document.createElement('script');
                breadcrumbScript.setAttribute('type', 'application/ld+json');
                breadcrumbScript.setAttribute('data-breadcrumb', 'measurements');
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
            ogTitle.setAttribute('content', 'Measurements | Okan Uzun');
        }
    }, []);

    useEffect(() => {
        async function fetchData() {
            const data = await getMeasurements();
            setMeasurementData(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    // API'den gelen verilerle measurements dizisini oluştur
    const measurements = measurementData ? [
        { label: 'Height', value: measurementData.height_cm ? `${measurementData.height_cm} cm` : '-' },
        { label: 'Chest', value: measurementData.chest_in ? `${measurementData.chest_in} cm` : '-' },
        { label: 'Waist', value: measurementData.waist_in ? `${measurementData.waist_in} cm` : '-' },
        { label: 'Shoe', value: measurementData.shoe_size && measurementData.shoe_region ? `${measurementData.shoe_size} ${measurementData.shoe_region}` : '-' },
        { label: 'Suit', value: measurementData.suit_size || '-' },
        { label: 'Hair', value: measurementData.hair_color || '-' }
    ] : [];

    const photos = measurementData?.images_url || [];

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
    };

    if (loading) {
        return (
            <div className="min-h-screen py-24 px-4 bg-white flex items-center justify-center">
                <p className="text-gray-600 font-serif">Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Measurements Single Line */}
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-serif text-gray-900 mb-4">Okan Uzun - Measurements</h1>
                    <h2 className="text-lg font-serif text-gray-700 mb-6 font-normal">Professional Model Specifications</h2>
                    <p className="text-lg md:text-xl text-gray-800 font-serif tracking-wide">
                        {measurements.map((item, index) => (
                            <span key={index}>
                                <span>{item.label}:</span> {item.value}
                                {index < measurements.length - 1 && <span className="mx-3 text-gray-400">/</span>}
                            </span>
                        ))}
                    </p>
                </div>

                {/* Photo Gallery */}
                {photos.length > 0 && (
                    <div className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {photos.map((photo, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                    onClick={() => setSelectedIndex(index)}
                                >
                                    <img
                                        src={photo}
                                        alt={`Okan Uzun model measurements and portfolio photo ${index + 1}`}
                                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedIndex(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-black text-5xl hover:text-gray-600 transition-colors z-[60]"
                        onClick={() => setSelectedIndex(null)}
                    >
                        ×
                    </button>

                    {/* Left Arrow */}
                    <button
                        className="absolute left-4 md:left-8 text-black text-6xl hover:text-gray-600 transition-transform hover:-translate-x-1 p-4 z-[60]"
                        onClick={handlePrevious}
                    >
                        ‹
                    </button>

                    <img
                        src={photos[selectedIndex]}
                        alt="Enlarged view"
                        className="max-w-full max-h-[90vh] object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Right Arrow */}
                    <button
                        className="absolute right-4 md:right-8 text-black text-6xl hover:text-gray-600 transition-transform hover:translate-x-1 p-4 z-[60]"
                        onClick={handleNext}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
}
