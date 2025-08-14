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
  const pink = "#66FF66";

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
    { id: "#7320", price: "—", image: "/images/photo_12_2025-08-01_23-23-17.jpg" },
    { id: "#7320", price: "—", image: "/images/photo_13_2025-08-01_23-23-17.jpg" },
    { id: "#7320", price: "—", image: "/images/photo_14_2025-08-01_23-23-17.jpg" },
  ];

  return (
    <>
      <section>
        <CVO />
      </section>

      <section className="min-h-screen bg-black text-[#DDDDDD] text-center flex flex-col items-center py-2 sm:py-10 relative px-4 sm:px-10 mt-0 sm:mt-20">
        {/* Title block */}
        <div className="relative z-20 mb-20 flex items-center justify-center flex-wrap sm:flex-nowrap gap-4">
          <div className="absolute text-[3rem] sm:text-[8rem] font-black text-gray-800 opacity-40 select-none leading-none whitespace-pre-line">
            CHOOSE <br /> YOUR
          </div>

          <span
            className={`${rockSalt.className} text-[5rem] sm:text-[8rem] !py-10 font-extrabold relative z-10 text-[#66FF66]`}
          >
            Grumpy
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center w-full max-w-[1280px] px-2">
          {hooligans.slice(0, 14).map((hooligan, index) => (
            <div
              key={hooligan.id + index}
              className="h-[15rem] w-full max-w-[20rem] sm:h-[18rem] sm:w-full md:h-[20rem] md:w-full mx-auto"
            >
              <NFTCard {...hooligan} />
            </div>
          ))}

          {/* VIEW ON OPENSEA tile */}
          <div
            className="bg-black border border-pink-900 p-4 relative w-full h-full max-w-[20rem] overflow-hidden mx-auto cursor-pointer flex items-center justify-center font-bold text-[#66FF66] text-2xl transition hover:bg-[#66FF66] hover:text-black rounded"
            style={{ borderWidth: "2px" }}
          >
            VIEW <br /> ON ARTAXA
          </div>

        </div>

      </section>
    </>
  );
}

function NFTCard({ id, price, image }: HooliganNFT) {
  const [active, setActive] = useState(false);

  return (
    <motion.div
      onClick={() => setActive(!active)}
      className="bg-black border border-pink-900 p-4 relative w-full h-full overflow-hidden mx-auto cursor-pointer"
      style={{ borderWidth: "2px" }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="w-full h-full relative group rounded overflow-hidden">
        <div
          className={`absolute inset-0 bg-[#66FF66] transition-opacity duration-300 z-10 rounded ${active ? "opacity-30" : "opacity-0"
            } hover:opacity-30`}
        ></div>

        <Image
          src={image}
          alt={id}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-sm rounded"
        />

        <p
          className={`${rockSalt.className} absolute top-1 left-2 text-sm text-[#DDDDDD] bg-black bg-opacity-50 px-2 z-20 rounded select-none`}
        >
          Grumpy {id}
        </p>

        {price !== "—" && (
          <p
            className={`${rockSalt.className} absolute bottom-1 right-2 text-[#66FF66] text-cm bg-black bg-opacity-50 px-2 z-20 rounded select-none`}
          >
            {price}
          </p>
        )}
      </div>
    </motion.div>
  );
}
