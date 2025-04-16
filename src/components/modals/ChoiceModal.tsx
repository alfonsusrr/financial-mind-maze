import React from 'react';
import GameButton from '../ui/GameButton';
import { DecisionScene } from '../../types/games';
import { BiSolidCompass } from 'react-icons/bi';
import { MdCompareArrows } from 'react-icons/md';
import { GiChoice } from 'react-icons/gi';

interface ChoiceModalProps {
  scene: DecisionScene;
  onChoice: (nextSceneId: string) => void;
  onCompare: () => void;
}

const ChoiceModal: React.FC<ChoiceModalProps> = ({ scene, onChoice, onCompare }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 border-yellow-400 rounded-xl p-8 max-w-md w-full relative overflow-hidden shadow-xl shadow-yellow-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-glow opacity-50" />
        
        {/* Choice header with animated compass */}
        <div className="mb-6 text-center relative">
          <div className="absolute inset-0 flex justify-center items-center opacity-10">
            <BiSolidCompass className="text-8xl text-yellow-500 animate-pulse" />
          </div>
          <h3 className="text-2xl font-game text-yellow-400 animate-float flex items-center justify-center gap-2">
            <GiChoice className="text-yellow-300" />
            Make Your Choice
            <GiChoice className="text-yellow-300" />
          </h3>
        </div>
        
        {/* Choice buttons with different styles */}
        <div className="scene-choices flex flex-col gap-4 relative z-10">
          {scene.choices.map((choice, index) => (
            <GameButton 
              key={index} 
              onClick={() => onChoice(choice.nextSceneId)}
              variant={index === 0 ? 'primary' : 'secondary'}
              fullWidth
              className={`transform transition-all hover:scale-105 hover:shadow-lg ${
                index === 0 
                  ? 'hover:shadow-blue-400/30 border-blue-400/50' 
                  : 'hover:shadow-purple-400/30 border-purple-400/50'
              } relative overflow-hidden group`}
            >
              {/* Add subtle pulsing effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              {/* Choice text */}
              <span className="relative z-10">{choice.text}</span>
            </GameButton>
          ))}
        </div>
        
        {/* Compare options link with icon */}
        <div className="mt-6 text-center relative z-10">
          <button 
            onClick={onCompare}
            className="text-gray-400 hover:text-yellow-400 font-game text-sm hover:cursor-pointer transition-all flex items-center justify-center gap-1 mx-auto"
          >
            <MdCompareArrows className="text-xl" />
            Compare Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChoiceModal; 