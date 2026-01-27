import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Okan Uzun | Professional Model Portfolio",
  description: "Professional portfolio of Okan Uzun. Discover modeling work, gallery, measurements, and biography. Connect with a talented and professional model.",
  keywords: "model, portfolio, professional, photography, gallery",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  },
  openGraph: {
    title: "Okan Uzun | Professional Model Portfolio",
    description: "Professional portfolio of Okan Uzun - Model, photographer, and creative professional",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Okan Uzun | Professional Model Portfolio",
    description: "Professional portfolio of Okan Uzun"
  }
};

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Okan Uzun',
    url: baseUrl,
    jobTitle: 'Professional Model',
    sameAs: [],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Buraya diğer section'lar eklenebilir */}

      <Hero />

    </main>
  );
}
