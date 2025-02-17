# Bowling Score Calculator

A web application for calculating and visualizing bowling scores, built with Next.js and TypeScript.

## Features
- **Game Mechanics**
  - Real-time score calculation
  - Support for strikes and spares
  - Tenth frame special rules
  - Complete game state tracking

- **User Interface**
  - Intelligent button disabling based on game rules
  - Strike celebration animation
  - Responsive design for all devices
  - Keyboard-friendly controls

- **Technical Features**
  - Input validation
  - State management
  - Real-time updates
  - Accessibility support

## Technologies used
- Next.js 13+
- TypeScript
- React states
- ESlint
- Tailwind CSS
- Jest for testing
- React Confetti

## Bowling rules
- Each game consists of 10 frames
- Each frame allows up to 2 rolls to knock down 10 pins
- A strike (all pins down on first roll) is marked with 'X'
- A spare (all pins down on second roll) is marked with '/'
- Strike bonus: Points from next 2 rolls
- Spare bonus: Points from next roll
- Tenth frame: Up to 3 rolls if strike or spare

## Project structure
bowling-calculator/
   src/
      app/
         page.tsx
      components/
         Controls.tsx
         ScoreBoard.tsx
         StrikeConfetti.tsx
      services/
         bowlingService.ts
      types/
         index.ts
   __tests__/
      bowlingService.test.ts
   package.json

## Acknowledgments
- Built as a learning project for [MetaBytes]
- Bowling scoring rules from [alltombowling.nu](https://www.alltombowling.nu/skola_rakna.php)

## Contact
Ragnar Gulin - [ragnarnilsgulin@gmail.com]

Project Link: [https://github.com/ragnargulin/bowling-simulator]

---

*Note: This project was created as part of an internship application process.*