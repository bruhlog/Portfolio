import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import Script from "next/script";


export const metadata: Metadata = {
  title: "Zaid | Freelance Full-Stack Developer",
  description:
    "I help startups and businesses build fast, scalable web & mobile applications using modern technologies.",
  keywords: [
    "Freelance Developer",
    "Next.js Developer",
    "React Developer",
    "Full Stack Developer",
    "Firebase Developer",
  ],
  authors: [{ name: "Zaid" }],
  openGraph: {
    title: "Zaid | Freelance Full-Stack Developer",
    description:
      "Modern, scalable web & mobile apps built with React, Next.js, Firebase & Android.",
    url: "https://yourdomain.com",
    siteName: "Zaid Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Zaid Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaid | Freelance Developer",
    description:
      "Hire a modern full-stack developer for your next product.",
    images: ["/profile.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white transition-colors duration-300">
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
