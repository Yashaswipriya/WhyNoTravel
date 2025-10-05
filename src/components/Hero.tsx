"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Scale up the "O" as user scrolls
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 50]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={ref} className="relative h-[170vh] bg-black text-white overflow-hidden">
      {/* Hero Text */}
      <div className="sticky top-0 flex flex-col justify-center items-center h-screen text-center z-10">
        <h1 className={`text-[12vw] leading-[1.1] ${righteous.className}`}>
          WHY
        </h1>

        <h1
          className={`text-[12vw] leading-[1.1] ${righteous.className} flex justify-center items-center`}
        >
          N
          <motion.span
            style={{ scale }}
            className="inline-block text-pink-500 origin-center z-20"
          >
            O
          </motion.span>
        </h1>

        <h1 className={`text-[12vw] leading-[1.1] ${righteous.className}`}>
          TRAVEL
        </h1>

      {/* Video Reveal */}
      <motion.video
        style={{ opacity }}
        className="fixed top-0 left-0 w-full h-full object-cover"
        src="/video.mp4"
        autoPlay
        muted
        loop
      />
        </div>
    </section>
  );
}
