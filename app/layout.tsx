// app/layout.tsx
// Navbar removed from root layout — home page is fully minimal.
// About, Projects, and Contact pages include their own navbar.

import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#020205" }}>
        {children}
      </body>
    </html>
  );
}
