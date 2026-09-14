"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import GlitchOverlay from "./GlitchOverlay";

interface WorkCardProps {
  title: string;
  slug: string;
  imageFallback: string;
  previewImage?: string;
}

export default function WorkCard({ title, slug, imageFallback, previewImage }: WorkCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (!isRevealed) {
      e.preventDefault();
      setIsRevealed(true);
    }
  };

  return (
    <Link
      href={`/works/${slug}`}
      className="block w-full cursor-pointer"
      onClick={handleClick}
    >
      {/* Outer wrapper — overflow visible so glitch extends beyond */}
      <div className="relative py-6" style={{ overflow: "visible" }}>
        {/* Card content */}
        <div
          className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-[#111] border border-white/5 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background — screenshot or number fallback */}
          <motion.div
            className="absolute inset-0"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/10 text-9xl font-serif select-none">
                {imageFallback}
              </div>
            )}
          </motion.div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Blur layer — blurs the card content when glitch is active */}
          <motion.div
            className="absolute inset-0 backdrop-blur-sm z-10"
            animate={{ opacity: isRevealed ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          />

          {/* Title — visible when revealed */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
            transition={{ duration: 0.6, delay: isRevealed ? 0.3 : 0, ease: "easeOut" }}
          >
            <h3 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-tight uppercase text-center px-4">
              {title}
            </h3>
          </motion.div>
        </div>

        {/* Glitch overlay — positioned relative to outer wrapper, extends beyond card */}
        <GlitchOverlay active={!isRevealed} />
      </div>
    </Link>
  );
}