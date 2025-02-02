// app/components/CommunityLinks.js
"use client";

import styles from "../styles.module.css";

export default function CommunityLinks() {
  return (
    <div className={styles.communityBlock}>
      <p className={styles.communityHeading}>Join the Monad Community</p>
      <div className={styles.communityLinks}>
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