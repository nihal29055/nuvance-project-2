"use client";
import styles from "../app/contributing.module.css";
import { Rock_Salt } from "next/font/google";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const rockSalt = Rock_Salt({ subsets: ["latin"], weight: "400" });

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

function useTypingEffect(text: string, speed = 30) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

export default function ContributingPage() {
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

  const typedBottom = useTypingEffect(bottomParagraphText, 20);

  return (
    <section className={styles.wrapper}>
      {/* Top Left Paragraph */}
      <motion.p
        className={`${styles.topText} phone-responsive-toptext`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        THE ORIGINS OF OUR PROJECT <br />
        GO BACK TO THE DARKEST <br />
        TIMES – THE TIMES OF WAR, <br />
        WHEN MANY ANIMALS WERE <br />
        LEFT HOMELESS. THIS <br />
        HELPLESSNESS AND PAIN THAT <br />
        WE FELT FOR THE ANIMALS <br />
        SPURRED US TO ACTION.
      </motion.p>

      {/* Big Title */}
      <motion.div
        className={`${styles.titleBlock} phone-responsive-titleblock`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <span className={`${styles.discordTag} ${styles.tag}`}>DISCORD</span>
        <h1 className={`${styles.title} ${rockSalt.className}`}>
          WAY OF <span className={styles.twitterTag}>TWITTER</span> CONTRIBUTING
        </h1>
        <span className={`${styles.instagramTag} ${styles.tag}`}>INSTAGRAM</span>
      </motion.div>

      {/* Subtitle and Paragraph */}
      <motion.div
        className={`${styles.bottomBlock} phone-responsive-bottombox`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={fadeUp}
      >
        <h2 className={styles.subtitle}>
          NOT JUST DIGITAL <br /> CHARACTERS, BUT <br /> SOMETHING MORE
        </h2>
        <p className={styles.bottomText}>
          {typedBottom}
        </p>
      </motion.div>
    </section>
  );
}
