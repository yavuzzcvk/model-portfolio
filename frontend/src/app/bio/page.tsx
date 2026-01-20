export default function SplitPage() {
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
                            Lauren Turman is a fashion model based in Los Angeles, California, but always
                            willing to travel. Specializing in high fashion, runway, editorial, e-commerce
                            and beauty, Lauren has been taking the modeling industry by storm for years
                            and doesn't plan to stop. Highlights include:
                        </p>

                        <div className="space-y-2 mt-8">
                            <p>New York Fashion Week</p>
                            <p>Los Angeles Swim Week</p>
                            <p>Vegan Fashion Week</p>
                            <p>Hope Tala's "Party Sickness" Music Video</p>
                            <p>Published in Glamour UK</p>
                            <p>Published in British Vogue</p>
                            <p>Published in Marie Claire Ukraine</p>
                            <p>Published in GMARO Magazine</p>
                            <p>Porsche Experience Center</p>
                            <p>Imbodhi</p>
                            <p>Oppenheimer</p>
                            <p>F/Row Fashion Week</p>
                            <p>Winnie Couture</p>
                            <p>Cariuma</p>
                            <p>Murphy Walsh</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resim Bölümü */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1600&fit=crop"
                    alt="Lauren Turman Portfolio"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}