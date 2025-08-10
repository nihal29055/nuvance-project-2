"use client";

import { useEffect } from "react";
import Link from "next/link";

const navItems = [
  { name: "MAIN", path: "/" },
  { name: "ABOUT", path: "/about" },
  { name: "COLLECTION", path: "/collection" },
  { name: "ROADMAP", path: "/roadmap" },
  { name: "FAQ", path: "/faq" },
  { name: "CONTACT US", path: "/contact" },
];

const socialItems = [
  { name: "DISCORD", url: "https://discord.com" },
  { name: "TWITTER", url: "https://twitter.com" },
  { name: "INSTAGRAM", url: "https://instagram.com" },
];

export default function Navbar({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // Disable custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

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
  }, []);

  return (
    <>
      <style>{`
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

        .close-btn {
          position: absolute;
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
          z-index: 10;
        }
        .close-btn:hover {
          color: #B3FF00;
          transform: scale(1.1);
        }

        nav {
          position: absolute;
          right: 32px;
          top: 5%;            
          bottom: 5%;         
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          font-size: 8vw;  /* responsive scaling using viewport width */
          max-font-size: 90px; /* will clamp below via clamp() */
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
          pointer-events: none;
        }
        nav p a {
          color: #888888;
          pointer-events: auto;
          display: inline-block;
          transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;
          user-select: none;
          white-space: nowrap;
        }
        nav p a:hover {
          color: #B3FF00;
          transform: scale(1.1) translateX(-90px);
          text-shadow:
            0 0 2px #B3FF00,
            0 0 4px #B3FF00;
        }

        .socials {
          position: absolute;
          bottom: 32px;
          left: 32px;
          display: flex;
          gap: 16px;
          font-weight: 600;
          font-size: 14px;
          user-select: none;
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

        /* Clamp font size between 24px and 90px with responsive vw */
        @supports (font-size: clamp(24px, 8vw, 90px)) {
          nav {
            font-size: clamp(24px, 8vw, 90px);
          }
        }

        /* For very small phones, reduce gap slightly */
        @media (max-width: 400px) {
          nav {
            gap: 1rem;
            right: 16px;
            top: 6%;
            bottom: 6%;
          }
          .socials {
            bottom: 16px;
            left: 16px;
            font-size: 12px;
            gap: 12px;
          }
          .close-btn {
            top: 12px;
            right: 12px;
            font-size: 24px;
          }
        }
      `}</style>

      <div className="custom-cursor-root relative w-full h-screen bg-black overflow-hidden text-white">
        <div
          className="close-btn cursor-target"
          onClick={onClose}
          aria-label="Close Menu"
        >
          &times;
        </div>

        <nav>
          {navItems.map((item) => (
            <p key={item.name}>
              <Link href={item.path} className="cursor-target">
                {item.name}
              </Link>
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
