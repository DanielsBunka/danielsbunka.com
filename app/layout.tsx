// app/layout.tsx

// Allows for browser meta data
import type { Metadata } from "next";
// Imports Fonts from fonts.google.com
import {JetBrains_Mono} from "next/font/google";
// Imports my CSS file
import "./globals.css";

// Set the fonts as variables
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "Daniels Bunka | Portfolio",
  description: "CS Student at LJMU and Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Injects the variables into the HTML tag so globals.css can see them
    <html lang="en" className={`${jetbrainsMono.variable}`} data-scroll-behavior="smooth">
        <body className="antialiased">
          {children}
        </body>
    </html>
  );
}
