"use client";
import React, { useState, useEffect, useRef } from "react";
import { Rock_Salt } from "next/font/google";
import "../app/globals.css";
import { motion } from "framer-motion";

// Font
const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

// Typing animation hook
function useTypingEffect(text: string, speed: number, start: boolean) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, start]);
  return displayed;
}

const Roadmap: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640; // Tailwind's sm breakpoint
  const titleText = isMobile ? "MILESTONES" : "PLANNED MILESTONES";

  const typedRoadmap = useTypingEffect(titleText, 80, isVisible);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-[#DDDDDD] flex items-center justify-center overflow-hidden flex-col px-6 sm:px-16 py-10"
    >
      {/* Background paw SVG */}
      <svg
        className="absolute opacity-10 pointer-events-none z-0"
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
        style={{
          fill: "#66FF66",
          width: isMobile ? "220px" : "420px",
          top: isMobile ? "10%" : "50%",
          left: "50%",
          transform: `translate(-50%, ${isMobile ? "0" : "-50%"}) rotate(-6deg)`,
        }}
      >
        {/* toe 1 */}
        <path d="M46 44 C36 18, 8 18, 12 46 C16 74, 44 78, 56 56 C52 50, 49 48, 46 44 Z" />
        {/* toe 2 */}
        <path d="M86 34 C76 8, 44 8, 52 36 C60 64, 92 68, 100 44 C96 40, 90 36, 86 34 Z" />
        {/* toe 3 */}
        <path d="M128 36 C120 12, 92 10, 98 38 C104 66, 136 70, 142 46 C138 42, 133 39, 128 36 Z" />
        {/* toe 4 */}
        <path d="M168 58 C154 32, 124 34, 138 62 C152 90, 178 98, 182 70 C181 64, 175 60, 168 58 Z" />
        {/* main pad */}
        <path d="M60 96 C30 120, 34 170, 72 178 C100 184, 132 160, 148 132 C154 122, 156 106, 140 96 C122 84, 82 78, 60 96 Z" />
      </svg>

      {/* Desktop title */}
      {!isMobile && (
        <div
          className={`${rockSalt.className} roadmap-title absolute text-[5rem] font-extrabold z-10 text-[#66FF66]`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {typedRoadmap || (
            <span style={{ visibility: "hidden" }}>PLANNED MILESTONES</span>
          )}
        </div>
      )}

      {/* Mobile title */}
      {isMobile && (
        <h2
          className={`${rockSalt.className} roadmap-phone-title text-[5rem] font-extrabold text-center mb-8 text-[#66FF66] block sm:hidden relative z-10`}
        >
          {typedRoadmap || <span style={{ visibility: "hidden" }}>MILESTONES</span>}
        </h2>
      )}

      {/* Q1 */}
      <motion.div
        className="roadmap-item"
        style={{ top: "15%", left: "5%", maxWidth: "260px" }}
        initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-[#66FF66] font-bold mb-2 text-lg">2024 Q1</p>
        <p className="text-[#DDDDDD] text-[10.5px] leading-snug">
          Hosting contests and virtual events while offering exclusive benefits
          like discounts and early access to new releases for current NFT
          holders.
        </p>
      </motion.div>

      {/* Q2 */}
      <motion.div
        className="roadmap-item"
        style={{ top: "15%", left: "40%", maxWidth: "260px" }}
        initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-[#66FF66] font-bold mb-2 text-lg">2024 Q2</p>
        <p className="text-[#DDDDDD] text-[10.5px] leading-snug">
          Involving NFT owners in decision-making through polls and surveys;
          planning collaborations to create unique content and expand reach.
        </p>
      </motion.div>

      {/* Q3 */}
      <motion.div
        className="roadmap-item"
        style={{ bottom: "15%", left: "20%", maxWidth: "260px" }}
        initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-[#66FF66] font-bold mb-2 text-lg">2024 Q3</p>
        <p className="text-[#DDDDDD] text-[10.5px] leading-snug">
          Offering NFT holders exclusive content like videos and music;
          developing a game with interactive character use and charity support.
        </p>
      </motion.div>

      {/* Q4 */}
      <motion.div
        className="roadmap-item"
        style={{ bottom: "15%", right: "15%", maxWidth: "260px" }}
        initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-[#66FF66] font-bold mb-2 text-lg">2024 Q4</p>
        <p className="text-[#DDDDDD] text-[10.5px] leading-snug">
          Creating an owner portal for NFT owners to share experiences, create
          content, and monetize while supporting a shelter.
        </p>
      </motion.div>

      {/* Decorative dot */}
      <div className="decorative-dot absolute top-1/4 right-20 w-3 h-3 bg-[#66FF66] rounded-full animate-pulse opacity-70" />
    </section>
  );
};

export default Roadmap;
