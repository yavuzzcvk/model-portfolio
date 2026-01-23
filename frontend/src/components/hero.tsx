import Image from "next/image";
import { getHeroImages } from "@/lib/api";

export default async function Hero() {
  const images = await getHeroImages();

  const heroImage = images.length > 0 ? images[0].image_url : null;

  if (!heroImage) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 font-serif text-lg">Loading hero image...</p>
        </div>
      </section>
    );
  }

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