"use client";

interface Slide {
  title: string;
  content: string;
}

interface ProfessionalSlideProps {
  slide: Slide;
  slideNumber: number;
  totalSlides: number;
  isActive?: boolean;
  className?: string;
}

export default function ProfessionalSlide({
  slide,
  slideNumber,
  totalSlides,
  isActive = false,
  className = "",
}: ProfessionalSlideProps) {
  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-50"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-white/30 rounded-full"></div>
              <div className="w-2 h-2 bg-white/20 rounded-full"></div>
              <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            </div>
            <h1 className="text-3xl font-bold mb-3 leading-tight">
              {slide.title}
            </h1>
            <div className="w-20 h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <div className="text-sm font-medium">Slide {slideNumber}</div>
              <div className="text-xs opacity-80">of {totalSlides}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative p-8">
        <div className="max-w-4xl">
          <div className="prose prose-lg">
            <p className="text-slate-700 text-xl leading-relaxed font-medium">
              {slide.content}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-700">
                AI Generated
              </span>
            </div>
            <div className="w-px h-4 bg-slate-300"></div>
            <span className="text-xs text-slate-500">
              Professional Presentation
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
              }`}
            ></div>
            <span
              className={`text-xs font-medium ${
                isActive ? "text-emerald-600" : "text-slate-500"
              }`}
            >
              {isActive ? "Just Generated" : "Generated"}
            </span>
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-400/20 to-transparent rounded-bl-full"></div>
    </div>
  );
}
