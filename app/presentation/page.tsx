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
      }, 3000); // 3 seconds between slides

      return () => clearTimeout(timer);
    } else {
      // All slides rendered
      setIsGenerating(false);
    }
  }, [renderedSlideCount]);

  const progress = (renderedSlideCount / mockSlides.length) * 100;

  // Update the shared progress when it changes
  useEffect(() => {
    setProgress(progress);
  }, [progress, setProgress]);

  const handleDownload = () => {
    // Create HTML content for the presentation
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Presentation</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f8fafc; }
        .slide { background: white; margin: 20px auto; padding: 40px; max-width: 800px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); page-break-after: always; }
        .slide h1 { color: #1e293b; font-size: 2.5rem; margin-bottom: 20px; }
        .slide p { color: #475569; font-size: 1.2rem; line-height: 1.6; }
        .slide-number { color: #94a3b8; font-size: 0.9rem; margin-top: 30px; }
        @media print { body { background: white; } .slide { box-shadow: none; margin: 0; } }
    </style>
</head>
<body>
    ${mockSlides
      .map(
        (slide, index) => `
    <div class="slide">
        <h1>${slide.title}</h1>
        <p>${slide.content}</p>
        <div class="slide-number">Slide ${index + 1} of ${
          mockSlides.length
        }</div>
    </div>
    `
      )
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
          {/* Left Column - Chat History (3 columns) */}
          <div className="col-span-3">
            <Card className="h-full">
              <ChatHistory />
            </Card>
          </div>

          {/* Right Column - Slide Preview (9 columns) */}
          <div className="col-span-9">
            <Card className="h-full p-6 relative overflow-hidden">
              {isGenerating ? (
                <div className="h-full relative">
                  {/* Background slides with blur effect */}
                  <div className="absolute inset-0 blur-sm opacity-40">
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
                <SlidePreview
                  slides={mockSlides}
                  renderedCount={renderedSlideCount}
                  showAll={true}
                />
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
