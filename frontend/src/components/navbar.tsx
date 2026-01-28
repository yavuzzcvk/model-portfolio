"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [siteTitle, setSiteTitle] = useState<string>("OKAN UZUN");
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        async function fetchTitle() {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data && typeof data.site_title === 'string') {
                    setSiteTitle(data.site_title);
                }
            } catch {
                // fallback to default
            }
        }
        fetchTitle();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Gallery", href: "/gallery" },
        { name: "Biography", href: "/bio" },
        { name: "Measurements", href: "/measurements" },
        { name: "Contact", href: "/contact" },
    ];

    const navbarStyles = isHome
        ? `fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-12 ${scrolled ? 'bg-white/80 backdrop-blur-md py-4' : 'bg-transparent'}`
        : "relative z-50 bg-white py-6 px-12  border-gray-100";

    return (
        <nav className={navbarStyles}>
            <div className="max-w-[1600px] mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="group">
                    <div className="text-4xl font-normal tracking-[0.2em] font-serif transition-colors duration-300 group-hover:text-gray-600">
                        {siteTitle}
                    </div>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-12">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-sm  tracking-[0.2em] font-serif hover:text-gray-500 transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
                    aria-label="Toggle Menu"
                >
                    <span className={`w-6 h-[1px] bg-black transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-[1px] bg-black transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-6 h-[1px] bg-black transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}>
                <div className="flex flex-col h-full items-center justify-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-2xl uppercase tracking-[0.3em] font-serif"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Close button for mobile menu inside oversight */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-8 right-12 w-10 h-10 flex flex-col justify-center items-center"
                >
                    <span className="w-8 h-[1px] bg-black rotate-45 translate-y-[0.5px]"></span>
                    <span className="w-8 h-[1px] bg-black -rotate-45 -translate-y-[0.5px]"></span>
                </button>
            </div>
        </nav>
    );
}