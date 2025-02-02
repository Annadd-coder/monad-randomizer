// app/vibes/page.js
"use client";

import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import styles from "../styles.module.css";

const POINTS_PER_LEVEL = 10;

export default function VibesPage() {
  const [inspirationCount, setInspirationCount] = useState(0);
  const [mintHistory, setMintHistory] = useState([]);

  useEffect(() => {
    const storedCount = localStorage.getItem("inspirationCount");
    if (storedCount) {
      setInspirationCount(parseInt(storedCount, 10));
    }
    const storedHistory = localStorage.getItem("mintHistory");
    if (storedHistory) {
      setMintHistory(JSON.parse(storedHistory));
    }
  }, []);

  const inspirationLevel = Math.floor(inspirationCount / POINTS_PER_LEVEL);
  const pointsToNextLevel = POINTS_PER_LEVEL - (inspirationCount % POINTS_PER_LEVEL);

  return (
    <div className={styles.container} style={{ paddingBottom: "4rem" }}>
      <Toaster position="top-right" />
      <div className={styles.projectName}>monadviber</div>
      <button
        className={styles.actionButton}
        style={{ position: "absolute", top: "20px", right: "20px" }}
        onClick={() => (window.location.href = "/generate")}
      >
        Back to Mint
      </button>
      <div className={styles.contentWrapper}>
        <h1 className={styles.header}>Your Collected Cards</h1>
        <div className={styles.vibesLevelBox}>
          <p className={styles.levelText}>Level: {inspirationLevel}</p>
          <p className={styles.levelText}>Total Cards: {inspirationCount}</p>
          <div className={styles.progressBarContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${((POINTS_PER_LEVEL - pointsToNextLevel) / POINTS_PER_LEVEL) * 100}%`,
                }}
              />
            </div>
            <p style={{ marginTop: "10px", color: "#fff" }}>
              {pointsToNextLevel} more card(s) to reach the next level
            </p>
          </div>
        </div>
        {mintHistory.length === 0 ? (
          <p style={{ color: "#fff", fontSize: "1.2rem" }}>No minted cards yet.</p>
        ) : (
          <div className={styles.vibesGrid}>
            {mintHistory.map((item, idx) => (
              <div key={idx} className={styles.vibeItem}>
                <img src={item.image} alt="Card" className={styles.vibeImage} />
                <p className={styles.vibePhrase}>{item.phrase}</p>
                <p style={{ fontSize: "0.5rem", marginTop: "32px", color: "#fff" }}>
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.communityBlock} style={{ marginTop: "4rem" }}>
        <a href="https://discord.com/invite/monad" target="_blank" rel="noopener noreferrer">
          Discord
        </a>
        <a href="https://www.monad.xyz/" target="_blank" rel="noopener noreferrer">
          Website
        </a>
        <a href="https://x.com/monad_xyz" target="_blank" rel="noopener noreferrer">
          X (Twitter)
        </a>
      </div>
    </div>
  );
}