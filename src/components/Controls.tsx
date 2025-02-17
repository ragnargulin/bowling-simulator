import { GameState } from '@/types';

interface ControlsProps {
  onRoll: (pins: number) => void;
  onReset: () => void;
  disabled: boolean;
  remainingPins: number;
  isFirstRoll: boolean;
  currentFrame: number;
  gameState: GameState;
}

export const Controls = ({ 
  onRoll, 
  onReset, 
  disabled, 
  remainingPins, 
  isFirstRoll,
  currentFrame,
  gameState 
}: ControlsProps) => {
  const isButtonDisabled = (pinCount: number) => {
    if (disabled) return true;
    
    // För sista framen (frame 10)
    if (currentFrame === 9) {
      const frame = gameState.frames[9];
      
      // Om det är första slaget
      if (frame.rolls.length === 0) return false;
      
      // Om det är andra slaget efter en strike
      if (frame.isStrike && frame.rolls.length === 1) return false;
      
      // Om det är tredje slaget efter en strike eller spare
      if (frame.rolls.length === 2 && (frame.isStrike || frame.isSpare)) return false;
      
      // För andra slaget (inte efter strike)
      if (frame.rolls.length === 1 && !frame.isStrike) {
        return pinCount > (10 - frame.rolls[0]);
      }
    } else {
      // För frames 1-9
      if (isFirstRoll) return false;
      return pinCount > remainingPins;
    }
    
    return true;
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: 11 }).map((_, i) => (
          <button
            key={i}
            onClick={() => onRoll(i)}
            disabled={isButtonDisabled(i)}
            className={`px-4 py-2 rounded
              ${isButtonDisabled(i) 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          >
            {i}
          </button>
        ))}
      </div>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Reset Game
      </button>
    </div>
  );
};