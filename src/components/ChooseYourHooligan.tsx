"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Rock_Salt } from "next/font/google";
import { motion } from "framer-motion";
import CVO from "../components/ChooseVoteOwn";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

interface HooliganNFT {
  id: string;
  price: string;
  image: string;
}

export default function ChooseYourHooligan() {
  const pink = "#bd027b";
  const hooligans: HooliganNFT[] = [
    { id: "#5677", price: "10.266 WETH", image: "/images/photo_1_2025-08-01_23-23-17.jpg" },
    { id: "#9823", price: "0.398 ETH", image: "/images/photo_2_2025-08-01_23-23-17.jpg" },
    { id: "#4387", price: "10.443 ETH", image: "/images/photo_3_2025-08-01_23-23-17.jpg" },
    { id: "#7706", price: "—", image: "/images/photo_4_2025-08-01_23-23-17.jpg" },
    { id: "#5426", price: "6.948 ETH", image: "/images/photo_5_2025-08-01_23-23-17.jpg" },
    { id: "#3710", price: "5.794 ETH", image: "/images/photo_6_2025-08-01_23-23-17.jpg" },
    { id: "#8508", price: "—", image: "/images/photo_7_2025-08-01_23-23-17.jpg" },
    { id: "#9821", price: "—", image: "/images/photo_8_2025-08-01_23-23-17.jpg" },
    { id: "#1107", price: "—", image: "/images/photo_9_2025-08-01_23-23-17.jpg" },
    { id: "#9031", price: "—", image: "/images/photo_10_2025-08-01_23-23-17.jpg" },
    { id: "#7320", price: "—", image: "/images/photo_11_2025-08-01_23-23-17.jpg" },
  ];

  return (
    <>
      <section>
        <CVO />
      </section>

      <section className="min-h-screen bg-black text-white text-center flex flex-col items-center py-2 relative px-4 sm:px-10">
        {/* Title block */}
        <div className="relative z-20 mt-20 mb-20 flex items-center justify-center flex-wrap sm:flex-nowrap gap-4">
          <div className="absolute text-[5rem] sm:text-[8rem] font-black text-gray-800 opacity-40 select-none leading-none whitespace-pre-line">
            CHOOSE <br /> YOUR
          </div>

          <span
            className={`${rockSalt.className} text-[5rem] sm:text-[8rem] font-extrabold relative z-10`}
            style={{ color: pink }}
          >
            Grumpy
          </span>
        </div>

        {/* NFT grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10 w-full max-w-[1100px]">
          {hooligans.slice(0, 3).map((h) => (
            <NFTCard key={h.id} {...h} />
          ))}

          <div className="col-span-2 sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {hooligans.slice(3, 5).map((h) => (
              <NFTCard key={h.id} {...h} />
            ))}
          </div>

          {hooligans.slice(5, 8).map((h) => (
            <NFTCard key={h.id} {...h} />
          ))}

          <div className="col-span-2 sm:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {hooligans.slice(8, 10).map((h) => (
              <NFTCard key={h.id} {...h} />
            ))}

            <div className="hover:bg-lime-400 flex items-center border-2 border-[#d4ff3f] justify-center font-bold hover:text-black text-lime-400 text-2xl cursor-pointer bg-black transition min-h-[15rem] text-center p-4">
              VIEW <br />ON OPENSEA
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function NFTCard({ id, price, image }: HooliganNFT) {
  // State to toggle overlay on mobile tap
  const [active, setActive] = useState(false);

  // Detect if running on mobile screen to control click behavior
  // We'll just always allow toggle on click — on desktop hover effect stays separate

  return (
    <motion.div
      onClick={() => setActive(!active)}
      className={`bg-black border border-pink-900 p-4 relative w-full max-w-xs h-60 overflow-hidden mx-auto cursor-pointer`}
      style={{ borderWidth: "2px" }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="w-full h-full relative group rounded overflow-hidden">
        {/* Pink overlay */}
        <div
          className={`absolute inset-0 bg-pink-500 transition-opacity duration-300 z-10 rounded
            ${active ? "opacity-30" : "opacity-0"} 
            hover:opacity-30
          `}
        ></div>

        {/* Image */}
        <Image
          src={image}
          alt={id}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm rounded"
        />

        {/* Top text */}
        <p
          className={`${rockSalt.className} absolute top-1 left-2 text-sm text-white bg-black bg-opacity-50 px-2 z-20 rounded select-none`}
        >
          Grumpy {id}
        </p>

        {/* Price */}
        {price !== "—" && (
          <p
            className={`${rockSalt.className} absolute bottom-1 right-2 text-pink-400 text-cm bg-black bg-opacity-50 px-2 z-20 rounded select-none`}
          >
            {price}
          </p>
        )}
      </div>
    </motion.div>
  );
}
