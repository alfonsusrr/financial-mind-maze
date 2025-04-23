import React, { useEffect, useState } from 'react';
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
  playerStats,
  onRestart 
}) => {
  // Add state to track if this specific scene's assets are ready
  const [sceneCssReady, setSceneCssReady] = useState(false);
  
  // For debugging
  useEffect(() => {
    console.log('Scene data:', {
      id: scene.id,
      type: scene.type,
      background: (scene as any).background || (scene as any).backgroundImage,
      hasBackground: !!(scene as any).background || !!(scene as any).backgroundImage,
    });
  }, [scene]);
  
  // Apply CSS transition effect when scene changes
  useEffect(() => {
    // Reset the ready state when scene changes
    setSceneCssReady(false);
    
    // Add a short delay to trigger CSS transition effect
    const timer = setTimeout(() => {
      setSceneCssReady(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, [scene.id]); // Re-run when scene ID changes
  
  // Get background style
  const getBackgroundStyle = () => {
    const backgroundUrl = (scene as any).background || (scene as any).backgroundImage;
    if (backgroundUrl) {
      return {
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return {};
  };
  
  // Render the appropriate scene component based on the scene type
  const renderScene = () => {
    // Apply CSS transition classes for smoother scene transitions
    const transitionClasses = `transition-opacity duration-500 ${
      sceneCssReady ? 'opacity-100' : 'opacity-0'
    }`;
    
    // Get background style
    const bgStyle = getBackgroundStyle();
    
    // Check if there's a background to apply
    const hasBackground = !!(scene as any).background || !!(scene as any).backgroundImage;
    const containerClasses = hasBackground ? 'relative h-full' : '';
    
    // Render background first if present, then the scene component
    return (
      <div className={`${containerClasses} ${transitionClasses}`} style={bgStyle}>
        {/* Render scene content with appropriate component */}
        {renderSceneContent()}
      </div>
    );
  };
  
  // Helper to render the appropriate scene content
  const renderSceneContent = () => {
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
