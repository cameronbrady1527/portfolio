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
  icons: {
    icon: [
      { 
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='80'>🧠</text></svg>",
        type: 'image/svg+xml'
      }
    ],
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='80'>🧠</text></svg>"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50' y='50' text-anchor='middle' dominant-baseline='central' font-size='80'>🧠</text></svg>" />
      </head>
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
