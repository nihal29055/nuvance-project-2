"use client";
import React from "react";
import { Rock_Salt } from "next/font/google";
import { motion } from "framer-motion";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

const Roadmap: React.FC = () => {
  const pink = "#bd027b";

  const roadmapData = [
    {
      quarter: "2024 Q1",
      description:
        "Hosting contests and virtual events while offering exclusive benefits like discounts and early access to new releases for current NFT holders.",
      style: { top: "15%", left: "5%", textAlign: "left", maxWidth: "260px" },
    },
    {
      quarter: "2024 Q2",
      description:
        "Involving NFT owners in decision-making through polls and surveys; planning collaborations to create unique content and expand reach.",
      style: { top: "15%", left: "40%", textAlign: "left", maxWidth: "260px" },
    },
    {
      quarter: "2024 Q3",
      description:
        "Offering NFT holders exclusive content like videos and music; developing a game with interactive character use and charity support.",
      style: { bottom: "15%", left: "20%", textAlign: "left", maxWidth: "260px" },
    },
    {
      quarter: "2024 Q4",
      description:
        "Creating an owner portal for NFT owners to share experiences, create content, and monetize while supporting a shelter.",
      style: { bottom: "15%", right: "15%", textAlign: "left", maxWidth: "260px" },
    },
  ];

  return (
    <>
      <style jsx>{`
        /* Phone styles */
        @media (max-width: 640px) {
          .roadmap-item {
            position: static !important;
            max-width: 90vw !important;
            margin: 3.5rem auto !important; /* Increased margin for spacing */
            left: auto !important;
            right: auto !important;
            top: auto !important;
            bottom: auto !important;
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
            text-align: left !important;
          }
          .roadmap-item p:first-child {
            font-size: 1.3rem !important;
            font-weight: 700 !important;
            margin-bottom: 0.5rem !important;
          }
          .roadmap-item p {
            font-size: 0.9rem !important;
            line-height: 1.4 !important;
          }
          .roadmap-title {
            display: none !important;
          }
          .decorative-dot {
            display: none !important;
          }
          section {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
            padding-left: 3rem !important;  /* Increased padding left */
            padding-right: 3rem !important; /* Increased padding right */
          }
          .roadmap-phone-title {
            display: block !important;
            font-size: 3.5rem;
            font-weight: 800;
            color: ${pink};
            text-align: center;
            margin: 2rem auto;
          }
        }

        /* Laptop and above */
        @media (min-width: 641px) {
          .roadmap-phone-title {
            display: none !important;
          }
          .decorative-dot {
            display: block !important;
          }
          .roadmap-item {
            filter: none !important;
            opacity: 1 !important;
            transform: none !important;
            max-width: 260px !important;
          }
          .roadmap-title {
            position: absolute !important;
            font-size: 8rem !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            color: ${pink} !important;
            font-weight: 800 !important;
            pointer-events: none !important;
            z-index: 10 !important;
            text-align: center !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .roadmap-item p:first-child {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }
          .roadmap-item p {
            font-size: 0.875rem;
            line-height: 1.4;
          }
        }
      `}</style>

      <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden flex-col px-16 py-10 roadmap-container">
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain pointer-events-none"
          style={{ backgroundImage: "url('/your-background-image.png')" }}
        />

        {/* Laptop/desktop big ROADMAP title */}
        <div
          className={`${rockSalt.className} roadmap-title pointer-events-none`}
          aria-hidden="true"
        >
          ROADMAP
        </div>

        {/* Small centered ROADMAP title for phone */}
        <div className="roadmap-phone-title hidden">ROADMAP</div>

        {/* Roadmap items */}
        {roadmapData.map((item, index) => (
          <motion.div
            key={item.quarter}
            className="roadmap-item"
            style={{ ...item.style, position: "absolute" }}
            initial={{ opacity: 0, x: -50, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: index * 0.3, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <p className="text-lime-400 font-bold mb-2">{item.quarter}</p>
            <p className="text-gray-300 text-sm leading-snug">{item.description}</p>
          </motion.div>
        ))}

        {/* Decorative dot */}
        <div className="absolute top-1/4 right-20 w-3 h-3 bg-lime-400 rounded-full animate-pulse opacity-70 decorative-dot" />
      </section>
    </>
  );
};

export default Roadmap;
