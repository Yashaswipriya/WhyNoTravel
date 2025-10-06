"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface YouTubeCardProps {
  videoId: string;
}

export default function YouTubeCard({ videoId }: YouTubeCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="w-full px-6 md:px-12 lg:px-16 mt-16 py-15"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className="relative w-full max-w-7xl mx-auto overflow-hidden cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onClick={() => setIsPlaying(true)}
      >
        {!isPlaying && (
          <>
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="YouTube thumbnail"
              className="w-full h-full object-cover"
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-l-8 md:border-l-10 border-l-black border-t-5 md:border-t-6 border-t-transparent border-b-5 md:border-b-6 border-b-transparent ml-1"></div>
              </div>
            </div>
          </>
        )}

        {isPlaying && (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </motion.div>
  );
}

