'use client';

import { useState } from 'react';
import { MeasurementData } from '@/lib/api';

interface MeasurementsClientProps {
    initialData: MeasurementData | null;
}

export default function MeasurementsClient({ initialData }: MeasurementsClientProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (!initialData) {
        return (
            <div className="min-h-screen py-24 px-4 bg-white flex items-center justify-center">
                <p className="text-gray-600 font-serif">Veri bulunamadı</p>
            </div>
        );
    }

    const measurements = [
        { label: 'Height', value: initialData.height_cm ? `${initialData.height_cm} cm` : '-' },
        { label: 'Chest', value: initialData.chest_in ? `${initialData.chest_in} cm` : '-' },
        { label: 'Waist', value: initialData.waist_in ? `${initialData.waist_in} cm` : '-' },
        { label: 'Shoe', value: initialData.shoe_size && initialData.shoe_region ? `${initialData.shoe_size} ${initialData.shoe_region}` : '-' },
        { label: 'Suit', value: initialData.suit_size || '-' },
        { label: 'Hair', value: initialData.hair_color || '-' }
    ];

    const photos = initialData.images_url || [];

    const handlePrevious = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
    };

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
