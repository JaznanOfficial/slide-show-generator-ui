"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Presentation, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleGeneratePresentation = () => {
    router.push("/presentation");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-2xl p-6 sm:p-8 lg:p-12 text-center shadow-xl">
        <div className="mb-6 sm:mb-8">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4 sm:mb-6">
            <Presentation className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            AI Presentation Generator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8">
            Create stunning presentations with AI assistance. Generate
            professional slides in seconds with our intelligent presentation
            builder.
          </p>
        </div>

        <Button
          onClick={handleGeneratePresentation}
          size="lg"
          className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
          Generate Presentation
        </Button>

        <div className="mt-6 sm:mt-8 text-xs sm:text-sm text-slate-500">
          <p>
            ✨ No signup required • 🚀 Instant generation • 📱 Mobile friendly
          </p>
        </div>
      </Card>
    </div>
  );
}
