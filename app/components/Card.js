// app/components/Card.js
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "../styles.module.css";

export default function Card({ imageSrc, phrase, animationClass }) {
  return (
    <motion.div
      className={`${styles.card} ${animationClass}`}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Image
        src={imageSrc}
        alt="Card"
        width={320}
        height={375} // 75% от 500px
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>{phrase}</div>
    </motion.div>
  );
}