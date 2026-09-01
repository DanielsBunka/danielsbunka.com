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
const title = "Daniels Bunka | Portfolio";
const description = "Portfolio of Daniels Bunka, a Computer Science student at Liverpool John Moores University, featuring software, web, AI and self-hosting projects.";

export const metadata: Metadata = {
  metadataBase: new URL("https://danielsbunka.com"),
  title: {
    default: title,
    template: "%s | Daniels Bunka",
  },
  description,
  applicationName: "Daniels Bunka",
  authors: [{ name: "Daniels Bunka" }],
  creator: "Daniels Bunka",
  robots: { index: false, follow: true },
  ...getSocialMetadata({ title, description, url: "/" }),
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
