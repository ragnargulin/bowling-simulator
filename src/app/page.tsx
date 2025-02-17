'use client';

import { useState } from 'react';
import { ScoreBoard } from '@/components/ScoreBoard';
import { Controls } from '@/components/Controls';
import { BowlingService } from '@/services/bowlingService';

export default function Home() {
  const [bowlingService] = useState(() => new BowlingService());
  const [gameState, setGameState] = useState(bowlingService.getState());

  const handleRoll = (pins: number) => {
    const newState = bowlingService.roll(pins);
    setGameState({ ...newState });
  };

  const handleReset = () => {
    bowlingService.reset();
    setGameState(bowlingService.getState());
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bowling Calculator
      </h1>
      <ScoreBoard gameState={gameState} />
      <Controls
        onRoll={handleRoll}
        onReset={handleReset}
        disabled={gameState.isGameComplete}
      />
    </main>
  );
}