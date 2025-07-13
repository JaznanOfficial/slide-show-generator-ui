'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface Slide {
  title: string;
  content: string;
}

interface SlidePreviewProps {
  slides: Slide[];
  renderedCount?: number;
  showAll?: boolean;
}

export default function SlidePreview({ slides, renderedCount = slides.length, showAll = false }: SlidePreviewProps) {
  const displaySlides = showAll ? slides : slides.slice(0, renderedCount);
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Presentation Preview
        </h2>
        <p className="text-slate-600">
          {renderedCount} of {slides.length} slides generated
          {renderedCount === slides.length && " • Ready for download"}
        </p>
      </div>

      {/* Slides Grid */}
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-2 gap-4 pr-4">
          {displaySlides.map((slide, index) => (
            <Card 
              key={index} 
              className={`p-4 hover:shadow-md transition-all duration-500 cursor-pointer group ${
                index === renderedCount - 1 ? 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500' : ''
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 flex flex-col justify-between border-2 border-transparent group-hover:border-primary/20 transition-colors">
                {/* Slide Number */}
                <div className="text-xs text-slate-500 mb-2">
                  Slide {index + 1}
                </div>
                
                {/* Slide Content */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3">
                    {slide.content}
                  </p>
                </div>
                
                {/* Visual Elements */}
                <div className="flex justify-between items-end mt-3">
                  <div className="flex space-x-1">
                    <div className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                      index === renderedCount - 1 ? 'bg-green-500 animate-pulse' : 'bg-primary'
                    }`} />
                    <div className="w-1 h-1 bg-primary/60 rounded-full" />
                    <div className="w-1 h-1 bg-primary/30 rounded-full" />
                  </div>
                  <div className="text-xs text-slate-400">
                    {index === renderedCount - 1 ? (
                      <span className="text-green-600 animate-pulse">✓ Just Generated</span>
                    ) : (
                      <span>✓ Generated</span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}