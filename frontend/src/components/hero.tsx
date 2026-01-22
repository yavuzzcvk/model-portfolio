import Image from "next/image";
import { getHeroImages } from "@/lib/api";

export default async function Hero() {
  const images = await getHeroImages();
  console.log('Hero Images Fetched:', images); // Debug log
  const heroImage = images.length > 0 ? images[0].image_url : "/images/hero/4.jpg"; // Fallback to static image
  console.log('Active Hero Image URL:', heroImage); // Debug log

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Arka plan resmi */}
      <Image
        src={heroImage}
        alt="Hero Background"
        fill
        priority
        unoptimized
        className="object-cover"
      />
    </section>
  );
}