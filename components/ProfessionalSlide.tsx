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

// Different gradient combinations for each slide
const getSlideGradient = (slideNumber: number) => {
  const gradients = [
    { from: "from-emerald-500", via: "via-teal-500", to: "to-cyan-500" },
    { from: "from-purple-500", via: "via-pink-500", to: "to-rose-500" },
    { from: "from-blue-500", via: "via-indigo-500", to: "to-purple-500" },
    { from: "from-orange-500", via: "via-red-500", to: "to-pink-500" },
    { from: "from-green-500", via: "via-emerald-500", to: "to-teal-500" },
    { from: "from-violet-500", via: "via-purple-500", to: "to-fuchsia-500" },
    { from: "from-amber-500", via: "via-orange-500", to: "to-red-500" },
    { from: "from-cyan-500", via: "via-blue-500", to: "to-indigo-500" },
    { from: "from-rose-500", via: "via-pink-500", to: "to-purple-500" },
    { from: "from-lime-500", via: "via-green-500", to: "to-emerald-500" },
  ];

  return gradients[(slideNumber - 1) % gradients.length];
};

export default function ProfessionalSlide({
  slide,
  slideNumber,
  totalSlides,
  isActive = false,
  className = "",
}: ProfessionalSlideProps) {
  const gradient = getSlideGradient(slideNumber);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex flex-col ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 opacity-50"></div>

      {/* Header */}
      <div
        className={`relative bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to} p-4 sm:p-6 lg:p-8 text-white flex-shrink-0`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full"></div>
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 rounded-full"></div>
              <div className="w-1 h-1 sm:w-1 sm:h-1 bg-white/10 rounded-full"></div>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
              {slide.title}
            </h1>
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-white/40 rounded-full"></div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 lg:px-4 py-1 sm:py-2">
              <div className="text-xs sm:text-sm font-medium">
                Slide {slideNumber}
              </div>
              <div className="text-xs opacity-80">of {totalSlides}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative p-4 sm:p-6 lg:p-8 flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          <div className="prose prose-sm sm:prose-base lg:prose-xl">
            <p className="text-slate-700 text-base sm:text-lg lg:text-2xl leading-relaxed font-medium text-center">
              {slide.content}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs sm:text-sm font-medium text-slate-700">
                AI Generated
              </span>
            </div>
            <div className="w-px h-3 sm:h-4 bg-slate-300"></div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Professional Presentation
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
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
      <div
        className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-bl from-${
          gradient.from.split("-")[1]
        }-400/20 to-transparent rounded-bl-full`}
      ></div>
    </div>
  );
}
