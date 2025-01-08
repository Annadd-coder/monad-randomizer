import Head from "next/head";

// Список изображений
const images = Array.from({ length: 20 }, (_, i) => `/images/image${i + 1}.jpg`);

// Список фраз
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

// Генерация случайной картинки и фразы на сервере
export async function getServerSideProps() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    const selectedPhrase = phrases[randomIndex];

    return {
        props: {
            selectedImage,
            selectedPhrase,
        },
    };
}

export default function Home({ selectedImage, selectedPhrase }) {
    const shareText = `Today, I am in Monad: "${selectedPhrase}".`;

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <Head>
                <title>Monad Randomizer</title>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Monad Randomizer" />
                <meta name="twitter:description" content={shareText} />
                <meta name="twitter:image" content={`https://monad-randomizer.vercel.app${selectedImage}`} />
                <meta name="og:title" content="Monad Randomizer" />
                <meta name="og:description" content={shareText} />
                <meta name="og:image" content={`https://monad-randomizer.vercel.app${selectedImage}`} />
            </Head>
            <h1>Who are you today in Monad?</h1>
            <img src={selectedImage} alt="Monad" style={{ maxWidth: "300px", borderRadius: "10px" }} />
            <p>{selectedPhrase}</p>
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
                    backgroundColor: "#836EF9",
                    color: "#FFFFFF",
                    borderRadius: "5px",
                    textDecoration: "none",
                    fontWeight: "bold",
                }}
            >
                Share on X
            </a>
        </div>
    );
}