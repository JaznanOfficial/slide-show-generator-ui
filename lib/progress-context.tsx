"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProgressContextType {
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [currentMessage, setCurrentMessage] = useState(
    "Getting things ready..."
  );
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider
      value={{ currentMessage, setCurrentMessage, progress, setProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
