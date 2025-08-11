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

  const typedRoadmap = useTypingEffect("ROADMAP", 80, isVisible);
  const pink = "#bd027b";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden flex-col px-6 sm:px-16 py-10"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{ backgroundImage: "url('/your-background-image.png')" }}
      />

      {/* Big desktop ROADMAP */}
      <div
        className={`${rockSalt.className} roadmap-title absolute text-[5rem] font-extrabold z-10 text-[#fb8fc1]`}
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {typedRoadmap || <span style={{ visibility: "hidden" }}>ROADMAP</span>}
      </div>

      {/* Mobile ROADMAP */}
      <h2
        className={`${rockSalt.className} roadmap-phone-title text-[5rem] font-extrabold text-center mb-8 text-[#fb8fc1] block sm:hidden`}
      >
        {typedRoadmap || <span style={{ visibility: "hidden" }}>ROADMAP</span>}
      </h2>


      {/* Q1 */}
      <motion.div
        className="roadmap-item"
        style={{ top: "15%", left: "5%", maxWidth: "260px" }}
        initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <p className="text-lime-400 font-bold mb-2 text-lg">2024 Q1</p>
        <p className="text-gray-300 text-[10.5px] leading-snug">
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
        <p className="text-lime-400 font-bold mb-2 text-lg">2024 Q2</p>
        <p className="text-gray-300 text-[10.5px] leading-snug">
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
        <p className="text-lime-400 font-bold mb-2 text-lg">2024 Q3</p>
        <p className="text-gray-300 text-[10.5px] leading-snug">
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
        <p className="text-lime-400 font-bold mb-2 text-lg">2024 Q4</p>
        <p className="text-gray-300 text-[10.5px] leading-snug">
          Creating an owner portal for NFT owners to share experiences, create
          content, and monetize while supporting a shelter.
        </p>
      </motion.div>

      {/* Decorative dot */}
      <div className="decorative-dot absolute top-1/4 right-20 w-3 h-3 bg-lime-400 rounded-full animate-pulse opacity-70" />
    </section>
  );
};

export default Roadmap;
