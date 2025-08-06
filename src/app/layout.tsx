import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientNeuralBackground } from "@/components/ClientNeuralBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cameron Brady",
  description: "Interdisciplinary CS graduate from Cornell, developing ML solutions for neurological disorders and creating full-stack applications that make real-world impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Neural Background - client-side only */}
        <ClientNeuralBackground />
      </body>
    </html>
  );
}
