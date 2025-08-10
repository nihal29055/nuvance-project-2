"use client";
import React, { useState, useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export default function Home() {
  const paragraphText =
    "Each medium has its own story and character, which gives every UI project layers of personality. A strong brand identity means delivering the same feeling to your users through consistency in the brand and experience. Layouts like this one can bring a special layer of attention and meaning to your audience.";

  const [displayText, setDisplayText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [hovering, setHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hovering) {
          setStartTyping(true);
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hovering]);

  // Typing effect
  useEffect(() => {
    if (startTyping) {
      let index = 0;
      setDisplayText("");
      const typingInterval = setInterval(() => {
        setDisplayText((prev) => prev + paragraphText[index]);
        index++;
        if (index >= paragraphText.length) {
          clearInterval(typingInterval);
        }
      }, 20);
      return () => clearInterval(typingInterval);
    }
  }, [startTyping, paragraphText]);

  return (
    <div
      ref={sectionRef}
      className={`bg-black min-h-screen flex items-center !px-10 ${montserrat.className} overflow-x-hidden`}
    >
      <div className="w-full text-[#d4ff3f] font-bold uppercase leading-none">
        {/* Row 1 - CHOOSE */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[15vw] text-left"
        >
          CHOOSE
        </motion.div>

        {/* Row 2 - VOTE + paragraph */}
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="flex items-center justify-center gap-[0.5vw] mt-[-2vw] relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            setDisplayText("");
            setStartTyping(false);
          }}
        >
          {/* VO */}
          <motion.span
            animate={hovering ? { x: "-1.5vw" } : { x: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              onComplete: () => {
                if (hovering) setStartTyping(true);
              },
            }}
            className="text-[15vw] leading-none"
          >
            VO
          </motion.span>

          {/* Paragraph (center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, width: 0 }}
            animate={
              hovering
                ? { opacity: 1, scale: 1, width: "15vw" }
                : { opacity: 0, scale: 0.9, width: 0 }
            }
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-white text-[0.7vw] leading-snug min-h-[6vw] text-center overflow-hidden"
          >
            {displayText}
          </motion.div>

          {/* TE */}
          <motion.span
            animate={hovering ? { x: "1.5vw" } : { x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-[15vw] leading-none"
          >
            TE
          </motion.span>
        </motion.div>

        {/* Row 3 - Grid + OWN */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-[2vw] mt-[-2vw] justify-end"
        >
          {/* Grid */}
          <div
            className="relative w-[35vw] h-[7vw] border-2 border-[#222] overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)",
              backgroundSize: "1.5vw 1.5vw",
            }}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-end !mr-10 text-[1.5vw] text-[#d4ff3f]"
              animate={{ x: [0, 10, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ➤➤➤
            </motion.div>
          </div>

          <span className="text-[12vw] leading-none">OWN</span>
        </motion.div>
      </div>
    </div>
  );
}
