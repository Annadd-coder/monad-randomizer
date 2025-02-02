// app/generate/page.js
"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { toast, Toaster } from "react-hot-toast";
import Card from "../components/Card";
import ActionButtons from "../components/ActionButtons";
import CommunityLinks from "../components/CommunityLinks";
import styles from "../styles.module.css";
import Confetti from "react-confetti";

const MYNFT_ADDRESS = "0x0D8e5ed789a5E717d557a592bd2b674ADa513583";
const MYNFT_ABI = [
  {
    inputs: [
      { internalType: "string", name: "_imageURI", type: "string" },
      { internalType: "string", name: "_phrase", type: "string" },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// 50 коротких фраз
const phrases = [
  "Unleash your potential.",
  "Embrace the moment.",
  "Seize the day.",
  "Dream. Believe. Achieve.",
  "Radiate positive energy.",
  "Be bold, be brave.",
  "Make it happen.",
  "Stay curious.",
  "Challenge your limits.",
  "Inspire and be inspired.",
  "Spark creativity.",
  "Create your destiny.",
  "Own your journey.",
  "Live with passion.",
  "Rise and shine.",
  "Stay focused.",
  "Chase your dreams.",
  "Transform your world.",
  "Believe in yourself.",
  "Dare to be different.",
  "Ignite your fire.",
  "Make moments count.",
  "Embrace uniqueness.",
  "Flow with life.",
  "Live your truth.",
  "Step into greatness.",
  "Feel the vibe.",
  "Your journey begins.",
  "Let your light shine.",
  "Empower your soul.",
  "The time is now.",
  "Keep pushing forward.",
  "Inspire action.",
  "Dream big, act bigger.",
  "Every step counts.",
  "Find your rhythm.",
  "Be your own hero.",
  "Fuel ambition.",
  "Spark change.",
  "Elevate your spirit.",
  "Break the mold.",
  "Challenge the norm.",
  "Seek new horizons.",
  "Make your mark.",
  "Unlock potential.",
  "Live boldly.",
  "Embody excellence.",
  "Savor the journey.",
  "Be limitless.",
  "Vibe with passion."
];

// Генерируем пути к 50 файлам: /images/image1.jpg … /images/image50.jpg
const images = Array.from({ length: 50 }, (_, i) => `/images/image${i + 1}.jpg`);

/** Алгоритм Фишера–Йетса для перемешивания массива */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GeneratePage() {
  // Индекс «выбранной» карты
  const [randomIndex, setRandomIndex] = useState(null);

  // Массив всех индексов (0..49), которые мы перемешаем
  const [shuffledIndices, setShuffledIndices] = useState([]);
  // Текущий указатель на элемент в shuffledIndices
  const [currentIdx, setCurrentIdx] = useState(0);

  const [isMinting, setIsMinting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  // При первом рендере создаём перемешанный массив из 50 индексов
  useEffect(() => {
    const initialIndices = Array.from({ length: phrases.length }, (_, i) => i);
    setShuffledIndices(shuffleArray(initialIndices));
  }, []);

  // Выбрать следующую карту из перемешанного списка
  const handlePull = () => {
    if (!shuffledIndices.length) return;

    // Если дошли до конца (все 50 были использованы), заново перемешать и вернуться к началу
    if (currentIdx >= shuffledIndices.length) {
      const newShuffled = shuffleArray(shuffledIndices);
      setShuffledIndices(newShuffled);
      setCurrentIdx(0);
    }

    // Выбираем индекс
    const newIdx = shuffledIndices[currentIdx];
    setRandomIndex(newIdx);
    setAnimationClass("flip");
    setCurrentIdx(currentIdx + 1);

    // Счётчик «сколько раз пользователь тянул карту»
    const currentCount = parseInt(localStorage.getItem("inspirationCount") || "0", 10);
    localStorage.setItem("inspirationCount", (currentCount + 1).toString());
  };

  const handleMint = async () => {
    if (randomIndex === null) {
      toast.error("Please pull a card first!");
      return;
    }
    if (!window.ethereum) {
      toast.error("Crypto wallet not found! Please install MetaMask.");
      return;
    }
    setIsMinting(true);

    const selectedImage = images[randomIndex];
    const selectedPhrase = phrases[randomIndex];

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(MYNFT_ADDRESS, MYNFT_ABI, signer);
      const tx = await contract.mintNFT(selectedImage, selectedPhrase);
      await tx.wait();
      toast.success("NFT minted successfully!");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setAnimationClass("reveal");

      // Сохраняем минтнутую карту в localStorage
      const mintedItem = {
        image: selectedImage,
        phrase: selectedPhrase,
        timestamp: Date.now(),
      };
      const oldHistory = JSON.parse(localStorage.getItem("mintHistory") || "[]");
      const newHistory = [mintedItem, ...oldHistory];
      localStorage.setItem("mintHistory", JSON.stringify(newHistory));

    } catch (error) {
      console.error("Mint error:", error);
      toast.error("Failed to mint NFT. Check console for details.");
    } finally {
      setIsMinting(false);
    }
  };

  const handleShare = async () => {
    if (randomIndex === null) {
      toast.error("Please pull a card first!");
      return;
    }

    const selectedImage = images[randomIndex];
    const selectedPhrase = phrases[randomIndex];

    // Позитивная «заряжающая» фраза
    const shareIntro = "Today, monadviber supercharged me with unstoppable positivity—";
    const baseUrl = "https://monad-random.vercel.app";
    const absoluteImageUrl = `${baseUrl}${selectedImage}`;
    const shareText = `${shareIntro}here's the vibe I pulled: "${selectedPhrase}"

Big thanks this week artist @Pugovka_Mari 
 @Anna272493 and @monad_xyz

 try: ${baseUrl} 

Check out this vibe card: ${absoluteImageUrl} 

#MonadVibes`;

    if (navigator.canShare && navigator.canShare({ files: [] })) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const file = new File([blob], "card.jpg", { type: blob.type });
        await navigator.share({
          title: "Your Vibe Card for Today",
          text: shareText,
          files: [file],
        });
        toast.success("Shared successfully!");
      } catch (error) {
        console.error("Share error:", error);
        toast.error("Sharing failed. Please try again.");
      }
    } else {
      window.open(
        `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        "_blank"
      );
    }
  };

  // Выбранное изображение и фраза
  const selectedImage = randomIndex !== null ? images[randomIndex] : null;
  const selectedPhrase = randomIndex !== null ? phrases[randomIndex] : null;

  return (
    <div className={styles.container}>
      <Head>
        <title>monadviber - Pull Your Card</title>
      </Head>
      <Toaster position="top-right" />
      <div className={styles.projectName}>monadviber</div>
      <button
        className={styles.actionButton}
        style={{ position: "absolute", top: "20px", right: "20px" }}
        onClick={() => (window.location.href = "/vibes")}
      >
        My Cards
      </button>

      <div className={styles.contentWrapper}>
        {selectedImage ? (
          <>
            <h1 className={styles.header}>Your Vibe Card for Today</h1>
            <div className={styles.imageContainer}>
              <Card
                imageSrc={selectedImage}
                phrase={selectedPhrase}
                animationClass={animationClass}
              />
            </div>
            <ActionButtons
              onShare={handleShare}
              onMint={handleMint}
              onPull={handlePull}
            />
            <CommunityLinks />
          </>
        ) : (
          <>
            <h1 className={styles.header}>Ready to get your card?</h1>
            <button onClick={handlePull} className={styles.actionButton}>
              Pull Your Card
            </button>
          </>
        )}
      </div>

      {showConfetti && <Confetti />}
    </div>
  );
}