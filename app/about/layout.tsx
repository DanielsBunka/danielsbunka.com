import type { Metadata } from "next";
import { getSocialMetadata } from "@/lib/metadata";

const description = "Learn about my journey as a Computer Science student at LJMU, including my technical experience, interests and development as a software engineer.";

export const metadata: Metadata = {
  title: "About Me",
  description,
  alternates: { canonical: "/about" },
  ...getSocialMetadata({ title: "About Me | Daniels Bunka", description, url: "/about" }),
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
