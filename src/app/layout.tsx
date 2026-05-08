import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/ui/chatbot";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hekahub",
  description: "AI-powered learning for ages 10-15. Build real projects, master new skills, and launch your future with Hekahub.",
  icons: {
    icon: "/HekaHub_Icon-trans.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
