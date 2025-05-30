"use client";

import React, { useState, useEffect } from "react";
import { Star, Crown, Play, ArrowRight, RotateCcw } from "lucide-react";

const MysticTilesOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [score, setScore] = useState(0);

  const steps = [
    "welcome",
    "story",
    "tutorial1",
    "tutorial2",
    "tutorial3",
    "rewards",
    "complete",
  ];

  // Sample game board for tutorial
  const tutorialBoard = [
    ["🔮", "⭐", "🌙", "💎"],
    ["⭐", "🔮", "💎", "🌙"],
    ["🌙", "💎", "⭐", "🔮"],
    ["💎", "🌙", "🔮", "⭐"],
  ];

  const [gameBoard] = useState(tutorialBoard);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleTileClick = (row: number, col: number) => {
    if (currentStep !== 2) return;

    const tileKey = `${row}-${col}`;
    if (selectedTiles.includes(tileKey)) {
      setSelectedTiles(selectedTiles.filter((t) => t !== tileKey));
    } else if (selectedTiles.length < 3) {
      setSelectedTiles([...selectedTiles, tileKey]);
      if (selectedTiles.length === 2) {
        setTimeout(() => {
          setScore((prev) => prev + 100);
          setSelectedTiles([]);
          if (currentStep === 2) {
            setTimeout(() => setCurrentStep(3), 1000);
          }
        }, 500);
      }
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedTiles([]);
    }
  };

  const resetTutorial = () => {
    setCurrentStep(0);
    setSelectedTiles([]);
    setScore(0);
  };

  const renderWelcome = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="relative">
        <div className="text-6xl mb-4 animate-bounce">🔮</div>
        <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
        <div className="absolute -bottom-2 -left-2 text-xl animate-pulse">
          ⭐
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          Mystic Tiles
        </h1>
        <p className="text-xl text-gray-300">
          Enter a world of magical mysteries
        </p>
      </div>

      <div className="flex justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              animationPhase === i ? "bg-purple-400 scale-125" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
      >
        <Play className="w-5 h-5" />
        Begin Your Journey
      </button>
    </div>
  );

  const renderStory = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-5xl mb-4">🏰</div>

      <div className="space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-purple-300">
          The Ancient Temple
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Deep within an ancient temple, mystical tiles hold the secrets of
          forgotten magic. Match the sacred symbols to unlock their power and
          restore balance to the realm.
        </p>
      </div>

      <div className="flex justify-center space-x-4 text-3xl">
        <span className="animate-pulse">🔮</span>
        <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>
          ⭐
        </span>
        <span className="animate-pulse" style={{ animationDelay: "1s" }}>
          🌙
        </span>
        <span className="animate-pulse" style={{ animationDelay: "1.5s" }}>
          💎
        </span>
      </div>

      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
      >
        Learn to Play
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderTutorial1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-300 mb-2">How to Play</h2>
        <p className="text-gray-300">
          Match 3 or more tiles of the same symbol
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
          {gameBoard.map((row, rowIndex) =>
            row.map((tile, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
                className={`w-16 h-16 rounded-lg border-2 text-2xl transition-all duration-200 ${
                  selectedTiles.includes(`${rowIndex}-${colIndex}`)
                    ? "border-yellow-400 bg-yellow-900/30 scale-110 shadow-lg shadow-yellow-400/50"
                    : "border-gray-600 bg-gray-700 hover:border-purple-400 hover:bg-gray-600"
                }`}
              >
                {tile}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="text-lg text-purple-300 mb-2">Score: {score}</div>
        <p className="text-sm text-gray-400">
          Tap 3 matching tiles (try the stars ⭐)
        </p>
      </div>
    </div>
  );

  const renderTutorial2 = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-4xl">🎯</div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-purple-300">Perfect!</h2>
        <p className="text-gray-300 max-w-md mx-auto">
          Great job! As you match tiles, new ones will fall from above. Create
          chain reactions for massive scores!
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 max-w-xs mx-auto">
        <div className="text-center space-y-2">
          <div className="text-yellow-400 font-bold">+100 Points</div>
          <div className="text-sm text-gray-400">3-Match Bonus</div>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderTutorial3 = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-4xl">⚡</div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-purple-300">Power-Ups</h2>
        <p className="text-gray-300 max-w-md mx-auto">
          Collect magical power-ups to enhance your abilities!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl mb-2">💥</div>
          <div className="text-sm text-purple-300 font-bold">Blast</div>
          <div className="text-xs text-gray-400">Clear surrounding tiles</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl mb-2">🌟</div>
          <div className="text-sm text-purple-300 font-bold">Star</div>
          <div className="text-xs text-gray-400">Match any symbol</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl mb-2">⚡</div>
          <div className="text-sm text-purple-300 font-bold">Lightning</div>
          <div className="text-xs text-gray-400">Clear entire row</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-2xl mb-2">🔥</div>
          <div className="text-sm text-purple-300 font-bold">Fire</div>
          <div className="text-xs text-gray-400">Double points</div>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
      >
        Show Rewards
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  const renderRewards = () => (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="text-4xl">🏆</div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-purple-300">Daily Rewards</h2>
        <p className="text-gray-300 max-w-md mx-auto">
          Return daily to claim magical rewards and boost your progress!
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <div
            key={day}
            className={`bg-gray-800 rounded-lg p-3 border-2 ${
              day === 1
                ? "border-yellow-400 bg-yellow-900/20"
                : "border-gray-600"
            }`}
          >
            <div className="text-lg mb-1">
              {day === 1 ? "🎁" : day === 7 ? "👑" : "💰"}
            </div>
            <div className="text-xs text-gray-400">Day {day}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg p-4 max-w-xs mx-auto">
        <div className="text-white font-bold">Today&apos;s Reward</div>
        <div className="text-2xl my-2">🎁</div>
        <div className="text-sm text-yellow-100">100 Coins + Power-up</div>
      </div>

      <button
        onClick={nextStep}
        className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
      >
        Claim Reward
        <Star className="w-5 h-5" />
      </button>
    </div>
  );

  const renderComplete = () => (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="relative">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
        <div className="absolute -bottom-2 -left-2 text-xl animate-pulse">
          🌟
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          You&apos;re Ready!
        </h1>
        <p className="text-xl text-gray-300">
          Your mystical journey begins now
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 max-w-sm mx-auto">
        <div className="text-lg text-purple-300 font-bold mb-2">
          Starter Pack
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Coins</span>
            <span className="text-yellow-400">500 💰</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Power-ups</span>
            <span className="text-purple-400">3 ⚡</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Lives</span>
            <span className="text-red-400">5 ❤️</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={resetTutorial}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Replay Tutorial
        </button>

        <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
          <Crown className="w-5 h-5" />
          Start Playing
        </button>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "welcome":
        return renderWelcome();
      case "story":
        return renderStory();
      case "tutorial1":
        return renderTutorial1();
      case "tutorial2":
        return renderTutorial2();
      case "tutorial3":
        return renderTutorial3();
      case "rewards":
        return renderRewards();
      case "complete":
        return renderComplete();
      default:
        return renderWelcome();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="bg-gray-800/80 backdrop-blur-sm">
          <div className="flex justify-center items-center py-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-purple-400 shadow-lg shadow-purple-400/50"
                      : "bg-gray-600"
                  }`}
                />
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 transition-all duration-300 ${
                      index < currentStep ? "bg-purple-400" : "bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-5 flex items-center justify-center min-h-screen p-6 pt-16">
        <div className="w-full max-w-md">{renderStep()}</div>
      </div>

      {/* Skip Button */}
      {currentStep < steps.length - 1 && (
        <button
          onClick={() => setCurrentStep(steps.length - 1)}
          className="fixed bottom-6 right-6 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
        >
          Skip Tutorial
        </button>
      )}
    </div>
  );
};

export default MysticTilesOnboarding;
