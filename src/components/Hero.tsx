"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { Righteous } from "next/font/google";
import LiquidEther from "@/components/LiquidEther";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const oPlaceholderRef = useRef<HTMLDivElement>(null);
  const [oCenter, setOCenter] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const updateOCenter = () => {
      if (oPlaceholderRef.current) {
        const rect = oPlaceholderRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        setOCenter({ x, y });
      }
    };
    
    updateOCenter();
    window.addEventListener('resize', updateOCenter);
    return () => window.removeEventListener('resize', updateOCenter);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const clipSize = useTransform(scrollYProgress, [0, 1.5], ["6.5vw", "150vmax"]);
  const clipPath = useMotionTemplate`circle(${clipSize} at ${oCenter.x}px ${oCenter.y}px)`;

  return (
    <section ref={ref} className="relative h-[170vh] bg-black text-white">
      {/* Background Layer */}
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
      <div className="sticky top-0 h-screen">
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-10" 
        >
          <video
            className="h-full w-full object-cover"
            src="/video.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </motion.div>
        <div className="relative z-20 flex h-full items-center justify-center">
          <div className="flex flex-col items-center text-center pointer-events-none">
            <motion.h1 
              style={{ opacity: textOpacity }}
              className={`text-[15vw] leading-none ${righteous.className}`}
            >
              WHY
            </motion.h1>
            <div className="flex items-center">
              <motion.h1 
                style={{ opacity: textOpacity }}
                className={`text-[15vw] leading-none ${righteous.className}`}
              >
                N
              </motion.h1>
              
              <div 
                ref={oPlaceholderRef} 
                className="w-[15vw] h-[15vw]" 
              />
            </div>
            <motion.h1 
              style={{ opacity: textOpacity }}
              className={`text-[15vw] leading-none ${righteous.className}`}
            >
              TRAVEL
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
}