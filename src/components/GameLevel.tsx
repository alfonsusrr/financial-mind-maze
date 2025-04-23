'use client';

import { useGame } from './GameEngine';
import { Introduction } from './Introduction';
import { GameComplete } from './GameComplete';
import GameSceneComponent from './GameScene';
import LevelSelect from './LevelSelect';

// Loading Component with Progress Bar
function LoadingScreen({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 z-50 text-white">
      <h2 className="text-2xl font-bold mb-6">Loading</h2>
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm">{progress}% Complete</p>
    </div>
  );
}

// Main Level Component
export function GameLevel() {
  const { gameState, currentSceneData, makeChoice, handleNext, resetGame } = useGame();
  const { currentLevel, gameCompleted, playerStats, showLevelSelect, isLoading, loadingProgress } = gameState;

  // Debug statement to check the value of showLevelSelect
  console.log("GameLevel render state:", { showLevelSelect, currentLevel, gameCompleted, isLoading, loadingProgress });

  // Show loading screen if assets are being loaded
  if (isLoading) {
    return (
      <>
        {/* Show content behind the loader for smoother transitions */}
        {currentSceneData && (
          <div className="opacity-30">
            <GameSceneComponent
              scene={currentSceneData}
              playerStats={playerStats}
              onChoice={makeChoice}
              onNext={handleNext}
              onRestart={resetGame}
            />
          </div>
        )}
        <LoadingScreen progress={loadingProgress} />
      </>
    );
  }

  // First check if level selection should be shown
  if (showLevelSelect) {
    return <LevelSelect />;
  }

  // Then check for introduction or other conditions
  if (currentLevel === 0 || !currentSceneData && !gameCompleted) {
    return <Introduction />;
  }

  if (gameCompleted && currentLevel === 7) {
    return <GameComplete />;
  }

  if (currentSceneData) {
    return (
      <GameSceneComponent
        scene={currentSceneData}
        playerStats={playerStats}
        onChoice={makeChoice}
        onNext={handleNext}
        onRestart={resetGame}
      />
    );
  }

  console.error("GameLevel reached unexpected state:", gameState);
  return <div>Error: Could not determine the current game state.</div>;
}

// Level Complete Component
// type LevelCompleteProps = {
//   levelNumber: number;
//   onContinue: () => void;
// };

// function LevelComplete({ levelNumber, onContinue }: LevelCompleteProps) {
//   const { gameState } = useGame();
  
//   return (
//     <div className="level-complete text-center py-12">
//       <h2 className="text-3xl font-bold mb-4">Level {levelNumber} Complete!</h2>
//       <p className="mb-8">
//         You've successfully navigated through this financial scenario and hopefully
//         gained insights about the biases that influence your decisions.
//       </p>
//       <div className="mb-6">
//         <h3 className="text-xl font-semibold mb-2">Current Balance (Net Worth)</h3>
//         <p className="text-2xl font-bold">${gameState.playerStats.netWorth.toLocaleString()}</p>
//       </div>
//       <button 
//         className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
//         onClick={onContinue}
//       >
//         Continue to Next Level
//       </button>
//     </div>
//   );
// }