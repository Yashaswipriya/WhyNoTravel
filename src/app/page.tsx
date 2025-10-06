"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoGallery from "@/components/VideoGallery";

export default function HomePage() {
  return (
    <main>
    <section>
      <Hero />
    </section>
    <section>
      <About />
    </section>
    <section>
      <VideoGallery youtubeId="adK4Hr6ZAfE" localVideo={"/insta.mp4"} />
    </section>
    </main>
  );
}
