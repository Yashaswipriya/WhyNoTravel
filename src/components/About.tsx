"use client";

import { motion, useScroll, useTransform, easeOut } from "framer-motion";
import { useRef } from "react";
import { Righteous } from "next/font/google";

const righteous = Righteous({ subsets: ["latin"], weight: "400" });

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
    },
  },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle tilt for the video on scroll
  const videoRotateX = useTransform(scrollYProgress, [0, 1], ["-4deg", "4deg"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 1]);

  return (
    <section
      ref={ref}
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div
          style={{ perspective: "1000px" }}
          className="flex flex-col md:flex-row gap-16 md:gap-24 items-center"
        >
          {/* LEFT: Text */}
          <motion.div
            className="w-full md:w-1/2 flex flex-col space-y-8 ml-0 md:ml-8 lg:ml-16 2xl:ml-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.h2
              variants={textVariants}
              className={`text-5xl md:text-7xl 2xl:text-[5rem] font-bold ${righteous.className} text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600`}
            >
              Meet the Duo Behind WhyNoTravel
            </motion.h2>

            <motion.p
              variants={textVariants}
              className="text-xl 2xl:text-2xl leading-relaxed text-black"
            >
            Two souls, one journey and countless adventures around the globe.
            Founded by <span className="font-bold">Shikha & Nitansh</span>, WhyNoTravel is more than just a travel page it's a space where wanderlust meets storytelling.
            </motion.p>
            <motion.p
              variants={textVariants}
              className="text-xl 2xl:text-2xl leading-relaxed text-black"
            >
            From stunning destinations and practical travel hacks to detailed itineraries and 
            pure inspiration, we aim to make travel easier, smarter and more meaningful for everyone.
            Whether you're planning your next getaway or just daydreaming about faraway lands, join us as we explore the world one trip at a time because really, why no travel?
            </motion.p>
          </motion.div>

          {/* RIGHT: Portrait Video */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="relative w-[70%] md:w-[80%] 2xl:w-[90%] aspect-[3/4] overflow-hidden"
              style={{
                rotateX: videoRotateX,
                opacity: videoOpacity,
              }}
            >
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/about.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
