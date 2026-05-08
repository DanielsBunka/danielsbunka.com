import type { Metadata } from "next";
import Link from "next/link"; // Next.js's super-fast link tool
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
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#911111' }}>
        
        {/* --- YOUR GLOBAL NAVBAR --- */}
        <nav style={{ 
          backgroundColor: '#020205', 
          color: 'white', 
          padding: '15px 30px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>DB.</h2>
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* We use <Link> instead of <a> so the page doesn't blink when loading */}
            <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Home (Bot)</Link>
            <Link href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Me</Link>
            <Link href="/projects" style={{ color: 'white', textDecoration: 'none' }}>Projects</Link>
          </div>
        </nav>

        {/* This is where your individual pages (like page.tsx) get injected */}
        {children}

      </body>
    </html>
  );
}