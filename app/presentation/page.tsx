"use client";

import { useState, useEffect } from "react";
import ChatHistory from "@/components/ChatHistory";
import SlidePreview from "@/components/SlidePreview";
import ProgressMessage from "@/components/ProgressMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProgressProvider, useProgress } from "@/lib/progress-context";

// Mock slide data
const mockSlides = [
  {
    title: "Welcome to Our Presentation",
    content:
      "An introduction to our innovative solutions and vision for the future.",
  },
  {
    title: "Problem Statement",
    content:
      "Identifying key challenges in the current market landscape and user pain points.",
  },
  {
    title: "Our Solution",
    content:
      "Revolutionary approach combining AI technology with user-centered design principles.",
  },
  {
    title: "Market Analysis",
    content:
      "Comprehensive research showing significant opportunities in the target market.",
  },
  {
    title: "Technology Stack",
    content:
      "Cutting-edge technologies powering our platform: React, Node.js, AI/ML, Cloud Infrastructure.",
  },
  {
    title: "Business Model",
    content:
      "Sustainable revenue streams through subscription services and enterprise partnerships.",
  },
  {
    title: "Competitive Advantage",
    content:
      "Unique value propositions that set us apart from existing market solutions.",
  },
  {
    title: "Growth Strategy",
    content:
      "Scalable approach to market expansion and customer acquisition strategies.",
  },
  {
    title: "Financial Projections",
    content:
      "Conservative estimates showing strong ROI and sustainable growth trajectory.",
  },
  {
    title: "Next Steps",
    content:
      "Clear roadmap for implementation, milestones, and future development phases.",
  },
];

