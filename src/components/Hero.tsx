"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Righteous } from "next/font/google";
import LiquidEther from "@/components/LiquidEther";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Scale up the "O" as user scrolls
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 50]);
  const opacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.45], [1, 0]);

  return (
    <section ref={ref} className="relative h-[170vh] bg-black text-white overflow-hidden">
        {/* LiquidEther Background */}
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      {/* Hero Text */}
      <div className="sticky top-0 flex flex-col justify-center items-center h-screen text-center z-10 pointer-events-none">
        <motion.div style={{ opacity: textOpacity }} className="flex flex-col items-center text-center">
        <h1 className={`text-[15vw] leading-[1.1] ${righteous.className}`} >
          WHY
        </h1>

        <h1
          className={`text-[15vw] leading-[1.1] ${righteous.className} flex justify-center items-center`}
        >
          N
          <motion.span
            style={{ scale }}
            className="inline-block text-pink-500 origin-center z-20"
          >
            O
          </motion.span>
        </h1>

        <h1 className={`text-[15vw] leading-[1.1] ${righteous.className}`}>
          TRAVEL
        </h1>
        </motion.div>
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
