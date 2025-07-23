"use client";

import dynamic from "next/dynamic";

// Dynamically import NeuralBackground with SSR disabled to prevent hydration errors
const NeuralBackground = dynamic(() => import("./NeuralBackground"), {
  ssr: false,
  loading: () => null,
});

export function ClientNeuralBackground() {
  return <NeuralBackground />;
} 