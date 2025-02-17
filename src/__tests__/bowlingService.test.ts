// __tests__/bowlingService.test.ts

import { BowlingService } from '../services/bowlingService';

describe('BowlingService', () => {
  let bowlingService: BowlingService;

  beforeEach(() => {
    bowlingService = new BowlingService();
  });

  test('basic frame scoring', () => {
    // Testa första rutan (6,2)
    bowlingService.roll(6);
    bowlingService.roll(2);
    expect(bowlingService.getState().frames[0].score).toBe(8);
  });

  test('spare scoring', () => {
    // Testa spare (8,2) följt av 10
    bowlingService.roll(8);
    bowlingService.roll(2); // spare
    bowlingService.roll(10); // strike
    expect(bowlingService.getState().frames[0].score).toBe(20);
  });

  test('strike scoring', () => {
    // Testa strike följt av 9,0
    bowlingService.roll(10); // strike
    bowlingService.roll(9);
    bowlingService.roll(0);
    expect(bowlingService.getState().frames[0].score).toBe(19);
  });

  test('complete game from example', () => {
    // Spela hela exemplet från reglerna
    const rolls = [
      6, 2,  // Frame 1: 8
      8, 2,  // Frame 2: Spare
      10,    // Frame 3: Strike
      9, 0,  // Frame 4
      6, 4,  // Frame 5: Spare
      8, 1,  // Frame 6
      9, 1,  // Frame 7: Spare
      10,    // Frame 8: Strike
      10,    // Frame 9: Strike
      8, 2, 7  // Frame 10: Spare + bonus
    ];

    rolls.forEach(pins => bowlingService.roll(pins));

    const finalState = bowlingService.getState();
    expect(finalState.totalScore).toBe(168);
    expect(finalState.isGameComplete).toBe(true);
  });

  test('perfect game', () => {
    // 12 strikes (including bonus rolls)
    for (let i = 0; i < 12; i++) {
      bowlingService.roll(10);
    }
    expect(bowlingService.getState().totalScore).toBe(300);
  });

  test('all spares', () => {
    // 21 rolls of 5 (including bonus roll)
    for (let i = 0; i < 21; i++) {
      bowlingService.roll(5);
    }
    expect(bowlingService.getState().totalScore).toBe(150);
  });

  test('gutter game', () => {
    // 20 misses
    for (let i = 0; i < 20; i++) {
      bowlingService.roll(0);
    }
    expect(bowlingService.getState().totalScore).toBe(0);
  });

  test('invalid rolls', () => {
    const initialState = bowlingService.getState();
    bowlingService.roll(-1); // Negativt värde
    expect(bowlingService.getState()).toEqual(initialState);
    
    bowlingService.roll(11); // För högt värde
    expect(bowlingService.getState()).toEqual(initialState);
  });

  test('tenth frame special rules', () => {
    // Spela 9 frames först
    for (let i = 0; i < 18; i++) {
      bowlingService.roll(1);
    }
    
    // Testa strike i sista rutan
    bowlingService.roll(10);
    expect(bowlingService.getState().isGameComplete).toBe(false);
    
    bowlingService.roll(10);
    expect(bowlingService.getState().isGameComplete).toBe(false);
    
    bowlingService.roll(10);
    expect(bowlingService.getState().isGameComplete).toBe(true);
  });

  test('frame status indicators', () => {
    bowlingService.roll(10);
    expect(bowlingService.getState().frames[0].isStrike).toBe(true);
    expect(bowlingService.getState().frames[0].isSpare).toBe(false);

    bowlingService.roll(5);
    bowlingService.roll(5);
    expect(bowlingService.getState().frames[1].isStrike).toBe(false);
    expect(bowlingService.getState().frames[1].isSpare).toBe(true);
  });
});