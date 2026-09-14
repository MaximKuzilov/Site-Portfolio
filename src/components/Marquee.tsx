"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  const skills = [
    "Next.js", "React", "Tailwind CSS", "Framer Motion", "Lenis", "HTML5", "CSS3", "JS", 
    "PHP", "Django", "Tilda", "React Native", "Python", "C++", "C#", "1C:Enterprise", 
    "VBA", "SQL", "Data Parsing", "SEO",
    "Next.js", "React", "Tailwind CSS", "Framer Motion", "Lenis", "HTML5", "CSS3", "JS", 
    "PHP", "Django", "Tilda", "React Native", "Python", "C++", "C#", "1C:Enterprise", 
    "VBA", "SQL", "Data Parsing", "SEO",
  ];

  return (
    <div className="w-full overflow-hidden py-12 border-y border-white/10 flex whitespace-nowrap bg-black">
      <motion.div
        className="flex gap-12 text-4xl md:text-6xl font-mono text-white/50 uppercase tracking-tighter"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-12">
            <span>{skill}</span>
            <span className="text-white/20">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}