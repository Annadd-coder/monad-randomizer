"use client";

import Head from "next/head";
import { useState } from "react";

export default function Home() {
    // Список изображений и фраз
    const images = Array.from({ length: 20 }, (_, i) => `/images/image${i + 1}.jpg`);
    const phrases = [
        "You are a leader of ideas today!",
        "A day for peace and reflection.",
        "Your potential is at its peak today.",
        "Today, you inspire everyone around you.",
        "Be yourself and brighten the world!",
        "Every step today leads to success.",
        "Perfect day for new ideas!",
        "You are a shining star in this world.",
        "Your positivity is contagious today!",
        "Stay confident: you're on the right path.",
        "Today, your creativity knows no bounds.",
        "You are unstoppable today!",
        "A great day to achieve your dreams.",
        "Share your wisdom with the world today.",
        "Focus and conquer challenges today.",
        "You are the architect of your success.",
        "Your energy today is truly magnetic.",
        "Lead by example and inspire others.",
        "A day for bold decisions and actions.",
        "Celebrate your uniqueness today!"
    ];

    // Состояние для случайных значений
    const [randomIndex, setRandomIndex] = useState(null);

    const handleRandomize = () => {
        const index = Math.floor(Math.random() * images.length);
        setRandomIndex(index);
    };

    const selectedImage = randomIndex !== null ? images[randomIndex] : null;
    const selectedPhrase = randomIndex !== null ? phrases[randomIndex] : null;

    const shareText = selectedPhrase
        ? `Today, I am in Monad: "${selectedPhrase}".`
        : "";

    return (
        <div
            style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#836EF9", // Фиолетовый фон
                color: "#FFFFFF", // Белый текст
                minHeight: "100vh", // Высота экрана
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Head>
                <title>Monad Randomizer</title>
                {selectedImage && (
                    <>
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content="Monad Randomizer" />
                        <meta name="twitter:description" content={shareText} />
                        <meta name="twitter:image" content={`https://monad-randomizer.vercel.app${selectedImage}`} />
                        <meta name="og:title" content="Monad Randomizer" />
                        <meta name="og:description" content={shareText} />
                        <meta name="og:image" content={`https://monad-randomizer.vercel.app${selectedImage}`} />
                    </>
                )}
            </Head>
            <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Who are you today in Monad?</h1>
            {selectedImage ? (
                <>
                    <img src={selectedImage} alt="Monad" style={{ maxWidth: "300px", borderRadius: "10px", marginTop: "20px" }} />
                    <p style={{ fontSize: "20px", marginTop: "10px" }}>{selectedPhrase}</p>
                    <a
                        href={`https://x.com/intent/tweet?text=${encodeURIComponent(
                            shareText
                        )}&url=https://monad-randomizer.vercel.app&hashtags=Monad`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            marginTop: "20px",
                            backgroundColor: "#FFFFFF",
                            color: "#836EF9",
                            borderRadius: "5px",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "16px",
                        }}
                    >
                        Share on X
                    </a>
                </>
            ) : (
                <>
                    <button
                        onClick={handleRandomize}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#FFFFFF",
                            color: "#836EF9",
                            borderRadius: "5px",
                            border: "none",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            marginTop: "20px",
                        }}
                    >
                        Randomize
                    </button>
                    <p style={{ marginTop: "50px", fontSize: "16px" }}>
                        Created by Annad with love for the Monad community
                    </p>
                </>
            )}
        </div>
    );
}