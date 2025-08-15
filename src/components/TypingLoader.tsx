"use client";
import React, { useEffect, useState } from "react";

const messages = [
  "NOT JUST DIGITAL CHARACTERS.",
  "THIS IS YOUR WAY OF CONTRIBUTING",
  "TO THE LIVES OF THOSE IN NEED."
];

export default function TypingLoader({ onFinish }: { onFinish: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>(
    Array(messages.length).fill("")
  );
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (currentLine >= messages.length) {
      setTimeout(() => setShowLoading(true), 300);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 1200);
      return;
    }

    let charIndex = 0;
    let typingTimeout: NodeJS.Timeout;

    const typeChar = () => {
      setDisplayedLines((prev) => {
        const updated = [...prev];
        updated[currentLine] = messages[currentLine].slice(0, charIndex + 1);
        return updated;
      });

      charIndex++;

      if (charIndex < messages[currentLine].length) {
        typingTimeout = setTimeout(typeChar, 20);
      } else {
        setTimeout(() => {
          setCurrentLine((prev) => prev + 1);
        }, 400);
      }
    };

    typingTimeout = setTimeout(typeChar, 200);

    return () => clearTimeout(typingTimeout);
  }, [currentLine]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black text-white px-4">
      <div className="relative flex flex-col items-center text-center max-w-4xl pb-[120px]">
        {displayedLines.map((line, idx) => (
          <p
            key={idx}
            className={`${
              idx === 0
                ? "text-2xl md:text-4xl font-bold leading-[50px]"
                : "text-lg md:text-2xl font-medium text-gray-300 leading-[40px]"
            } tracking-wide`}
          >
            {line}
            {currentLine === idx && <span className="animate-blink">|</span>}
          </p>
        ))}

        {showLoading && (
          <p
            className="text-xl md:text-2xl font-semibold animate-pulse absolute bottom-[-200px]"
            style={{
              color: "#B3FF00",
              textShadow:
                "0 0 6px #B3FF00, 0 0 10px #B3FF00, 0 0 20px #B3FF00, 0 0 30px #A0FF00",
            }}
          >
            LOADING<span className="dot-animate"></span>
          </p>
        )}
      </div>
    </div>
  );
}
