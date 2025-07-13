"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import ProfessionalSlide from "./ProfessionalSlide";

interface Slide {
  title: string;
  content: string;
}

interface SlidePreviewProps {
  slides: Slide[];
  renderedCount?: number;
  showAll?: boolean;
}

export default function SlidePreview({
  slides,
  renderedCount = slides.length,
  showAll = false,
}: SlidePreviewProps) {
  const displaySlides = showAll ? slides : slides.slice(0, renderedCount);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6 flex-shrink-0">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Presentation Preview
        </h2>
        <p className="text-slate-600">
          {renderedCount} of {slides.length} slides generated
          {renderedCount === slides.length && " • Ready for download"}
        </p>
      </div>

      {/* Full Display Slides */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-8 pr-4 pb-8">
          {displaySlides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === renderedCount - 1
                  ? "animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                  : ""
              }`}
            >
              <ProfessionalSlide
                slide={slide}
                slideNumber={index + 1}
                totalSlides={slides.length}
                isActive={index === renderedCount - 1}
                className="w-full max-w-4xl mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
