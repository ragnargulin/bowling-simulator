import { Frame } from '@/types';

interface BowlingFrameProps {
  frame: Frame;
  isCurrentFrame: boolean;
}

export const BowlingFrame = ({ frame, isCurrentFrame }: BowlingFrameProps) => {
  return (
    <div className={`border p-4 ${isCurrentFrame ? 'bg-blue-400' : ''}`}>
      <div className="flex gap-2 mb-2">
        <div className="w-8 h-8 border flex items-center justify-center">
          {frame.rolls[0] === 10 ? 'X' : frame.rolls[0]}
        </div>
        <div className="w-8 h-8 border flex items-center justify-center">
          {frame.isSpare ? '/' : frame.rolls[1]}
        </div>
        {frame.frameNumber === 10 && (frame.isStrike || frame.isSpare) && (
          <div className="w-8 h-8 border flex items-center justify-center">
            {frame.rolls[2] === 10 ? 'X' : frame.rolls[2]}
          </div>
        )}
      </div>
      <div className="text-center font-bold">{frame.score}</div>
    </div>
  );
};