"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: "MAIN", id: "hero" },
  { name: "ABOUT", id: "about" },
  { name: "COLLECTION", id: "choose" },
  { name: "ROADMAP", id: "roadmap" },
  { name: "FAQ", id: "faq" },
  { name: "CONTACT US", id: "contact" }, // add id="contact" section in your page if needed
];

const socialItems = [
  { name: "DISCORD", url: "https://discord.com" },
  { name: "TWITTER", url: "https://twitter.com" },
  { name: "INSTAGRAM", url: "https://instagram.com" },
];

export default function Navbar({ onClose }: { onClose: () => void }) {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices or small screens
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 640;

    if (!isTouchDevice && !isSmallScreen) {
      setShowCursor(true);

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
    }
  }, []);

  // Scroll to section by id smoothly and close menu
  const handleNavClick = (id: string) => {
    onClose();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        ${showCursor ? `
          .custom-cursor-root {
            cursor: none;
          }
          .custom-cursor {
            position: fixed;
            top: 0;
            left: 0;
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background-color: #B3FF00;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: transform 150ms ease, opacity 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
          }
          .custom-cursor.hovered {
            background-color: rgba(251, 253, 247, 0.1);
            box-shadow: 0 0 2px rgba(179, 255, 0, 0.2);
            transform: translate(-50%, -50%) scale(1.2);
          }
        ` : ''}

        .close-btn {
          position: fixed;
          top: 16px;
          right: 16px;
          font-weight: 700;
          font-size: 28px;
          cursor: pointer;
          color: #888888;
          user-select: none;
          transition: color 0.3s ease, transform 0.2s ease;
          line-height: 1;
          padding: 0 6px;
          border-radius: 4px;
          z-index: 1100;
          background: transparent;
        }
        .close-btn:hover {
          color: #B3FF00;
          transform: scale(1.1);
        }

        nav {
          position: fixed;
          top: 64px;
          right: 64px;
          bottom: 5%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-size: 8vw;
          font-weight: 600;
          text-align: right;
          line-height: 1.1;
          overflow-y: auto;
          padding-right: 10px;
          max-height: 90vh;
          user-select: none;
        }
        nav p {
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          cursor: pointer;
        }
        nav p span.nav-link {
          color: #888888;
          display: inline-block;
          transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;
          user-select: none;
          white-space: nowrap;
        }
        nav p:hover span.nav-link {
          color: #B3FF00;
          transform: scale(1.1) translateX(-90px);
          text-shadow:
            0 0 2px #B3FF00,
            0 0 4px #B3FF00;
        }

        .socials {
          position: fixed;
          bottom: 32px;
          left: 32px;
          display: flex;
          gap: 16px;
          font-weight: 600;
          font-size: 14px;
          user-select: none;
          z-index: 1000;
        }
        .socials a {
          color: #B3FF00;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.3s ease;
          padding-bottom: 4px;
        }
        .socials a:hover {
          opacity: 0.8;
        }

        @supports (font-size: clamp(24px, 8vw, 90px)) {
          nav {
            font-size: clamp(24px, 8vw, 90px);
          }
        }

        @media (max-width: 640px) {
          nav {
            top: 56px;
            right: auto;
            left: 20px;
            bottom: auto;
            gap: 1.5rem;
            font-size: clamp(20px, 6vw, 36px);
            max-height: none;
            text-align: left;
            padding-right: 0;
            justify-content: flex-start;
            overflow-y: visible;
          }
          nav p {
            justify-content: flex-start;
            gap: 10px;
          }
          nav p:hover span.nav-link {
            transform: none;
            text-shadow: none;
            color: #B3FF00;
          }
          nav p > span.arrow {
            display: none !important;
          }
          .close-btn {
            top: 12px;
            right: 20px;
            font-size: 28px;
            z-index: 1200;
          }
        }
      `}</style>

      <div className={`custom-cursor-root relative w-full h-screen bg-black overflow-hidden text-white`}>
        <div
          className="close-btn cursor-target"
          onClick={onClose}
          aria-label="Close Menu"
        >
          &times;
        </div>

        <nav>
          {navItems.map((item) => (
            <p
              key={item.name}
              className="group flex items-center justify-end gap-3 cursor-pointer"
              onClick={() => handleNavClick(item.id)}
            >
              <motion.span
                className="arrow text-[#d4ff3f] text-[1.5vw] opacity-0 group-hover:opacity-100 !mr-[180px]"
                animate={{ x: [0, 20, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ➤➤➤
              </motion.span>

              <span className="nav-link cursor-target transition-all duration-300 group-hover:text-[#B3FF00] group-hover:scale-110">
                {item.name}
              </span>
            </p>
          ))}
        </nav>

        <div className="socials">
          {socialItems.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
