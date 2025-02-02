// app/page.js
"use client";

import { useState } from "react";
import { ethers } from "ethers";
import Image from "next/image";
import styles from "./styles.module.css";

export default function HomePage() {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Crypto wallet not found! Please install MetaMask.");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      await signer.getAddress();
      setWalletConnected(true);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Название проекта в левом верхнем углу */}
      <div className={styles.projectName}>monadviber</div>
      <div className={styles.contentWrapper}>
        {/* Геройское изображение */}
        <div className={styles.heroImage}>
          <Image
            src="/images/girl-diamond.jpg"
            alt="Girl with a diamond"
            width={600}
            height={400}
            layout="responsive"
          />
        </div>
        <h1 className={styles.header}>
          Welcome to the world of Collectible Vibes!
        </h1>
        <p style={{ fontSize: "20px", marginBottom: "30px" }}>
          Connect your crypto wallet to start collecting unique vibe cards.
        </p>
        <button
          className={styles.actionButton}
          onClick={connectWallet}
          disabled={walletConnected}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>
        {walletConnected && (
          <a
            href="/generate"
            className={styles.actionButton}
            style={{ marginTop: "20px", display: "inline-block" }}
          >
            Proceed to Pull a Card
          </a>
        )}
      </div>
    </div>
  );
}