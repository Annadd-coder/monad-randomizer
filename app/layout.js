// app/layout.js
import Head from "next/head";
import "./global.css";

export const metadata = {
  title: "monadviber - Collectible Vibes",
  description: "Welcome to the world of collectible Monad vibes!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="monadviber - Collectible Vibes" />
        <meta name="twitter:description" content="Discover your vibe card for today!" />
        <meta name="twitter:image" content="https://monad-random.vercel.app/images/image1.jpg" />
      </Head>
      <body>
        <div className="mysticOverlay"></div>
        {children}
      </body>
    </html>
  );
}