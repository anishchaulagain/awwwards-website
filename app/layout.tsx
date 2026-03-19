import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ANISH Chrono X1 — Time, Perfected",
  description:
    "Discover the ANISH Chrono X1: a mechanical masterpiece engineered for precision and presence. Explore the craftsmanship, movement, and materials behind this ultra-luxury timepiece.",
  keywords: [
    "luxury watch",
    "ANISH",
    "Chrono X1",
    "mechanical watch",
    "horology",
    "premium timepiece",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${montserrat.variable} antialiased`} style={{ fontFamily: "var(--font-montserrat)" }}>
        {children}
      </body>
    </html>
  );
}
