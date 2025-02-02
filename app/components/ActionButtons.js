// app/components/ActionButtons.js
"use client";

import styles from "../styles.module.css";

export default function ActionButtons({ onShare, onMint, onPull }) {
  return (
    <div className={styles.buttonRow}>
      <a
        href="#"
        onClick={onShare}
        className={styles.actionButton}
      >
        Share
      </a>
      <button onClick={onMint} className={styles.actionButton} type="button">
        Mint NFT
      </button>
      <button onClick={onPull} className={styles.actionButton} type="button">
        Pull Your Card
      </button>
    </div>
  );
}