function PresentationContent() {
  const router = useRouter();
  const { setProgress } = useProgress();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [renderedSlideCount, setRenderedSlideCount] = useState(0);

  useEffect(() => {
    // Start rendering immediately
    if (renderedSlideCount === 0) {
      setRenderedSlideCount(1);
    } else if (renderedSlideCount < mockSlides.length) {
      const timer = setTimeout(() => {
        setRenderedSlideCount((prev) => prev + 1);
      }, 2000); // 2 seconds between slides

      return () => clearTimeout(timer);
    } else {
      // All slides rendered
      setIsGenerating(false);
    }
  }, [renderedSlideCount]);

  // Auto-scroll to the latest slide
  useEffect(() => {
    if (renderedSlideCount > 0) {
      const slidePreview = document.querySelector(".slide-preview-container");
      const parentContainer = document.querySelector(".col-span-9");
      const target = slidePreview || parentContainer;
      if (target) {
        target.scrollTo({
          top: target.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [renderedSlideCount]);

  // Auto-scroll to bottom after each render
  useEffect(() => {
    if (renderedSlideCount > 0) {
      setTimeout(() => {
        const slidePreview = document.querySelector(".slide-preview-container");
        const parentContainer = document.querySelector(".col-span-9");
        const target = slidePreview || parentContainer;
        if (target) {
          target.scrollTo({
            top: target.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100); // Small delay to ensure the slide is rendered
    }
  }, [renderedSlideCount]);

  // Auto-scroll during generation
  useEffect(() => {
    if (isGenerating && renderedSlideCount > 0) {
      setTimeout(() => {
        const parentContainer = document.querySelector(".col-span-9");
        if (parentContainer) {
          parentContainer.scrollTo({
            top: parentContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 200); // Slightly longer delay for generation
    }
  }, [renderedSlideCount, isGenerating]);

  const progress = (renderedSlideCount / mockSlides.length) * 100;

  // Update the shared progress when it changes
  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  const handleDownload = () => {
    // Create HTML content for the presentation with professional design
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Presentation</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: #f8fafc; 
            padding: 20px;
            line-height: 1.6;
        }
        .slide { 
            background: white; 
            margin: 40px auto; 
            max-width: 900px; 
            border-radius: 16px; 
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
            border: 1px solid #e2e8f0;
            page-break-after: always;
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .slide::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom right, #f8fafc, #f1f5f9, #e2e8f0);
            opacity: 0.5;
            pointer-events: none;
        }
        .slide-header {
            padding: 32px;
            color: white;
            position: relative;
            flex-shrink: 0;
        }
        .slide-header h1 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 12px;
            line-height: 1.2;
        }
        .slide-header .dots {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        .slide-header .dot {
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
        }
        .slide-header .dot:nth-child(1) { width: 12px; height: 12px; }
        .slide-header .dot:nth-child(2) { width: 8px; height: 8px; background: rgba(255,255,255,0.2); }
        .slide-header .dot:nth-child(3) { width: 4px; height: 4px; background: rgba(255,255,255,0.1); }
        .slide-header .accent-line {
            width: 80px;
            height: 4px;
            background: rgba(255,255,255,0.4);
            border-radius: 2px;
        }
        .slide-number {
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(8px);
            border-radius: 8px;
            padding: 8px 16px;
            text-align: center;
        }
        .slide-number .current {
            font-size: 14px;
            font-weight: 500;
        }
        .slide-number .total {
            font-size: 12px;
            opacity: 0.8;
        }
        .slide-content {
            padding: 32px;
            position: relative;
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .slide-content p {
            color: #334155;
            font-size: 24px;
            line-height: 1.7;
            font-weight: 500;
            max-width: 800px;
            text-align: center;
        }
        .slide-footer {
            background: linear-gradient(to right, #f8fafc, #f1f5f9);
            border-top: 1px solid #e2e8f0;
            padding: 16px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            flex-shrink: 0;
        }
        .footer-left {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .footer-dot {
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
        }
        .footer-text {
            font-size: 14px;
            font-weight: 500;
            color: #334155;
        }
        .footer-divider {
            width: 1px;
            height: 16px;
            background: #cbd5e1;
        }
        .footer-subtitle {
            font-size: 12px;
            color: #64748b;
        }
        .footer-status {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
        .status-text {
            font-size: 12px;
            font-weight: 500;
        }
        .corner-accent {
            position: absolute;
            top: 0;
            right: 0;
            width: 96px;
            height: 96px;
            border-radius: 0 0 0 100%;
        }
        @media print { 
            body { background: white; padding: 0; } 
            .slide { box-shadow: none; margin: 0; page-break-after: always; }
        }
        @page {
            margin: 0.5in;
        }
    </style>
</head>
<body>
    ${mockSlides
      .map((slide, index) => {
        const gradients = [
          { from: "#10b981", via: "#14b8a6", to: "#06b6d4" },
          { from: "#8b5cf6", via: "#ec4899", to: "#f43f5e" },
          { from: "#3b82f6", via: "#6366f1", to: "#8b5cf6" },
          { from: "#f97316", via: "#ef4444", to: "#ec4899" },
          { from: "#22c55e", via: "#10b981", to: "#14b8a6" },
          { from: "#8b5cf6", via: "#a855f7", to: "#d946ef" },
          { from: "#f59e0b", via: "#f97316", to: "#ef4444" },
          { from: "#06b6d4", via: "#3b82f6", to: "#6366f1" },
          { from: "#f43f5e", via: "#ec4899", to: "#a855f7" },
          { from: "#84cc16", via: "#22c55e", to: "#10b981" },
        ];
        const gradient = gradients[index % gradients.length];

        return `
    <div class="slide">
        <div class="slide-header" style="background: linear-gradient(to right, ${
          gradient.from
        }, ${gradient.via}, ${gradient.to});">
            <div class="dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <h1>${slide.title}</h1>
            <div class="accent-line"></div>
            <div class="slide-number">
                <div class="current">Slide ${index + 1}</div>
                <div class="total">of ${mockSlides.length}</div>
            </div>
            <div class="corner-accent" style="background: linear-gradient(to bottom left, ${
              gradient.from
            }33, transparent);"></div>
        </div>
        <div class="slide-content">
            <p>${slide.content}</p>
        </div>
        <div class="slide-footer">
            <div class="footer-left">
                <div class="footer-dot"></div>
                <span class="footer-text">AI Generated</span>
                <div class="footer-divider"></div>
                <span class="footer-subtitle">Professional Presentation</span>
            </div>
            <div class="footer-status">
                <div class="status-dot" style="background: #10b981;"></div>
                <span class="status-text" style="color: #059669;">Generated</span>
            </div>
        </div>
    </div>
    `;
      })
      .join("")}
</body>
</html>`;

    // Create and download the file
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>

          <h1 className="text-xl font-semibold text-slate-900">
            Presentation Generator
          </h1>

          {!isGenerating && (
            <Button
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Presentation
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* Left Column - Chat History (3 columns) - Fixed */}
          <div className="col-span-3">
            <Card className="h-full sticky top-6">
              <ChatHistory />
            </Card>
          </div>

          {/* Right Column - Slide Preview (9 columns) - Scrollable */}
          <div className="col-span-9 overflow-y-auto">
            <Card className="h-full p-6 relative overflow-hidden">
              {isGenerating ? (
                <div className="h-full relative">
                  {/* Background slides with minimal blur effect */}
                  <div className="absolute inset-0 blur-[1px] opacity-30">
                    <SlidePreview
                      slides={mockSlides}
                      renderedCount={renderedSlideCount - 1}
                      showAll={false}
                    />
                  </div>

                  {/* Latest slide - clear and visible */}
                  <div className="absolute inset-0 slide-preview-container">
                    <SlidePreview
                      slides={mockSlides}
                      renderedCount={renderedSlideCount}
                      showAll={false}
                    />
                  </div>

                  {/* Progress message overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-sm">
                    <ProgressMessage
                      progress={progress}
                      currentSlide={renderedSlideCount}
                    />
                  </div>
                </div>
              ) : (
                <div className="slide-preview-container h-full">
                  <SlidePreview
                    slides={mockSlides}
                    renderedCount={renderedSlideCount}
                    showAll={true}
                  />
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PresentationPage() {
  return (
    <ProgressProvider>
      <PresentationContent />
    </ProgressProvider>
  );
}
