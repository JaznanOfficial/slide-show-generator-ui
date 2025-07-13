"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Loader2, Sparkles, Zap, Target, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useProgress } from "@/lib/progress-context";

// Mock chat messages with dynamic content
const mockMessages = [
  { type: "user", message: "Create a presentation about our startup" },
  {
    type: "bot",
    message: "Getting things ready...",
    dynamic: true,
  },
];

interface DynamicMessageProps {
  message: string;
  isTyping: boolean;
  isComplete: boolean;
}

function DynamicMessage({
  message,
  isTyping,
  isComplete,
}: DynamicMessageProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isTyping && !isComplete) {
      setIsAnimating(true);
      setDisplayedText("");
      setCurrentIndex(0);

      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= message.length) {
            setIsAnimating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(message);
      setIsAnimating(false);
    }
  }, [message, isTyping, isComplete]);

  useEffect(() => {
    setDisplayedText(message.slice(0, currentIndex));
  }, [currentIndex, message]);

  return (
    <div className="flex items-center gap-2">
      <span>{displayedText}</span>
      {isAnimating && !isComplete && (
        <span className="inline-block w-2 h-4 bg-slate-600 animate-pulse" />
      )}
    </div>
  );
}

export default function ChatHistory() {
  const { currentMessage, progress } = useProgress();
  const [typingMessages, setTypingMessages] = useState<Set<number>>(new Set());
  const isComplete = progress >= 100;

  useEffect(() => {
    // Simulate real-time typing for the single bot message
    const botMessageIndex = 1; // The bot message is at index 1

    if (!isComplete) {
      // Start typing immediately
      setTypingMessages((prev) => new Set(prev).add(botMessageIndex));
    } else {
      // Remove typing state when complete
      setTypingMessages((prev) => {
        const newSet = new Set(prev);
        newSet.delete(botMessageIndex);
        return newSet;
      });
    }
  }, [isComplete]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
          Chat History
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Your conversation with AI assistant
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {mockMessages.map((msg, index) => {
            const isTyping = typingMessages.has(index);
            const dynamicMessage = index === 1 ? currentMessage : msg.message;

            return (
              <div key={index} className="flex gap-2 sm:gap-3">
                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                  <AvatarFallback
                    className={
                      msg.type === "user" ? "bg-blue-100" : "bg-purple-100"
                    }
                  >
                    {msg.type === "user" ? (
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-medium text-slate-900">
                      {msg.type === "user" ? "You" : "AI Assistant"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {msg.type === "user" ? "2m ago" : "1m ago"}
                    </span>
                    {msg.type === "bot" && isTyping && !isComplete && (
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-2 h-2 sm:w-3 sm:h-3 animate-spin text-purple-600" />
                        <span className="text-xs text-purple-600">
                          typing...
                        </span>
                      </div>
                    )}
                    {msg.type === "bot" && isComplete && (
                      <div className="flex items-center gap-1">
                        <Check className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" />
                        <span className="text-xs text-green-600">done</span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm ${
                      msg.type === "user"
                        ? "bg-blue-50 text-blue-900 border border-blue-200"
                        : "bg-slate-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {msg.type === "bot" && msg.dynamic ? (
                      <DynamicMessage
                        message={dynamicMessage}
                        isTyping={isTyping}
                        isComplete={isComplete}
                      />
                    ) : (
                      msg.message
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Status */}
      <div className="p-3 sm:p-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isComplete ? "bg-green-500" : "bg-green-500 animate-pulse"
            }`}
          />
          {isComplete ? (
            <span className="text-green-600">
              Presentation ready for download!
            </span>
          ) : (
            <span>AI is generating your presentation...</span>
          )}
        </div>
      </div>
    </div>
  );
}
