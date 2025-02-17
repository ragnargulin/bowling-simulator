interface ControlsProps {
    onRoll: (pins: number) => void;
    onReset: () => void;
    disabled: boolean;
  }
  
  export const Controls = ({ onRoll, onReset, disabled }: ControlsProps) => {  
    return (
      <div className="flex flex-col items-center gap-4 mt-8">
        <div className="flex gap-2 flex-wrap justify-center">
          {Array.from({ length: 11 }).map((_, i) => (
            <button
              key={i}
              onClick={() => onRoll(i)}
              disabled={disabled}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
            >
              {i}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Game
          </button>
        </div>
      </div>
    );
  };