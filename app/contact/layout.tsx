import type { Metadata } from "next";
import { getSocialMetadata } from "@/lib/metadata";

const description = "Contact me about software engineering placements, professional opportunities, my projects or technology. I am seeking a 2027/2028 placement.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  ...getSocialMetadata({ title: "Contact | Daniels Bunka", description, url: "/contact" }),
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
