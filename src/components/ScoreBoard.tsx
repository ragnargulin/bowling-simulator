import { GameState } from '@/types';
import { BowlingFrame } from './BowlingFrame';

interface ScoreBoardProps {
  gameState: GameState;
}

export const ScoreBoard = ({ gameState }: ScoreBoardProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 justify-center">
        {gameState.frames.map((frame, index) => (
          <BowlingFrame
            key={frame.frameNumber}
            frame={frame}
            isCurrentFrame={index === gameState.currentFrame}
          />
        ))}
      </div>
      <div className="text-center mt-4 text-2xl font-bold">
        Total Score: {gameState.totalScore}
      </div>
    </div>
  );
};