"use client";
import React from "react";
import { Rock_Salt } from "next/font/google";
import "../app/globals.css";
import { motion } from "framer-motion";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

const Roadmap: React.FC = () => {
  const pink = "#bd027b";

  return (
    <>
      <section className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden flex-col px-6 sm:px-16 py-10">
        {/* Background image */}
        <div
          className="absolute inset-0 opacity-10 bg-center bg-no-repeat bg-contain pointer-events-none"
          style={{ backgroundImage: "url('/your-background-image.png')" }}
        />

        {/* Big desktop ROADMAP */}
        <div
          className={`${rockSalt.className} roadmap-title absolute text-[8rem] font-extrabold z-10`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: pink,
          }}
        >
          ROADMAP
        </div>

        {/* Mobile ROADMAP */}
        <h2
          className={`${rockSalt.className} roadmap-phone-title hidden text-4xl font-extrabold text-center mb-8`}
          style={{ color: pink }}
        >
          ROADMAP
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
          <p className="text-gray-300 text-sm leading-snug">
            Hosting contests and virtual events while offering exclusive benefits like discounts and early access to new releases for current NFT holders.
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
          <p className="text-gray-300 text-sm leading-snug">
            Involving NFT owners in decision-making through polls and surveys; planning collaborations to create unique content and expand reach.
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
          <p className="text-gray-300 text-sm leading-snug">
            Offering NFT holders exclusive content like videos and music; developing a game with interactive character use and charity support.
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
          <p className="text-gray-300 text-sm leading-snug">
            Creating an owner portal for NFT owners to share experiences, create content, and monetize while supporting a shelter.
          </p>
        </motion.div>

        {/* Decorative dot */}
        <div className="decorative-dot absolute top-1/4 right-20 w-3 h-3 bg-lime-400 rounded-full animate-pulse opacity-70" />
      </section>
    </>
  );
};

export default Roadmap;