import React from 'react';
import { GameScene } from '../types/games';
import { PlayerStats } from './GameEngine';

// Import individual scene components
import DecisionSceneComponent from './scenes/DecisionSceneComponent';
import OutcomeSceneComponent from './scenes/OutcomeSceneComponent';
import InsightSceneComponent from './scenes/InsightSceneComponent';
import EndingSceneComponent from './scenes/EndingSceneComponent';
import EventSceneComponent from './scenes/EventSceneComponent';

interface GameSceneProps {
  scene: GameScene;
  onChoice: (nextSceneId: string) => void;
  onNext: () => void;
  playerStats: PlayerStats;
  onRestart?: () => void; // Added for restart functionality
}

const GameSceneComponent: React.FC<GameSceneProps> = ({ 
  scene, 
  onChoice, 
  onNext, 
  onRestart 
}) => {
  // Render the appropriate scene component based on the scene type
  const renderScene = () => {
    switch (scene.type) {
      case 'decision':
        return <DecisionSceneComponent scene={scene} onChoice={onChoice} />;
        
      case 'outcome':
        return <OutcomeSceneComponent scene={scene} onNext={onNext} />;
        
      case 'insight':
        return <InsightSceneComponent scene={scene} onNext={onNext} />;
        
      case 'ending':
        return <EndingSceneComponent scene={scene} onRestart={onRestart} onNext={onNext} />;
        
      case 'event':
        return <EventSceneComponent scene={scene} onNext={onNext} />;
        
      default:
        console.warn("Unhandled scene type:", scene);
        return <div>Unknown or unhandled scene type</div>;
    }
  };

  return renderScene();
};

export default GameSceneComponent;
