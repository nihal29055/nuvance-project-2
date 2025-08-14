"use client";
import { Rock_Salt } from "next/font/google";
import { motion } from "framer-motion";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

export default function HooliganUI() {
  const pink = "#66FF66";

  return (
    <>
      <style jsx>{`
      *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 10px;
    border: 0 solid;
}
        @media (max-width: 640px) {
          /* Section min-height badhao phone ke liye */
          section,
          .main-container {
            min-height: 110vh !important;
          }

          /* Grumpy text aur chhota karo aur center karo */
          .main-text {
            font-size: 6rem !important; /* aur chhota */
            top: 38% !important; /* thoda upar */
            bottom: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }

          /* Bottom left paragraph chhota karo aur thoda upar karo */
          .bottom-left-text {
            bottom: 12rem !important; /* thoda upar */
            left: 1rem !important;
            max-width: 16rem !important;
            font-size: 0.75rem !important;
          }
          .bottom-left-text p:last-child {
            font-size: 1.1rem !important;
          }

          /* Bottom right links ko neeche aur center karo */
          .bottom-right-links {
            bottom: 4rem !important;
            right: 50% !important;
            transform: translateX(50%) !important;
            gap: 1rem !important;
            font-size: 0.75rem !important;
          }

          /* Separator line ko aur neeche karo, social links ke thoda upar */
          .separator-line {
            bottom: 7rem !important;
            left: 5% !important;
            width: 90% !important;
            border-width: 1px !important;
          }

          /* Footer chhota aur thoda upar */
          .footer {
            bottom: 1rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            font-size: 0.65rem !important;
          }
          .footer svg {
            width: 1rem !important;
            height: 1rem !important;
          }
        }
      `}</style>

      <section className="main-container relative flex flex-col items-center justify-center min-h-screen bg-black text-[#DDDDDD] overflow-hidden">
        {/* Background text */}
        <motion.div
          className="absolute text-gray-800 text-[12vw] font-bold opacity-30 select-none"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ lineHeight: 1, top: "5%", left: "5%" }}
        >
          <span className="block leading-none">JOIN</span>
          <span className="block leading-none">OUR</span>
          <span className="block leading-none">COMMUNITY</span>
        </motion.div>

        {/* Bunny outline */}
        <motion.div
          className="absolute top-10 right-10 opacity-10 select-none"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ width: "16rem", height: "16rem" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M70 20 C60 0, 40 0, 35 25 C30 50, 50 90, 65 70" />
            <path d="M130 20 C140 0, 160 0, 165 25 C170 50, 150 90, 135 70" />
            <circle cx="100" cy="110" r="50" />
            <line x1="75" y1="95" x2="85" y2="105" />
            <line x1="85" y1="95" x2="75" y2="105" />
            <line x1="115" y1="95" x2="125" y2="105" />
            <line x1="125" y1="95" x2="115" y2="105" />
            <circle cx="100" cy="115" r="3" fill="currentColor" />
            <path d="M95 125 Q100 135 105 125" />
          </svg>
        </motion.div>

        {/* Main Grumpy text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 main-text"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ fontSize: "5rem", top: "auto", bottom: "auto" }}
        >
          <span
            className={`${rockSalt.className} !font-extrabold text-[#66FF66]`}
          >
            Grumpy
          </span>
        </motion.div>

        {/* Bottom left paragraph */}
        <motion.div
          className="absolute bottom-40 left-10 text-[#DDDDDD] bottom-left-text"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ maxWidth: "22rem" }}
        >
          <p className="text-sm max-w-sm">
            Stay up to date with the latest news and updates by following us on
            social media. Join our mission to support the livestock industry and
            the NFT community.
          </p>
          <p className="!mt-2 font-bold text-[#DDDDDD] text-3xl tracking-wider">
            WE CAN DO MORE TOGETHER!
          </p>
        </motion.div>

        {/* Bottom right links */}
        <motion.div
          className="absolute bottom-20 right-4 flex gap-8 text-[#66FF66] bottom-right-links"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="#" className={`hover:underline ${rockSalt.className}`}>
            DISCORD
          </a>
          <a href="#" className={`hover:underline ${rockSalt.className}`}>
            TWITTER
          </a>
          <a href="#" className={`hover:underline ${rockSalt.className}`}>
            INSTAGRAM
          </a>
        </motion.div>

        {/* Separator line */}
        <motion.hr
          className="absolute bottom-14 left-16 w-[90%] border-gray-700 separator-line"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        />

        {/* Footer */}
        {/* Footer */}
        <motion.div
          className="absolute bottom-4 w-full flex items-center justify-between px-6 text-xs text-gray-500 footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 opacity-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M70 20 C60 0, 40 0, 35 25 C30 50, 50 90, 65 70" />
              <path d="M130 20 C140 0, 160 0, 165 25 C170 50, 150 90, 135 70" />
              <circle cx="100" cy="110" r="50" />
              <line x1="75" y1="95" x2="85" y2="105" />
              <line x1="85" y1="95" x2="75" y2="105" />
              <line x1="115" y1="95" x2="125" y2="105" />
              <line x1="125" y1="95" x2="115" y2="105" />
              <circle cx="100" cy="115" r="3" fill="currentColor" />
              <path d="M95 125 Q100 135 105 125" />
            </svg>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </motion.div>

      </section>
    </>
  );
}
