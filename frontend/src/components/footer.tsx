import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#4B1E26] text-white overflow-hidden">

            {/* Big Background Text */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none">
                <h2 className="text-[clamp(6rem,24vw,18rem)] font-black tracking-tight text-white/10 leading-none">
                    OKAN UZUN
                </h2>
            </div>

            <div className="relative max-w-7xl mx-auto px-2 py-20 min-h-[500px]">

                {/* Main Content - Side by Side */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-12">

                    {/* Left Side - Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 flex-1">

                        {/* Products */}
                        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-sm font-semibold mb-6">Products</h4>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li>Portfolio</li>
                                <li>Gallery</li>
                                <li>Services</li>
                                <li>Projects</li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-sm font-semibold mb-6">Company</h4>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li>Contact Us</li>
                                <li>About</li>
                                <li>Careers ↗</li>
                            </ul>
                        </div>

                        {/* Social (Eski Legal Alanı) */}
                        <div className="p-8">
                            <h4 className="text-sm font-semibold mb-6">Social</h4>
                            
                            {/* İkonlar buraya eklendi */}
                            <div className="flex items-center gap-4">
                                <a href="#" className="p-2 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="p-2 border border-white/20 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 group">
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="w-full lg:w-[450px] flex-shrink-0">
                        <h3 className="text-2xl font-serif mb-8">Contact</h3>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">your name</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-white/30 py-2 bg-transparent focus:outline-none focus:border-white transition-colors text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">your email</label>
                                <input
                                    type="email"
                                    className="w-full border-b border-white/30 py-2 bg-transparent focus:outline-none focus:border-white transition-colors text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">your message</label>
                                <input
                                    type="text"
                                    className="w-full border-b border-white/30 py-2 bg-transparent focus:outline-none focus:border-white transition-colors text-white"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-center text-sm tracking-wide text-white/80 hover:text-white transition-colors mt-4"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 text-sm text-white/60 flex justify-between items-center">
                    <p>© 2025 Okan Uzun. All rights reserved.</p>
                    {/* Legal linkleri buraya küçük bir satır olarak taşımak istersen opsiyonel: */}
                    <div className="hidden md:flex gap-6 text-xs text-white/40">
                        <span>Privacy</span>
                        <span>Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}