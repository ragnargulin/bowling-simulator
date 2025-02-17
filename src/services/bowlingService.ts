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
    frame.rolls.push(pins);

    // Handle strike
    if (pins === 10 && frame.rolls.length === 1 && this.state.currentFrame < 9) {
      frame.isStrike = true;
      this.state.currentFrame++;
      this.state.currentRoll = 0;
    } 
    // Handle normal frame completion
    else if (frame.rolls.length === 2 || 
            (frame.rolls.length === 1 && pins === 10 && this.state.currentFrame === 9)) {
      frame.isSpare = !frame.isStrike && frame.rolls.reduce((a, b) => a + b, 0) === 10;
      
      if (this.state.currentFrame < 9) {
        this.state.currentFrame++;
        this.state.currentRoll = 0;
      } else if (this.state.currentFrame === 9) {
        if (!frame.isStrike && !frame.isSpare) {
          this.state.isGameComplete = true;
        } else if (frame.rolls.length === 3) {
          this.state.isGameComplete = true;
        }
      }
    } else {
      this.state.currentRoll++;
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

      if (frame.isStrike && i < 9) {
        if (nextFrame?.rolls[0] !== undefined) {
          frameScore += nextFrame.rolls[0];
          if (nextFrame.isStrike && followingFrame?.rolls[0] !== undefined) {
            frameScore += followingFrame.rolls[0];
          } else if (nextFrame.rolls[1] !== undefined) {
            frameScore += nextFrame.rolls[1];
          }
        }
      } else if (frame.isSpare && i < 9) {
        if (nextFrame?.rolls[0] !== undefined) {
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