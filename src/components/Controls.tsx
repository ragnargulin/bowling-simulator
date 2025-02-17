// components/Controls.tsx
interface ControlsProps {
    onRoll: (pins: number) => void;
    onReset: () => void;
    disabled: boolean;
    remainingPins: number;
    isFirstRoll: boolean;
    currentFrame: number;
  }
  
  export const Controls = ({ 
    onRoll, 
    onReset, 
    disabled, 
    remainingPins, 
    isFirstRoll,
    currentFrame 
  }: ControlsProps) => {
    const isButtonDisabled = (pinCount: number) => {
      if (disabled) return true;
      if (isFirstRoll) return false;
      
      if (currentFrame === 9) {
        if (remainingPins === 10) return false;
        if (remainingPins === 10 && !isFirstRoll) return false;
      }
      
      return pinCount > remainingPins;
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