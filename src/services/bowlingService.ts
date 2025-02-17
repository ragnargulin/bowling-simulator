import type { GameState } from '@/types';

export class BowlingService {
  private state: GameState;

  constructor() {
    this.state = this.getInitialState();
  }

  private getInitialState(): GameState {
    return {
      frames: Array(10).fill(null).map((_, index) => ({
        rolls: [],
        score: 0,
        isSpare: false,
        isStrike: false,
        frameNumber: index + 1
      })),
      currentFrame: 0,
      currentRoll: 0,
      isGameComplete: false,
      totalScore: 0
    };
  }

  roll(pins: number): GameState {
    if (this.state.isGameComplete || pins < 0 || pins > 10) {
      return this.state;
    }

    const frame = this.state.frames[this.state.currentFrame];
    
    // Validera att summan av slag i en frame inte överstiger 10 (förutom i sista framen)
    if (this.state.currentFrame < 9 && 
        frame.rolls.length === 1 && 
        frame.rolls[0] + pins > 10) {
      return this.state;
    }

    frame.rolls.push(pins);

    // Uppdatera frame status
    if (frame.rolls.length === 1 && pins === 10) {
      frame.isStrike = true;
    } else if (frame.rolls.length === 2 && frame.rolls[0] + frame.rolls[1] === 10) {
      frame.isSpare = true;
    }

    // Hantera frame progression
    if (this.state.currentFrame < 9) {
      // För frames 1-9
      if (frame.isStrike || frame.rolls.length === 2) {
        this.state.currentFrame++;
        this.state.currentRoll = 0;
      } else {
        this.state.currentRoll++;
      }
    } else {
      // För frame 10
      if (!frame.isStrike && !frame.isSpare && frame.rolls.length === 2) {
        this.state.isGameComplete = true;
      } else if ((frame.isStrike || frame.isSpare) && frame.rolls.length === 3) {
        this.state.isGameComplete = true;
      } else {
        this.state.currentRoll++;
      }
    }

    this.calculateScore();
    return this.state;
  }

  private calculateScore(): void {
    let runningScore = 0;
    
    for (let i = 0; i < this.state.frames.length; i++) {
      const frame = this.state.frames[i];
      const nextFrame = this.state.frames[i + 1];
      const followingFrame = this.state.frames[i + 2];

      let frameScore = frame.rolls.reduce((a, b) => a + b, 0);

      // Beräkna bonus för frames 1-9
      if (i < 9) {
        if (frame.isStrike) {
          // Strike bonus
          if (nextFrame?.rolls[0] !== undefined) {
            frameScore += nextFrame.rolls[0];
            if (nextFrame.isStrike && i < 8) {
              // Om nästa slag också är en strike
              if (followingFrame?.rolls[0] !== undefined) {
                frameScore += followingFrame.rolls[0];
              }
            } else if (nextFrame.rolls[1] !== undefined) {
              frameScore += nextFrame.rolls[1];
            }
          }
        } else if (frame.isSpare && nextFrame?.rolls[0] !== undefined) {
          // Spare bonus
          frameScore += nextFrame.rolls[0];
        }
      }

      runningScore += frameScore;
      frame.score = runningScore;
    }

    this.state.totalScore = runningScore;
  }

  getState(): GameState {
    return this.state;
  }

  reset(): void {
    this.state = this.getInitialState();
  }
}