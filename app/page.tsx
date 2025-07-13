'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Presentation, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleGeneratePresentation = () => {
    router.push('/presentation');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl p-12 text-center shadow-xl">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Presentation className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AI Presentation Generator
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Create stunning presentations with AI assistance. Generate professional slides
            in seconds with our intelligent presentation builder.
          </p>
        </div>

        <Button
          onClick={handleGeneratePresentation}
          size="lg"
          className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Generate Presentation
        </Button>

        <div className="mt-8 text-sm text-slate-500">
          <p>✨ No signup required • 🚀 Instant generation • 📱 Mobile friendly</p>
        </div>
      </Card>
    </div>
  );
}