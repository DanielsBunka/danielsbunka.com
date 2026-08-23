import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact me about software engineering placements, professional opportunities, my projects or technology. I am seeking a 2027/2028 placement.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
