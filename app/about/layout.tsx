import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn about my journey as a Computer Science student at LJMU, including my technical experience, interests and development as a software engineer.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
