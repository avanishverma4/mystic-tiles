'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Sparkles, Trophy, Zap } from 'lucide-react';

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: "Match & Merge",
    description: "Connect mystical tiles to unlock ancient powers. Each match reveals hidden symbols and brings you closer to the ultimate treasure.",
    icon: <Sparkles className="w-16 h-16" />,
    features: [
      "Match 3 or more tiles",
      "Unlock special power-ups",
      "Discover hidden combinations",
      "Chain matches for bonus points"
    ]
  },
  {
    title: "Collect Treasures",
    description: "Gather ancient artifacts and mystical gems as you progress through challenging levels filled with secrets waiting to be unveiled.",
    icon: <Trophy className="w-16 h-16" />,
    features: [
      "Rare artifact collection",
      "Mystical gem discoveries",
      "Achievement rewards",
      "Daily treasure chests"
    ]
  },
  {
    title: "Master Powers",
    description: "Harness elemental forces and magical abilities to overcome the most challenging puzzles in your mystical journey.",
    icon: <Zap className="w-16 h-16" />,
    features: [
      "Elemental tile powers",
      "Lightning strike abilities",
      "Mystical bomb effects",
      "Time manipulation spells"
    ]
  }
];

export default function MysticTilesOnboarding() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    if (currentStep === onboardingSteps.length - 1) {
      // Handle game start
      console.log('Starting game...');
      setCurrentStep(0);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleStart = () => {
    setCurrentStep(0);
  };

  if (currentStep === -1) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden flex items-center justify-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full opacity-10 animate-pulse" />
          <div 
            className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full opacity-20 animate-bounce" 
            style={{ animationDuration: '3s' }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full opacity-15 animate-ping" 
            style={{ animationDuration: '4s' }}
          />
        </div>

        <section className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent animate-pulse">
            MYSTIC TILES
          </h1>
          <p className="text-xl md:text-2xl text-amber-200 mb-8 font-light">
            Unlock the Ancient Mysteries
          </p>
          <button 
            onClick={handleStart}
            className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/50 border border-amber-400 flex items-center gap-2 mx-auto"
          >
            <Play className="w-6 h-6" />
            Begin Your Journey
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full opacity-10 animate-pulse" />
        <div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full opacity-20 animate-bounce" 
          style={{ animationDuration: '3s' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-300 to-amber-500 rounded-full opacity-15 animate-ping" 
          style={{ animationDuration: '4s' }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <article className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-500/30 max-w-4xl mx-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              {onboardingSteps[currentStep].title}
            </h2>
            <div className="text-amber-300 text-lg font-semibold bg-black/40 px-4 py-2 rounded-full border border-amber-500/50">
              {currentStep + 1} / {onboardingSteps.length}
            </div>
          </header>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            {/* Visual Demo */}
            <div className="bg-gradient-to-br from-amber-600 to-yellow-700 rounded-2xl p-6 shadow-xl border border-amber-400/50">
              <div className="text-black flex justify-center items-center mb-4">
                {onboardingSteps[currentStep].icon}
              </div>
              <div className="bg-black/60 rounded-xl p-4 border border-amber-300/30">
                <div className="text-amber-200 text-center text-lg">
                  Interactive Demo Area
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-lg md:text-xl text-amber-100 leading-relaxed mb-6">
                {onboardingSteps[currentStep].description}
              </p>
              <div className="bg-black/40 rounded-xl p-4 border border-amber-500/30">
                <h4 className="text-amber-300 font-semibold mb-2">Key Features:</h4>
                <ul className="text-amber-200 space-y-1">
                  {onboardingSteps[currentStep].features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex justify-between items-center">
            <button 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border flex items-center gap-2 ${
                currentStep === 0
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed border-gray-700' 
                  : 'bg-black/60 text-amber-300 hover:bg-amber-900/30 border-amber-500/50 hover:border-amber-400'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            {/* Progress Dots */}
            <div className="flex space-x-2" role="tablist" aria-label="Onboarding progress">
              {onboardingSteps.map((_, idx) => (
                <div 
                  key={idx}
                  role="tab"
                  aria-selected={idx === currentStep}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 scale-125' 
                      : idx < currentStep
                        ? 'bg-amber-600' 
                        : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 border border-amber-400 flex items-center gap-2"
            >
              {currentStep === onboardingSteps.length - 1 ? (
                <>
                  <Play className="w-4 h-4" />
                  Start Playing!
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </nav>
        </article>
      </div>
    </main>
  );
}
