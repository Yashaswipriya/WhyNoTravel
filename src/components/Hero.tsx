"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import { Righteous } from "next/font/google";
import LiquidEther from "@/components/LiquidEther";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  // Ref for the invisible placeholder 'O'
  const oPlaceholderRef = useRef<HTMLDivElement>(null);
  
  // State to hold the placeholder's center coordinates
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

  // Text fades out, but we'll apply it to each line individually
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // The initial radius of the circle should match the size of our placeholder 'O'
  // 15vw font size means the character width is also roughly 15vw. Radius is half.
  const clipSize = useTransform(scrollYProgress, [0, 0.7], ["6.5vw", "150vmax"]);
  
  // The clip-path origin now uses the measured center of the placeholder
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

      {/* Video Layer (sits underneath text, covers the screen) */}
      <motion.div
        style={{ clipPath }}
        // Use 'fixed' to ensure it covers the viewport regardless of scroll
        className="fixed inset-0 z-10"
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
      
      {/* Text Layer (sits on top) */}
      <div className="sticky top-0 flex h-screen items-center justify-center">
        <div className="z-20 flex flex-col items-center text-center ">
          {/* Line 1 */}
          <motion.h1 
            style={{ opacity: textOpacity }}
            className={`text-[15vw] leading-none ${righteous.className}`}
          >
            WHY
          </motion.h1>
          
          {/* Line 2: Contains 'N' and the invisible placeholder for 'O' */}
          <div className="flex items-center">
            <motion.h1 
              style={{ opacity: textOpacity }}
              className={`text-[15vw] leading-none ${righteous.className}`}
            >
              N
            </motion.h1>
            
            {/* The Invisible Placeholder 'O' */}
            <div 
              ref={oPlaceholderRef} 
              // Width matches the font size to create a correctly sized gap
              className="w-[15vw] h-[15vw]" 
            />
          </div>
          
          {/* Line 3 */}
          <motion.h1 
            style={{ opacity: textOpacity }}
            className={`text-[15vw] leading-none ${righteous.className}`}
          >
            TRAVEL
          </motion.h1>
        </div>
      </div>
    </section>
  );
}