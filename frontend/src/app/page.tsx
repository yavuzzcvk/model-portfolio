import Hero from "@/components/hero";
export async function generateMetadata() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/settings`, { cache: 'no-store' });
    const data = await res.json();
    return {
      title: data.site_title || "OKAN UZUN",
      description: data.site_description || "Professional portfolio of Okan Uzun.",
      keywords: data.site_keywords || "model, portfolio, professional, photography, gallery",
      openGraph: {
        title: data.site_title || "OKAN UZUN",
        description: data.site_description || "Professional portfolio of Okan Uzun.",
        type: "website"
      },
      twitter: {
        card: "summary_large_image",
        title: data.site_title || "OKAN UZUN",
        description: data.site_description || "Professional portfolio of Okan Uzun."
      }
    };
  } catch {
    return {
      title: "OKAN UZUN",
      description: "Professional portfolio of Okan Uzun.",
    };
  }
}

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
