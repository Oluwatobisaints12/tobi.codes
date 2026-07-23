import type { Metadata } from "next";
import { ampherFont, objectSansFont, neueMachinaFont } from "@/app/assets/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "T.Code | Full-Stack & Mobile Developer Portfolio",
  description: "Full-stack & mobile developer based in Lagos, Nigeria. Building digital experiences with Next.js, React Native, and Node.js.",
  keywords: ["T.Code", "Developer Lagos", "Full-Stack Developer", "React Native", "Next.js Portfolio", "TypeScript"],
  authors: [{ name: "T.Code" }],
  openGraph: {
    title: "T.Code | Full-Stack & Mobile Developer Portfolio",
    description: "Full-stack & mobile developer based in Lagos, Nigeria. Building digital experiences with Next.js, React Native, and Node.js.",
    url: "https://tcode.dev",
    siteName: "T.Code Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "T.Code | Full-Stack & Mobile Developer Portfolio",
    description: "Full-stack & mobile developer based in Lagos, Nigeria. Building digital experiences with Next.js, React Native, and Node.js.",
    creator: "@TCode",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ampherFont.variable} ${objectSansFont.variable} ${neueMachinaFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[#0F0F0F] text-[#F5F5F5] font-neue-machina selection:bg-[#42A5F5]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

