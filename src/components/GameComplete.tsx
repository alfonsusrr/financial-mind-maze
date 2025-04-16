'use client';

import { useGame } from './GameEngine';

export function GameComplete() {
  const { gameState, resetGame } = useGame();
  
  return (
    <div className="game-complete text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Congratulations!</h1>
      <p className="mb-8">
        You've completed the Financial Mind Maze! You've experienced various 
        financial scenarios and learned about the psychological biases that
        can impact your decision-making.
      </p>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Final Balance</h3>
        <p className="text-3xl font-bold">${gameState.playerStats.netWorth.toLocaleString()}</p>
      </div>
      <button 
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
        onClick={() => resetGame()}
      >
        Play Again
      </button>
    </div>
  );
}
