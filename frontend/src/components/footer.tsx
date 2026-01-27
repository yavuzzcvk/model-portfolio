'use client';

import { useEffect, useState } from 'react';
import {
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Facebook,
    Youtube,
    Github
} from 'lucide-react';

interface Settings {
    email: string | null;
    phone: string | null;
    address: string | null;
    instagram: string | null;
    twitter: string | null;
    facebook: string | null;
    linkedin: string | null;
    youtube: string | null;
    tiktok: string | null;
    github: string | null;
}

export default function Footer() {
    const [settings, setSettings] = useState<Settings | null>(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch('/api/settings');
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0) {
                    setSettings(data[0]);
                } else if (data && !Array.isArray(data)) {
                    setSettings(data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };

        fetchSettings().catch(() => undefined);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                }),
            });

            let data: { error?: string } | null = null;
            try {
                data = await res.json();
            } catch {
                data = null;
            }

            setLoading(false);

            if (res.ok) {
                setSuccess(true);
                setError('');
                form.reset();
            } else {
                setSuccess(false);
                setError(data?.error || 'Bir hata oluştu');
            }
        } catch (err) {
            setLoading(false);
            setSuccess(false);
            setError('Sunucuya ulaşılamadı');
        }
    };

    return (
        <footer id="contact" className="relative w-full bg-[#4B1E26] text-white overflow-hidden">

            {/* Big Background Text */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none select-none">
                <h2 className="text-[clamp(6rem,24vw,18rem)] font-black tracking-tight text-white/10 leading-none">
                    OKAN UZUN
                </h2>
            </div>

            <div className="relative max-w-7xl mx-auto px-2 py-20 min-h-[500px]">

                <div className="flex flex-col lg:flex-row lg:items-start gap-12">

                    {/* Left Side */}
                    <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10 flex-1">

                        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-sm font-semibold mb-6">Portfolio</h4>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li>Editorial</li>
                                <li>Fashion</li>
                                <li>Commercial</li>
                                <li>Campaigns</li>
                            </ul>
                        </div>

                        <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
                            <h4 className="text-sm font-semibold mb-6">Profile</h4>
                            <ul className="space-y-3 text-sm text-white/70">
                                <li>Biography</li>
                                <li>Measurements</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        <div className="p-8">
                            <h4 className="text-sm font-semibold mb-6">Social</h4>
                            <div className="flex items-center gap-4">
                                {settings?.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer noopener"><Instagram /></a>}
                                {settings?.twitter && <a href={settings.twitter} target="_blank" rel="noreferrer noopener"><Twitter /></a>}
                                {settings?.facebook && <a href={settings.facebook} target="_blank" rel="noreferrer noopener"><Facebook /></a>}
                                {settings?.linkedin && <a href={settings.linkedin} target="_blank" rel="noreferrer noopener"><Linkedin /></a>}
                                {settings?.youtube && <a href={settings.youtube} target="_blank" rel="noreferrer noopener"><Youtube /></a>}
                                {settings?.github && <a href={settings.github} target="_blank" rel="noreferrer noopener"><Github /></a>}
                                {settings?.email && <a href={`mailto:${settings.email}`}><Mail /></a>}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-[450px] flex-shrink-0">
                        <h3 className="text-2xl font-serif mb-8">Contact</h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Your Name</label>
                                <input name="name" required className="w-full border-b border-white/30 py-2 bg-transparent text-white" />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Your Email</label>
                                <input name="email" type="email" required className="w-full border-b border-white/30 py-2 bg-transparent text-white" />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Your Message</label>
                                <textarea name="message" required className="w-full border-b border-white/30 py-2 bg-transparent text-white resize-none" />
                            </div>

                            <button disabled={loading} className="w-full text-sm mt-4">
                                {loading ? 'Sending...' : 'Send'}
                            </button>

                            {success && <p className="text-green-400 text-sm">Message sent successfully</p>}
                            {error && <p className="text-red-400 text-sm">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    );
}
