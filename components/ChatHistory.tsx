"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Loader2, Sparkles, Zap, Target } from "lucide-react";
import { useState, useEffect } from "react";

// Mock chat messages with dynamic content
const mockMessages = [
  { type: "user", message: "Create a presentation about our startup" },
  {
    type: "bot",
    message: "Analyzing your requirements...",
    dynamic: true,
  },
];

// Dynamic message variations for real-time effect
const dynamicMessages = [
  "Analyzing your requirements...",
  "Designing slide layouts...",
  "Creating compelling content...",
  "Adding professional touches...",
  "Almost there...",
  "Presentation ready!",
];

interface DynamicMessageProps {
  message: string;
  isTyping: boolean;
}

function DynamicMessage({ message, isTyping }: DynamicMessageProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isTyping) {
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
  }, [message, isTyping]);

  useEffect(() => {
    setDisplayedText(message.slice(0, currentIndex));
  }, [currentIndex, message]);

  return (
    <div className="flex items-center gap-2">
      <span>{displayedText}</span>
      {isAnimating && (
        <span className="inline-block w-2 h-4 bg-slate-600 animate-pulse" />
      )}
    </div>
  );
}

export default function ChatHistory() {
  const [typingMessages, setTypingMessages] = useState<Set<number>>(new Set());
  const [dynamicContent, setDynamicContent] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    // Simulate real-time typing for the single bot message
    const botMessageIndex = 1; // The bot message is at index 1

    // Start typing immediately
    setTypingMessages((prev) => new Set(prev).add(botMessageIndex));

    // Simulate dynamic content changes
    const messageVariations = [
      "Analyzing your requirements...",
      "Designing slide layouts...",
      "Creating compelling content...",
      "Adding professional touches...",
      "Almost there...",
      "Ready!",
    ];

    let variationIndex = 0;
    const contentInterval = setInterval(() => {
      setDynamicContent((prev) => ({
        ...prev,
        [botMessageIndex]:
          messageVariations[variationIndex % messageVariations.length],
      }));
      variationIndex++;
    }, 2000);

    // Keep the typing animation going continuously
    return () => clearInterval(contentInterval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Chat History
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Your conversation with AI assistant
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg, index) => {
            const isTyping = typingMessages.has(index);
            const dynamicMessage = dynamicContent[index] || msg.message;

            return (
              <div key={index} className="flex gap-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback
                    className={
                      msg.type === "user" ? "bg-blue-100" : "bg-purple-100"
                    }
                  >
                    {msg.type === "user" ? (
                      <User className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Bot className="w-4 h-4 text-purple-600" />
                    )}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-900">
                      {msg.type === "user" ? "You" : "AI Assistant"}
                    </span>
                    <span className="text-xs text-slate-500">
                      {msg.type === "user" ? "2m ago" : "1m ago"}
                    </span>
                    {msg.type === "bot" && isTyping && (
                      <div className="flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin text-purple-600" />
                        <span className="text-xs text-purple-600">
                          typing...
                        </span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-lg text-sm ${
                      msg.type === "user"
                        ? "bg-blue-50 text-blue-900 border border-blue-200"
                        : "bg-slate-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {msg.type === "bot" && msg.dynamic ? (
                      <DynamicMessage
                        message={dynamicMessage}
                        isTyping={isTyping}
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
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          AI is generating your presentation...
        </div>
      </div>
    </div>
  );
}
