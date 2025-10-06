"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface VideoGalleryProps {
  youtubeId: string;
  localVideo: string;
}

export default function VideoGallery({ youtubeId, localVideo }: VideoGalleryProps) {
  const [isYouTubePlaying, setIsYouTubePlaying] = useState(false);
  const [isLocalPlaying, setIsLocalPlaying] = useState(false);

  return (
    <motion.div
      className="w-full px-6 md:px-12 lg:px-16 mt-10 py-15"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 max-w-7xl mx-auto">
        {/* YouTube Video */}
        <div
          className="relative w-full md:w-1/2 cursor-pointer"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setIsYouTubePlaying(true)}
        >
          {!isYouTubePlaying ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt="YouTube thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-l-8 md:border-l-10 border-l-black border-t-5 md:border-t-6 border-t-transparent border-b-5 md:border-b-6 border-b-transparent ml-1"></div>
                </div>
              </div>
            </>
          ) : (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Local Video */}
        <div
          className="relative w-full md:w-1/2 cursor-pointer bg-black"
          style={{ aspectRatio: "16/9" }}
          onClick={() => setIsLocalPlaying(true)}
        >
          {!isLocalPlaying ? (
            <>
              <video
                src={localVideo}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop
                autoPlay
              />
            </>
          ) : (
            <video
              src={localVideo}
              className="w-full h-full object-cover"
              autoPlay
              controls
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

