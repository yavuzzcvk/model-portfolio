/**
 * Schema.org JSON-LD structures for SEO
 */

export const getPersonSchema = (baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Okan Uzun",
  "url": baseUrl,
  "sameAs": [
    "https://www.instagram.com",
    "https://www.linkedin.com"
  ],
  "jobTitle": "Professional Model",
  "description": "Professional portfolio of Okan Uzun - Model and creative professional"
});

export const getWebsiteSchema = (baseUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Okan Uzun Portfolio",
  "url": baseUrl,
  "description": "Professional portfolio showcasing work, gallery, and biographical information"
});

export const getCanonicalUrl = (baseUrl: string, path: string): string => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};

interface BreadcrumbItem {
  name: string;
  url: string;
}

export const getBreadcrumbSchema = (baseUrl: string, items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
