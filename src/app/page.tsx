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
import "@/app/globals.css";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [phase, setPhase] = useState<"typing" | "svg" | "hero">("typing");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMenuText, setShowMenuText] = useState(false);

  const [bunnyRiseStarted, setBunnyRiseStarted] = useState(false);
  const [bunnyRiseComplete, setBunnyRiseComplete] = useState(false);

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

  const fullText = `Discover the charm of your very own Grumpy companion.
Each one is unique and brings joy in unexpected ways.
Join the community of proud owners who embrace the quirky,
Ready to make one yours?`;

  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    if (phase !== "hero") {
      setDisplayedText("");
      return;
    }
    let index = 0;
    const typingSpeed = 40;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="custom-cursor-root relative bg-black min-h-screen text-[#DDDDDD]">
      {phase === "hero" && !menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed menu-button z-[9999] top-3 sm:top-5 left-4 cursor-pointer opacity-100"
          aria-label="Open Menu"
        >
          MENU
        </button>
      )}
      {phase === "hero" && !menuOpen && (
        <button
          className="fixed menu-button buy-button z-[9999] top-3 sm:top-5 right-4 cursor-pointer opacity-100"
          aria-label="Buy Token"
        >
          BUY $GRUMPY
        </button>
      )}

      {phase === "typing" && <TypingLoader onFinish={() => setPhase("svg")} />}

      {phase === "svg" && (
        <div className="relative w-full h-screen flex items-center justify-center px-4 text-[#66FF66]">
          <svg
            viewBox="0 0 800 200"
            className="w-full max-w-[90%] sm:max-w-[80%] h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="spray-blur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="spray-noise" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="turb" />
                <feDisplacementMap in="SourceGraphic" in2="turb" scale="3" />
              </filter>
            </defs>

            {/* Stroke outline animation */}
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="32"
              className={`${rockSalt.className} sm:text-[130px]`}
              fill="transparent"
              stroke="#66FF66"
              strokeWidth="3"
              strokeDasharray="1500"
              strokeDashoffset="1500"
              filter="url(#spray-blur)"
            >
              Grumpy
              <animate
                attributeName="stroke-dashoffset"
                from="1500"
                to="0"
                dur="2.8s"
                keySplines="0.42 0 0.58 1"
                calcMode="spline"
                fill="freeze"
              />
            </text>

            {/* Fill fade-in AFTER stroke finishes */}
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="32"
              className={`${rockSalt.className} sm:text-[130px]`}
              fill="#66FF66"
              opacity="0"
            >
              Grumpy
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                dur="1.5s"
                begin="2.8s"
                fill="freeze"
              />
            </text>

            {/* Spray noise effect */}
            <g filter="url(#spray-noise)">
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="32"
                className={`${rockSalt.className} sm:text-[130px]`}
                fill="#66FF66"
                opacity="0.2"
              >
                Grumpy
              </text>
            </g>
          </svg>
        </div>
      )}


      {phase === "hero" && (
        <>
          {/* Hero Section */}
          <div
            className="relative w-full h-screen flex items-center justify-center overflow-hidden px-4"
            aria-label="Hero section"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-[30%] sm:top-[2%] transform -translate-x-1/2 -translate-y-1/6
                text-[40px] sm:text-[120px] lg:text-[220px] font-extrabold text-white/10 whitespace-nowrap select-none pointer-events-none"
              style={{ fontFamily: "sans-serif" }}
            >
              MY PET
            </motion.div>

            <svg
              viewBox="0 0 800 200"
              className="w-full max-w-[90%] sm:max-w-[80%] h-auto absolute z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="32"
                className={`${rockSalt.className} sm:text-[130px]`}
                fill="#66FF66"
                stroke="#66FF66"
                strokeWidth="3"
              >
                Grumpy
              </text>
            </svg>

            <motion.div
              className="absolute left-1/2 sm:left-[35%] -translate-x-1/2 sm:-translate-x-1"
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
              <div className="relative">
                <Image
                  src="/bunny.png"
                  alt="bunny"
                  width={700}
                  height={1500}
                  className="relative w-[160px] sm:w-[400px] lg:w-[640px] h-auto object-contain z-10"
                  priority
                />

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className={`absolute right-1/2 sm:right-14 translate-x-1/2 sm:translate-x-0 flex flex-col space-y-3 sm:space-y-4 z-30 select-none max-w-[220px] sm:max-w-[300px] ${isMobile ? "items-start" : "items-center"
                }`}
              style={{
                bottom: isMobile ? -20 : 30,
              }}
            >
              <p
                className={`text-[10.5px] font-bold leading-relaxed whitespace-pre-line max-w-3xl mx-auto ${isMobile ? "text-left" : "text-center"
                  } text-gray-400`}
              >
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
                  <ellipse
                    cx="265"
                    cy="85"
                    rx="235"
                    ry="70"
                    stroke="#B3FF00"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <text
                    x="265"
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

          {/* Scroll Down Indicator */}
          <motion.div
            className="fixed bottom-10 left-6 flex flex-col items-center cursor-pointer select-none"
            initial={{ y: 0 }}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            aria-label="Scroll down"
            role="button"
            tabIndex={0}
            onClick={() => {
              const nextSection = document.getElementById("about");
              nextSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <motion.span
              className="arrow text-[#DDDDDD] text-[3vw] mb-[-8px]"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.15,
              }}
            >
              ▼
            </motion.span>
            <motion.span
              className="arrow text-[#DDDDDD] text-[3vw]"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.3,
              }}
            >
              ▼
            </motion.span>
          </motion.div>

          {/* Sections */}
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
        </>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-black">
          <Navbar onClose={() => setMenuOpen(false)} />
        </div>
      )}
    </div>
  );
}
