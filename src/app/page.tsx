// app/page.tsx
'use client';

import { useState } from 'react';
import { StrikeConfetti } from '@/components/StrikeConfetti';
import { ScoreBoard } from '@/components/ScoreBoard';
import { Controls } from '@/components/Controls';
import { BowlingService } from '@/services/bowlingService';

export default function Home() {
  const [bowlingService] = useState(() => new BowlingService());
  const [gameState, setGameState] = useState(bowlingService.getState());
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRoll = async (pins: number) => {
    const newState = bowlingService.roll(pins);
    setGameState({ ...newState });

    if (pins === 10) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleReset = () => {
    bowlingService.reset();
    setGameState(bowlingService.getState());
    setShowConfetti(false);
  };

  const getCurrentFrameRemainingPins = (): number => {
    const currentFrame = gameState.frames[gameState.currentFrame];
    if (!currentFrame) return 10;

    if (currentFrame.rolls.length === 0) return 10;

    if (gameState.currentFrame === 9) {
      if (currentFrame.isStrike && currentFrame.rolls.length === 1) return 10;
      if (currentFrame.isSpare && currentFrame.rolls.length === 2) return 10;
      if (currentFrame.rolls.length === 2 && !currentFrame.isStrike && !currentFrame.isSpare) return 0;
    }

    return 10 - currentFrame.rolls[0];
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bowling Calculator
      </h1>
      
      <StrikeConfetti show={showConfetti} />
      
      <ScoreBoard gameState={gameState} />
      
      <Controls
        onRoll={handleRoll}
        onReset={handleReset}
        disabled={gameState.isGameComplete}
        remainingPins={getCurrentFrameRemainingPins()}
        isFirstRoll={gameState.frames[gameState.currentFrame]?.rolls.length === 0}
        currentFrame={gameState.currentFrame}
        gameState={gameState} 
      />
    </main>
  );
}