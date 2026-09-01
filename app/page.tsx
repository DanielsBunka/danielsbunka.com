import type { Metadata } from "next";
import HomePage from "./HomePage";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function Home() {
  return <HomePage />;
}
