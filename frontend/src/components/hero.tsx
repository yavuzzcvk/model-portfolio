import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Arka plan resmi */}
      <Image
        src="/images/hero/4.jpg"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

    </section>
  );
}