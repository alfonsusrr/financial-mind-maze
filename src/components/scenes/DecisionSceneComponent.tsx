import React, { useState } from 'react';
import { DecisionScene } from '../../types/games';
import SceneContainer from '../ui/SceneContainer';
import GameButton from '../ui/GameButton';
import ComparisonModal from '../modals/ComparisonModal';
import ChoiceModal from '../modals/ChoiceModal';
import { MdCompareArrows } from 'react-icons/md';
import { BsStars } from 'react-icons/bs';

interface DecisionSceneProps {
  scene: DecisionScene;
  onChoice: (nextSceneId: string) => void;
}

const DecisionSceneComponent: React.FC<DecisionSceneProps> = ({ scene, onChoice }) => {
  const [showChoices, setShowChoices] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  const renderImpactLabel = (value: string | undefined) => {
    if (!value) return null;
    
    const impactColors = {
      negative: 'text-red-400',
      limited: 'text-orange-400',
      low: 'text-orange-400',
      neutral: 'text-gray-400',
      moderate: 'text-yellow-400',
      positive: 'text-green-400',
      high: 'text-green-400',
      advancing: 'text-blue-400',
      excellent: 'text-purple-400',
      'very positive': 'text-purple-400'
    };
    
    return <span className={impactColors[value as keyof typeof impactColors] || 'text-white'}>{value}</span>;
  };

  return (
    <SceneContainer 
      background={scene.background}
      videoBackground={scene.background.replace('.png', '.mp4')}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="flex-grow"></div>
        
        <div className="scene-info bg-black/75 p-6 rounded-lg border-2 border-yellow-400 mt-auto animate-fade-in-up">
          <h2 className="scene-title text-3xl font-game text-yellow-400 text-shadow-lg shadow-yellow-600/50 mb-4 animate-float">
            {scene.title}
          </h2>
          <div className="scene-description bg-black/40 p-4 rounded-md border border-yellow-200/30 shadow-inner">
            <p className="text-yellow-100 font-game leading-relaxed text-lg tracking-wide" style={{ whiteSpace: 'pre-wrap' }}>
              {scene.description}
            </p>
          </div>
          
          <div className="mt-6 flex justify-center gap-4">
            <GameButton 
              onClick={() => setShowComparison(true)}
              variant="secondary"
              fullWidth
              className="animate-pulse hover:animate-none flex items-center justify-center gap-2"
            >
              <MdCompareArrows className="text-xl" /> Compare Options
            </GameButton>
            <GameButton 
              onClick={() => setShowChoices(true)}
              variant="action"
              fullWidth
              className="animate-pulse hover:animate-none flex items-center justify-center gap-2"
            >
              <BsStars className="text-xl" /> Decide Now <BsStars className="text-xl" />
            </GameButton>
          </div>
        </div>
      </div>
      
      {showComparison && (
        <ComparisonModal 
          scene={scene} 
          onClose={() => setShowComparison(false)} 
          onReadyToDecide={() => {
            setShowComparison(false);
            setShowChoices(true);
          }}
        />
      )}
      
      {showChoices && (
        <ChoiceModal 
          scene={scene} 
          onChoice={onChoice}
          onCompare={() => {
            setShowChoices(false);
            setShowComparison(true);
          }}
        />
      )}
    </SceneContainer>
  );
};

export default DecisionSceneComponent;