export interface Frame {
    rolls: number[];
    score: number;
    isSpare: boolean;
    isStrike: boolean;
    frameNumber: number;
  }
  
  export interface GameState {
    frames: Frame[];
    currentFrame: number;
    currentRoll: number;
    isGameComplete: boolean;
    totalScore: number;
  }