// app/layout.tsx

// Allows for browser meta data
import type { Metadata } from "next";
// Imports Fonts from fonts.google.com
import {JetBrains_Mono} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { getSocialMetadata } from "@/lib/metadata";
// Imports my CSS file
import "./globals.css";

// Set the fonts as variables
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const description = "Computer Science student at Liverpool John Moores University showcasing projects in Python, AI, web development, Docker, networking and self-hosting.";

export const metadata: Metadata = {
  metadataBase: new URL("https://danielsbunka.com"),
  title: {
    default: "Portfolio | Daniels Bunka",
    template: "%s | Daniels Bunka",
  },
  description,
  applicationName: "Daniels Bunka Portfolio",
  authors: [{ name: "Daniels Bunka" }],
  creator: "Daniels Bunka",
  alternates: { canonical: "/" },
  ...getSocialMetadata({ title: "Portfolio | Daniels Bunka", description, url: "/" }),
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
          <Analytics />
        </body>
    </html>
  );
}
