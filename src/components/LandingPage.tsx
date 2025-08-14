import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./Header"; // Assuming you have a Header component
import MenuOverlay from "./MenuOverlay";
import ContributingSection from "./ContributingOverlay";

const HooliganLanding: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCharacterClicked, setIsCharacterClicked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const bgText = document.querySelector(".bg-text") as HTMLElement;
      if (bgText) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        bgText.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCTA = () => {
    alert("Ready to join the Hooligan revolution? 🎭");
  };

  const handleCharacterClick = () => {
    setIsCharacterClicked(true);
    setTimeout(() => setIsCharacterClicked(false), 2000);
  };

  const getCharacterTransform = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (mousePosition.x - centerX) / 50;
    const deltaY = (mousePosition.y - centerY) / 50;
    return `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(1deg); }
            66% { transform: translateY(5px) rotate(-1deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.5; }
          }
          @keyframes pulseIntense {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.8; }
          }
          .character-float {
            animation: float 6s ease-in-out infinite;
          }
          .character-clicked {
            animation: float 6s ease-in-out infinite, pulseIntense 2s ease-in-out;
          }
          .glow-pulse {
            animation: pulse 4s ease-in-out infinite;
          }
          .glow-1 { animation-delay: 0s; }
          .glow-2 { animation-delay: 2s; }
          .glow-3 { animation-delay: 1s; }
          .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
          }
          .cta-button:hover::before {
            left: 100%;
          }
        `}
      </style>
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      {/* Main Container */}
      <div className="min-h-screen relative flex flex-col justify-center items-center p-8">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow Effects */}
        <div
          className="glow-pulse glow-1 absolute top-1/5 left-1/10 w-48 h-48 rounded-full z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 105, 180, 0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="glow-pulse glow-2 absolute top-3/5 right-1/10 w-48 h-48 rounded-full z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 105, 180, 0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="glow-pulse glow-3 absolute bottom-1/5 left-1/5 w-48 h-48 rounded-full z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 105, 180, 0.1) 0%, transparent 70%)",
          }}
        />

        {/* Large Background Text */}
        <div
          className="bg-text absolute pointer-events-none select-none z-10 text-gray-700 opacity-30 font-black tracking-wider"
          style={{
            fontSize: "clamp(8rem, 25vw, 20rem)",
            fontFamily: "Arial Black, sans-serif",
          }}
        >
          MY PET
        </div>

        {/* Main Content */}
        <div className="z-20 max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16 px-4">
          {/* Left Side - Character and Title */}
          <div className="flex-1 flex justify-center items-center">
            <div className="relative">
              {/* Title - Behind Character */}
              <h1
                className="text-pink-400 font-black tracking-wide transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative z-10"
                style={{
                  fontFamily:
                    "Impact, 'Arial Black', 'Helvetica Neue', Arial, sans-serif",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 900,
                  textShadow: `
                    0 0 15px rgba(255, 105, 180, 0.6),
                    0 0 30px rgba(255, 105, 180, 0.4),
                    5px 5px 10px rgba(0, 0, 0, 0.8)
                  `,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  WebkitTextStroke: "2px rgba(255, 105, 180, 0.8)",
                }}
              >
                HOOLIGAN
              </h1>

              {/* Character Image - In Front */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <Image
                  src="/images/photo_1_2025-08-01_23-23-17.jpg"
                  alt="Hooligan Character"
                  width={300}
                  height={300}
                  className={`${
                    isCharacterClicked ? "character-clicked" : "character-float"
                  } transition-transform duration-500 ease-in-out rounded-lg shadow-2xl`}
                  style={{
                    transform: getCharacterTransform(),
                    cursor: "pointer",
                    filter: "drop-shadow(0 20px 40px rgba(255, 105, 180, 0.3))",
                  }}
                  onClick={handleCharacterClick}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Description and CTA */}
          <div className="flex-1 flex flex-col justify-center items-start text-left lg:pl-8">
            {/* Description */}
            <div className="mb-8 max-w-3xl">
              <p className="text-lg md:text-xl lg:text-2xl text-[#DDDDDD] leading-relaxed font-light">
                Become a part of an exclusive community of collectors where
                <span className="text-pink-300 font-medium">
                  {" "}
                  creativity meets rebellion
                </span>
                . Own your unique digital companion and join the
                <span className="text-green-300 font-medium">
                  {" "}
                  underground revolution
                </span>
                .
              </p>
            </div>

            {/* CTA Button */}
            <button
              className="cta-button bg-transparent border-3 border-green-400 text-green-400 px-10 py-5 text-lg md:text-xl font-bold rounded-xl cursor-pointer transition-all duration-300 uppercase tracking-wide relative overflow-hidden hover:bg-green-400 hover:text-black hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
              style={{
                boxShadow:
                  "0 0 30px rgba(57, 255, 20, 0.4), 0 10px 25px rgba(0, 0, 0, 0.3)",
              }}
              onClick={handleCTA}
            >
              🎭 GET YOUR OWN HOOLIGAN 🎭
            </button>
          </div>
        </div>
      </div>

      <ContributingSection />

      {/* Digital Characters Section */}

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Additional Sections */}
      <section className="py-16 px-8 bg-gray-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-pink-400">
          Way of Contributing
        </h2>
        <p className="text-[#DDDDDD] max-w-2xl mx-auto mb-8">
          The creators of our project have built this universe to reward
          participation. Join us in Discord and follow on Twitter to stay
          engaged.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-gray-700 hover:bg-gray-600 text-[#DDDDDD] px-6 py-3 rounded-lg transition-all duration-300">
            Discord
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-[#DDDDDD] px-6 py-3 rounded-lg transition-all duration-300">
            Twitter
          </button>
        </div>
      </section>

      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pink-400">
          Create. Vote. Own.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Empower your creativity, decide the future of the Hooligan world, and
          own a part of it forever.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-black py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-400">
          Join Our Hooligan Community
        </h2>
        <div className="flex justify-center gap-4 flex-wrap mb-4">
          <button className="bg-gray-700 hover:bg-gray-600 text-[#DDDDDD] px-6 py-3 rounded-lg transition-all duration-300">
            Discord
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-[#DDDDDD] px-6 py-3 rounded-lg transition-all duration-300">
            Twitter
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-[#DDDDDD] px-6 py-3 rounded-lg transition-all duration-300">
            Instagram
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">We can do more together!</p>
      </footer>
    </div>
  );
};

export default HooliganLanding;
