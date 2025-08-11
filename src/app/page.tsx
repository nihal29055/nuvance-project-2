"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TypingLoader from "@/components/TypingLoader";
import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Image from "next/image";
import ContributingPage from "@/components/ContributingOverlay";
import ChooseYourHooligan from "@/components/ChooseYourHooligan";
import JOC from "../components/JoinOurCommunity";
import { Rock_Salt } from "next/font/google";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [phase, setPhase] = useState<"typing" | "svg" | "hero">("typing");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuText, setShowMenuText] = useState(false);

  // Bunny motion states
  const [bunnyRiseStarted, setBunnyRiseStarted] = useState(false);
  const [bunnyRiseComplete, setBunnyRiseComplete] = useState(false);

  // Responsive isMobile state with resize listener
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflowY = phase === "hero" ? "scroll" : "hidden";
  }, [phase]);

  useEffect(() => {
    if (phase === "svg") {
      const svgTimer = setTimeout(() => {
        setPhase("hero");
        setBunnyRiseStarted(true);
        const menuTimer = setTimeout(() => {
          setShowMenuText(true);
        }, 1800);
        return () => clearTimeout(menuTimer);
      }, 3000);
      return () => clearTimeout(svgTimer);
    }
  }, [phase]);

  // Bunny animation complete handler
  const onBunnyAnimationComplete = () => {
    setBunnyRiseComplete(true);
  };

  useEffect(() => {
    if (phase !== "hero") return;

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const move = (e: MouseEvent) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    };

    const addHover = () => cursor.classList.add("hovered");
    const removeHover = () => cursor.classList.remove("hovered");

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll(".cursor-target");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(cursor);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, [phase]);

  const bunnyVariants = {
    hidden: { opacity: 0, y: "120%" },
    rise: { opacity: 1, y: "0%", transition: { duration: 1.8, ease: "easeOut" } },
    fixed: { opacity: 1, y: "0%", transition: { duration: 0 } },
  };

  // Typing animation state for paragraph
  const fullText = `Discover the charm of your very own Grumpy companion.
Each one is unique and brings joy in unexpected ways.
Join the community of proud owners who embrace the quirky,
lovable spirit of Grumpy every day.
Ready to make one yours?`;

  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    if (phase !== "hero") {
      setDisplayedText(""); // reset if leaving hero phase
      return;
    }
    let index = 0;
    const typingSpeed = 40; // ms per character
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="custom-cursor-root relative bg-black min-h-screen text-white">
      {/* MENU BUTTON - FIXED: always show on hero phase and menu closed */}
      {phase === "hero" && !menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed text-gray-400 text-xs sm:text-sm tracking-widest z-[9999] hover:text-gray-200 transition-colors top-3 sm:top-5 right-4 sm:right-5 cursor-pointer select-none pointer-events-auto opacity-100"
          aria-label="Open Menu"
        >
          MENU
        </button>
      )}

      {phase === "typing" && <TypingLoader onFinish={() => setPhase("svg")} />}

      {phase === "svg" && (
        <div className="relative w-full h-screen flex items-center justify-center px-4 text-[#fb8fc1]">
          <svg
            viewBox="0 0 800 200"
            className="w-full max-w-[90%] sm:max-w-[80%] h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="40"
              className={`${rockSalt.className} sm:text-[100px]`}
              fill="none"
              stroke="#fb8fc1"
              strokeWidth="3"
              strokeDasharray="1500"
              strokeDashoffset="1500"
            >
              Grumpy
              <animate
                attributeName="stroke-dashoffset"
                from="1500"
                to="0"
                dur="3s"
                fill="freeze"
              />
            </text>
          </svg>
        </div>
      )}

      {phase === "hero" && (
        <div
          className="relative w-full h-screen flex items-center justify-center overflow-hidden px-4"
          aria-label="Hero section"
        >
          {/* Background text with fade+scale animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-1/2 top-[30%] sm:top-[10%] transform -translate-x-1/2 -translate-y-1/6
              text-[40px] sm:text-[120px] lg:text-[220px] font-extrabold text-white/10 whitespace-nowrap select-none pointer-events-none"
            style={{ fontFamily: "'Rock Salt', cursive" }}
          >
            MY PET
          </motion.div>

          {/* Foreground SVG title */}
          <svg
            viewBox="0 0 800 200"
            className="w-full max-w-[90%] sm:max-w-[80%] h-auto absolute z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="40"
              className={`${rockSalt.className} sm:text-[100px]`}
              fill="#fb8fc1"       // Fill color
              stroke="#fb8fc1"     // Stroke color
              strokeWidth="3"      // Stroke thickness
            >
              Grumpy
            </text>

          </svg>

          {/* Bunny with framer-motion */}
          <motion.div
            className="absolute left-1/2 sm:left-[35%] z-20 -translate-x-1/2 sm:-translate-x-1"
            style={{
              bottom: isMobile ? 250 : 1,
              position: "absolute",
            }}
            variants={bunnyVariants}
            initial="hidden"
            animate={
              bunnyRiseComplete
                ? "fixed"
                : bunnyRiseStarted
                  ? "rise"
                  : "hidden"
            }
            onAnimationComplete={() => {
              if (!bunnyRiseComplete) onBunnyAnimationComplete();
            }}
          >
            <Image
              src="/bunny.png"
              alt="bunny"
              width={700}
              height={1500}
              className="w-[160px] sm:w-[400px] lg:w-[700px] h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Paragraph + Button with fade+slide animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="absolute bottom-4 sm:bottom-10 right-1/2 sm:right-14 translate-x-1/2 sm:translate-x-0 flex flex-col items-center space-y-3 sm:space-y-4 z-30 select-none max-w-[220px] sm:max-w-[300px]"
            style={{
              bottom: isMobile ? 30 : undefined,
            }}
          >
            <p className="text-[9px] sm:text-xs text-gray-400 text-start leading-snug whitespace-pre-line">
              {displayedText}
            </p>

            <a
              href="#choose"
              className="cursor-pointer"
              aria-label="Get your own Grumpy"
            >
              <svg
                width="300"
                height="125"
                viewBox="0 0 530 170"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:opacity-80 transition-opacity duration-300 w-[260px] sm:w-[380px] lg:w-[530px]"
              >
                <path
                  d="M50 85 C45 23, 92 20, 150 45 C220 70, 460 35, 520 85 C480 140, 380 145, 305 140 C215 135, 125 155, 50 85 Z"
                  stroke="#B3FF00"
                  strokeWidth="5"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="280"
                  y="90"
                  fill="#B3FF00"
                  fontSize="14"
                  className="sm:text-[22px]"
                  fontWeight="700"
                  fontFamily="'Rock Salt', cursive"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                  style={{ letterSpacing: "0.1em" }}
                >
                  GET YOUR OWN GRUMPY
                </text>
              </svg>
            </a>
          </motion.div>
        </div>
      )}

      {/* Sections container with spacing */}
      {phase === "hero" && (
        <div
          className="sections-container"
          style={{ display: "flex", flexDirection: "column", gap: "80px" }}
        >
          <section id="about" className="w-full">
            <ContributingPage />
          </section>
          <section id="choose" className="w-full">
            <ChooseYourHooligan />
          </section>
          <section id="roadmap" className="w-full">
            <Roadmap />
          </section>
          <section id="faq" className="w-full">
            <FAQ />
          </section>
          <section id="contact" className="w-full">
            <JOC />
          </section>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-black">
          <Navbar onClose={() => setMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}
