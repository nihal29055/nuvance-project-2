"use client";

import React, { useState, useEffect } from "react";
import TypingLoader from "@/components/TypingLoader";
import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Image from "next/image";
import ContributingPage from "@/components/ContributingOverlay";
import ChooseYourHooligan from "@/components/ChooseYourHooligan";
import { Rock_Salt } from "next/font/google";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [phase, setPhase] = useState<"typing" | "svg" | "hero">("typing");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bunnyAnimate, setBunnyAnimate] = useState(false);
  const [showMenuText, setShowMenuText] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = phase === "hero" ? "scroll" : "hidden";
  }, [phase]);

  useEffect(() => {
    if (phase === "svg") {
      const svgTimer = setTimeout(() => {
        setPhase("hero");
        setBunnyAnimate(true);
        const menuTimer = setTimeout(() => {
          setShowMenuText(true);
        }, 1800);
        return () => clearTimeout(menuTimer);
      }, 3000);
      return () => clearTimeout(svgTimer);
    }
  }, [phase]);

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

  return (
    <div className="custom-cursor-root relative bg-black min-h-screen text-white">
      {showMenuText && !menuOpen && (
        <button
          onClick={() => setMenuOpen(true)}
          className="fixed text-gray-400 text-xs sm:text-sm tracking-widest z-[9999] hover:text-gray-200 transition-colors top-3 sm:top-5 right-3 sm:right-5 cursor-pointer select-none"
          aria-label="Open Menu"
        >
          MENU
        </button>
      )}

      {phase === "typing" && <TypingLoader onFinish={() => setPhase("svg")} />}

      {phase === "svg" && (
        <div className="relative w-full h-screen flex items-center justify-center px-4">
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
              stroke="#ff69b4"
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
        <div className="relative w-full h-screen flex items-center justify-center overflow-hidden px-4">
          {/* Background text */}
          <div
            className="absolute left-1/2 top-[20%] sm:top-[26%] transform -translate-x-1/2 -translate-y-1/2
              text-[40px] sm:text-[120px] lg:text-[220px] font-extrabold text-white/10 whitespace-nowrap select-none pointer-events-none"
            style={{ fontFamily: "'Rock Salt', cursive" }}
          >
            MY PET
          </div>

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
              fill="none"
              stroke="#ff69b4"
              strokeWidth="3"
            >
              Grumpy
            </text>
          </svg>

          {/* Bunny image */}
          <div
            className={`absolute left-1/2 sm:left-[65%] -translate-x-1/2 sm:-translate-x-1/4 bottom-0 z-20 ${
              bunnyAnimate ? "bunny-rise" : "bunny-hidden"
            }`}
          >
            <Image
              src="/bunny.png"
              alt="bunny"
              width={700}
              height={1500}
              className="w-[160px] sm:w-[400px] lg:w-[700px] h-auto object-contain"
              priority
            />
          </div>

          {/* Paragraph + Button */}
          <div className="absolute bottom-4 sm:bottom-10 right-1/2 sm:right-14 translate-x-1/2 sm:translate-x-0 flex flex-col items-center space-y-3 sm:space-y-4 z-30 select-none max-w-[220px] sm:max-w-[300px]">
            <p className="text-[9px] sm:text-xs text-gray-400 text-center leading-snug">
              Discover the charm of your very own Grumpy companion.
              Each one is unique and brings joy in unexpected ways.
              Join the community of proud owners who embrace the quirky,
              lovable spirit of Grumpy every day.
              Ready to make one yours?
            </p>

            <a href="#choose" className="cursor-pointer" aria-label="Get your own Grumpy">
              <svg
                width="220"
                height="70"
                viewBox="0 0 420 130"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:opacity-80 transition-opacity duration-300 w-[180px] sm:w-[280px] lg:w-[420px]"
              >
                <path
                  d="M40 65 C35 18, 72 15, 120 35 C175 55, 345 25, 390 65 C365 105, 290 110, 235 105 C165 100, 95 115, 40 65 Z"
                  stroke="#B3FF00"
                  strokeWidth="4"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="210"
                  y="65"
                  fill="#B3FF00"
                  fontSize="10"
                  className="sm:text-[18px]"
                  fontWeight="600"
                  fontFamily="'Rock Salt', cursive"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  pointerEvents="none"
                  style={{ letterSpacing: "0.11em" }}
                >
                  GET YOUR OWN GRUMPY
                </text>
              </svg>
            </a>
          </div>
        </div>
      )}

      {phase === "hero" && (
        <>
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
