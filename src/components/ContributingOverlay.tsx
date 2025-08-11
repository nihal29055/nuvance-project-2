"use client";
import styles from "../app/contributing.module.css";
import { Rock_Salt } from "next/font/google";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const rockSalt = Rock_Salt({ subsets: ["latin"], weight: "400" });

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function useTypingEffect(text: string, speed = 30, active = true) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, active]);

  return displayedText;
}

export default function ContributingPage() {
  const topParagraphText = `THE ORIGINS OF OUR PROJECT
GO BACK TO THE DARKEST
TIMES – THE TIMES OF WAR,
WHEN MANY ANIMALS WERE
LEFT HOMELESS. THIS
HELPLESSNESS AND PAIN THAT
WE FELT FOR THE ANIMALS
SPURRED US TO ACTION.`;

  const bottomParagraphText = `A collection that has a deeper 
meaning and helps those in need. 
That’s how My Pet Hooligan was 
born – a collection of NFTs with 
unique characters, each of which 
brings not only fun and 
unpredictability, but also hope 
for a better future.

Each NFT sold from our collection 
partially funds assistance to 
shelters for animals in need 
during the war. This is our way of 
contri`;

  // Section visibility tracking
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root: null, rootMargin: "0px", threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Typing animations
  const typedTop = useTypingEffect(topParagraphText, 25, isVisible);
  const typedBottom = useTypingEffect(bottomParagraphText, 20, isVisible);
  const typedContributing = useTypingEffect("CONTRIBUTING", 80, isVisible);

  return (
    <section
      ref={sectionRef}
      className={styles.wrapper}
      style={{ paddingBottom: "2rem" }}
    >
      {/* Top Left Paragraph with typing */}
      <motion.p
        className={`${styles.topText} phone-responsive-toptext whitespace-pre-line`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        style={{ minHeight: "10rem" }}
      >
        {typedTop}
      </motion.p>

      {/* Big Title with "CONTRIBUTING" typed below */}
      <motion.div
        className={`${styles.titleBlock} phone-responsive-titleblock`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <span className={`${styles.discordTag} ${styles.tag}`}>DISCORD</span>
        <h1 className={`${styles.title} ${rockSalt.className}`}>
          WAY OF <span className={styles.twitterTag}>TWITTER</span>
        </h1>
        <div
          className={`${styles.title} ${rockSalt.className}`}
          style={{ minHeight: "2.5rem" }}
        >
          {typedContributing || (
            <span style={{ visibility: "hidden" }}>CONTRIBUTING</span>
          )}
        </div>
        <span className={`${styles.instagramTag} ${styles.tag}`}>INSTAGRAM</span>
      </motion.div>

      {/* Subtitle and Paragraph with typing */}
      <motion.div
        className={`${styles.bottomBlock} phone-responsive-bottombox`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
        style={{ marginBottom: 0 }}
      >
        <h2 className={styles.subtitle}>
          NOT JUST DIGITAL <br /> CHARACTERS, BUT <br /> SOMETHING MORE
        </h2>
        <p className={styles.bottomText} style={{ whiteSpace: "pre-line" }}>
          {typedBottom}
        </p>
      </motion.div>
    </section>
  );
}
