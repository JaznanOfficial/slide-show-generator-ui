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
  const displaySlides = showAll
    ? slides
    : slides.slice(renderedCount - 1, renderedCount);

  return (
    <div className="h-full flex flex-col">
      {/* Header (not included in PDF) */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 mb-1 sm:mb-2">
          Presentation Preview
        </h2>
        <p className="text-sm sm:text-base text-slate-600">
          {renderedCount} of {slides.length} slides generated
          {renderedCount === slides.length && " • Ready for download"}
        </p>
      </div>

      {/* Slides only for PDF */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="pdf-slides">
          {displaySlides.map((slide, index) => (
            <div key={index} className="pdf-slide transition-all duration-500">
              <ProfessionalSlide
                slide={slide}
                slideNumber={renderedCount - displaySlides.length + index + 1}
                totalSlides={slides.length}
                isActive={index === displaySlides.length - 1}
                className="w-full max-w-4xl mx-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
