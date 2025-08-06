"use client";
import { NeuralBackground } from "@/features/neural-background";
import { useEffect, useState } from "react";

export function ClientNeuralBackground() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on the server to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 w-full h-full z-0 opacity-80 blur-[0.1px]">
      <NeuralBackground />
    </div>
  );
}
