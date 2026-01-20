"use client";

import { useState } from 'react';

export default function ModelProfile() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const measurements = [
        { label: 'Height', value: "5'9" },
        { label: 'Bust', value: '32' },
        { label: 'Waist', value: '25' },
        { label: 'Hips', value: '35' },
        { label: 'Shoe', value: '9.5' },
        { label: 'Dress', value: '0-2' }
    ];

    const photos = [
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1200&fit=crop',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1200&fit=crop'
    ];

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
                    <h2 className="text-3xl font-serif text-gray-900 mb-8">Measurements</h2>
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
                                    alt={`Portfolio ${index + 1}`}
                                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
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