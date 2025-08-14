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
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect section in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setDisplayText("");
          setHovering(false);
          setAnimationsComplete(false);
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
  }, []);

  // Typing effect — only on hover
  useEffect(() => {
    if (hovering && inView) {
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
    } else {
      setDisplayText("");
    }
  }, [hovering, inView, paragraphText]);

  const shiftDistance = "8vw";

  // Direct hover control — no animationsComplete here
  const voX = hovering && inView ? `-${shiftDistance}` : "0";
  const teX = hovering && inView ? shiftDistance : "0";
  const paraWidth = hovering && inView ? "30vw" : "0";
  const paraOpacity = hovering && inView ? 1 : 0;

  return (
    <div
      ref={sectionRef}
      className={`bg-black min-h-screen flex flex-col items-start pt-10 !px-10 ${montserrat.className} overflow-x-hidden`}
    >
      <div className="w-full text-[#66FF66] font-bold uppercase leading-none">
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
          className="flex items-center justify-center gap-0 relative"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* VO */}
          <motion.span
            animate={{ x: voX }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[15vw] leading-none select-none"
          >
            VO
          </motion.span>

          {/* Paragraph */}
          <motion.div
            animate={{ width: paraWidth, opacity: paraOpacity }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[#DDDDDD] text-[0.7vw] leading-snug whitespace-normal overflow-hidden text-center select-none"
            style={{ minHeight: "6vw", margin: hovering ? "0 1vw" : "0" }}
          >
            {displayText}
          </motion.div>

          {/* TE */}
          <motion.span
            animate={{ x: teX }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[15vw] leading-none select-none"
          >
            TE
          </motion.span>
        </motion.div>

        {/* Row 3 - Grid + OWN */}
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 1.3,
            onComplete: () => setAnimationsComplete(true),
          }}
          className="flex items-center gap-[2vw] justify-end"
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
              className="absolute inset-0 flex items-center justify-end !mr-10 text-[1.5vw] text-[#66FF66]"
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
