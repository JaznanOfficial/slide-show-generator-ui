"use client";

import { Loader2, Sparkles, Zap, Target } from "lucide-react";
import { useProgress } from "@/lib/progress-context";
import { useEffect } from "react";

interface ProgressMessageProps {
  progress: number;
  currentSlide: number;
}

export default function ProgressMessage({
  progress,
  currentSlide,
}: ProgressMessageProps) {
  const { setCurrentMessage } = useProgress();

  const getMessageAndIcon = (progress: number) => {
    if (progress === 0)
      return { message: "Getting things ready...", icon: Loader2 };
    if (progress <= 20)
      return { message: "Analyzing your requirements...", icon: Target };
    if (progress <= 40)
      return { message: "Designing slide layouts...", icon: Sparkles };
    if (progress <= 60)
      return { message: "Creating compelling content...", icon: Zap };
    if (progress <= 80)
      return { message: "Adding professional touches...", icon: Sparkles };
    if (progress < 100) return { message: "Almost there...", icon: Loader2 };
    return { message: "Presentation ready!", icon: Sparkles };
  };

  const { message, icon: Icon } = getMessageAndIcon(progress);

  // Update the shared message when progress changes
  useEffect(() => {
    setCurrentMessage(message);
  }, [message, setCurrentMessage]);

  return (
    <div className="text-center max-w-md mx-auto px-4">
      <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
        <Icon
          className={`w-6 h-6 sm:w-8 sm:h-8 text-primary ${
            progress < 100 ? "animate-spin" : "animate-pulse"
          }`}
        />
      </div>

      <p className="text-base sm:text-lg font-bold text-slate-600 mb-3 sm:mb-4">
        {message}
      </p>

      {progress < 100 && currentSlide > 0 && (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Generated {currentSlide} of 10 slides</span>
        </div>
      )}

      {progress === 100 && (
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-green-600">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>All slides ready for download!</span>
        </div>
      )}
    </div>
  );
}
