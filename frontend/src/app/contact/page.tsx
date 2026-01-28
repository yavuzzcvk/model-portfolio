"use client";

import { useEffect, useState } from 'react';
import { Instagram, Linkedin, Mail, Github, Youtube, Phone, MapPin, X as XIcon, Facebook } from 'lucide-react';

const SOCIAL_ICON_MAP: Record<string, any> = {
	instagram: Instagram,
	twitter: XIcon,
	linkedin: Linkedin,
	github: Github,
	youtube: Youtube,
	facebook: Facebook,
	tiktok: Youtube, // TikTok için alternatif ikon
};

export default function ContactPage() {
	const [settings, setSettings] = useState<any>(null);
	useEffect(() => {
		// Doğrudan backend API'sine istek yap (client-side olduğu için tarayıcıdan erişim mümkün)
		fetch('http://backend.test/api/settings')
			.then((res) => res.json())
			.then((data) => {
				console.log('API Response:', data);
				// API dizi döndürüyor, ilk elemanı al
				const settingsData = Array.isArray(data) && data.length > 0 ? data[0] : data;
				console.log('Settings Data:', settingsData);
				setSettings(settingsData);
			})
			.catch((err) => {
				console.error('API Error:', err);
				setSettings(null);
			});
	}, []);

	const contacts = [
		settings?.email && {
			label: 'E-posta',
			value: settings.email,
			href: `mailto:${settings.email}`,
			icon: Mail,
		},
		settings?.phone && {
			label: 'Telefon',
			value: settings.phone,
			href: `tel:${settings.phone}`,
			icon: Phone,
		},
		settings?.address && {
			label: 'Konum',
			value: settings.address,
			href: settings.address_url || '#',
			icon: MapPin,
		},
	].filter(Boolean);

	// API'den gelen social_media objesinden dinamik olarak sosyal medya ikonları oluştur
	const socials: { name: string; href: string; icon: any }[] = [];
	if (settings?.social_media) {
		const socialMediaNames: Record<string, string> = {
			instagram: 'Instagram',
			twitter: 'X (Twitter)',
			facebook: 'Facebook',
			linkedin: 'LinkedIn',
			youtube: 'YouTube',
			tiktok: 'TikTok',
			github: 'GitHub',
		};
		
		Object.entries(settings.social_media).forEach(([key, value]) => {
			if (value && SOCIAL_ICON_MAP[key]) {
				socials.push({
					name: socialMediaNames[key] || key,
					href: value as string,
					icon: SOCIAL_ICON_MAP[key],
				});
			}
		});
	}

	return (
		<main className="min-h-screen bg-white font-serif flex items-center justify-center px-4 py-20">
			<div className="w-full max-w-5xl mx-auto">
				<h1 className="text-5xl font-black text-gray-900 mb-6">Contact</h1>
				<p className="text-lg text-gray-700 mb-12 max-w-2xl">
					If you want to talk about a project or just say hello, you can contact me.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
					{/* İletişim Bilgileri */}
					<div>
						<h2 className="text-base font-semibold text-gray-500 mb-6 tracking-wide">İLETİŞİM BİLGİLERİ</h2>
						<div className="space-y-6">
							{contacts.map(({ label, value, href, icon: Icon }) => (
								<a
									key={label}
									href={href}
									className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-3 hover:bg-gray-200 transition"
									target={label === 'Konum' ? '_blank' : undefined}
									rel={label === 'Konum' ? 'noopener noreferrer' : undefined}
								>
									<span className="bg-teal-600 rounded-lg p-3 text-white">
										<Icon className="w-6 h-6" />
									</span>
									<div>
										<div className="text-xs text-gray-500 font-semibold">{label}</div>
										<div className="text-base text-gray-900 font-bold">{value}</div>
									</div>
								</a>
							))}
						</div>
					</div>

					{/* Sosyal Medya */}
					<div>
						<h2 className="text-base font-semibold text-gray-500 mb-6 tracking-wide">SOSYAL MEDYA</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-6">
							{socials.map(({ name, href, icon: Icon }) => (
								<a
									key={name}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex flex-col items-center justify-center gap-2 bg-gray-100 rounded-xl p-6 hover:bg-gray-200 transition"
								>
									<span>
										<Icon className="w-7 h-7 text-gray-700" />
									</span>
									<span className="text-sm text-gray-700 font-semibold">{name}</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
