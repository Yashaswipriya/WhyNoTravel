"use client";
import Hero from "@/components/Hero";
import About from "@/components/About";
import YouTubeCard from "@/components/Youtube";

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
      <YouTubeCard videoId="adK4Hr6ZAfE" />
    </section>
    </main>
  );
}
