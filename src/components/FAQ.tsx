"use client";
import React, { useState, useEffect, useRef } from "react";
import { Rock_Salt } from "next/font/google";
import { motion, useInView } from "framer-motion";

const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
});

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const pink = "#66FF66";
  const lime = "#66FF66";
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [typedText, setTypedText] = useState("");
  const fullText = "QUESTIONS";

  // Ref for the section container to detect inView
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" }); // triggers a bit early

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100); // typing speed 100ms per char

    return () => clearInterval(timer);
  }, [isInView]);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question:
        'IS IT POSSIBLE TO GET A PHYSICAL COPY OF THE NFT "MY PET Grumpy"?',
      answer:
        "Currently, our NFTs exist as digital assets on the blockchain. However, we are exploring options for physical merchandise and collectibles for NFT holders.",
    },
    {
      id: 2,
      question: "CAN I EXCHANGE OR SELL MY NFTS?",
      answer:
        "Absolutely! Your NFTs are fully owned by you and can be traded on any compatible NFT marketplace.",
    },
    {
      id: 3,
      question:
        "IS IT POSSIBLE TO SEE THE RESULTS OF YOUR PROJECT'S ASSISTANCE TO SHELTERS?",
      answer:
        "Yes! We regularly publish reports showing how funds from NFT sales are being used to support animal shelters.",
    },
    {
      id: 4,
      question:
        "HOW DO YOU PROVIDE ASSISTANCE TO SHELTERS THROUGH YOUR PROJECT?",
      answer:
        "We partner with shelters and provide them with financial support, supplies, and promotion through our community.",
    },
  ];

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <>
      <style jsx>{`
        section {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }
        .bg-faded-text {
          top: 3rem;
          font-size: clamp(4rem, 12vw, 8rem);
          line-height: 1.1;
          white-space: pre-line;
          user-select: none;
          pointer-events: none;
          text-align: center;
          width: 100%;
          color: rgba(107, 114, 128, 0.3);
          font-weight: 800;
          letter-spacing: 0.1em;
          position: absolute;
          z-index: 0;
          font-family: 'Arial Black', Arial, sans-serif;
        }
        .faq-title {
          margin-top: 9rem;
          font-size: 5.5rem;
          font-weight: 800;
          color: ${pink};
          user-select: none;
          font-family: ${rockSalt.style?.fontFamily || "cursive"};
          z-index: 10;
          white-space: pre; /* keep spacing consistent */
          display: inline-block;
          position: relative;
        }
        /* blinking cursor */
        .cursor {
          display: inline-block;
          width: 0.15em;
          background-color: ${pink};
          margin-left: 2px;
          animation: blink 1s steps(2, start) infinite;
          position: absolute;
          right: -0.2em;
          top: 0;
          bottom: 0;
        }
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        .faq-list {
          max-width: 768px;
          margin: 0 auto;
          width: 100%;
          z-index: 10;
          margin-top: 3rem;
        }
        .faq-question {
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.125rem;
        }
        .faq-toggle-icon {
          font-size: 1.875rem;
          font-weight: 900;
          color: ${lime};
          user-select: none;
          flex-shrink: 0;
        }
        .faq-answer {
          overflow: hidden;
          font-weight: bold;
          transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
          max-height: 0;
          opacity: 0;
          padding-left: 40%;
        }
        .faq-answer.open {
          max-height: 10rem;
          opacity: 1;
          margin-bottom: 1.5rem;
        }
        hr {
          margin-top: 0.75rem;
          border-color: rgba(107, 114, 128, 0.5);
        }
        @media (max-width: 640px) {
          section {
            padding-left: 2rem;
            padding-right: 2rem;
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
          .bg-faded-text {
            font-size: 3.5rem;
            top: 2rem;
            letter-spacing: 0.05em;
          }
          .faq-title {
            margin-top: 6rem;
            font-size: 3rem;
            letter-spacing: 0.05em;
          }
          .faq-list {
            max-width: 100%;
            margin-top: 2rem;
          }
          .faq-question {
            font-size: 1rem;
          }
          .faq-toggle-icon {
            font-size: 1.5rem;
          }
          .faq-answer {
            padding-left: 1.5rem !important;
            max-height: 15rem !important;
          }
          .faq-answer.open {
            max-height: 15rem !important;
            margin-bottom: 1rem;
          }
          hr {
            margin-top: 0.5rem;
          }
          /* Adjust cursor on mobile if you want */
          .cursor {
            right: -0.15em;
            width: 0.12em;
          }
        }
      `}</style>

      <motion.section
        ref={sectionRef}
        className="min-h-screen bg-black text-white py-20 px-6 relative flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Large faded background text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ width: "100%" }}
        >
          <div className="bg-faded-text">
            FREQUENTLY
            <br />
            ASKED
          </div>
        </motion.div>

        {/* Typing animation for "QUESTIONS" */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className="faq-title">
            {typedText}
            {/* Invisible remainder text to prevent layout shift */}
            <span style={{ opacity: 0 }}>{fullText.slice(typedText.length)}</span>
            {/* Show blinking cursor only while typing */}
            {typedText.length < fullText.length && <span className="cursor" />}
          </span>
        </motion.div>

        {/* FAQ List */}
        <div className="faq-list !py-20">
          {faqData.map((item, idx) => (
            <motion.div
              key={item.id}
              className="border-t border-gray-600 py-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div
                className="faq-question"
                onClick={() => toggleItem(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleItem(item.id);
                }}
                aria-expanded={isOpen(item.id)}
                aria-controls={`faq-answer-${item.id}`}
                id={`faq-question-${item.id}`}
              >
                <span className="faq-toggle-icon">
                  {isOpen(item.id) ? "−" : "+"}
                </span>
                <span>{item.question}</span>
              </div>

              <div
                id={`faq-answer-${item.id}`}
                aria-labelledby={`faq-question-${item.id}`}
                className={`faq-answer ${isOpen(item.id) ? "open" : ""}`}
              >
                <p className="text-gray-400 text-sm font-bold">
                  {item.answer}
                </p>
              </div>

              {idx === faqData.length - 1 ? (
                <div className="border-t border-gray-600"></div>
              ) : (
                <hr />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default FAQ;
