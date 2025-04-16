import React, { useEffect, useState } from 'react';
import { InsightScene } from '../../types/games';
import SceneContainer from '../ui/SceneContainer';
import GameButton from '../ui/GameButton';
import { BsArrowRight, BsStars, BsLightbulb } from 'react-icons/bs';
import { FaBrain, FaLightbulb, FaBookOpen } from 'react-icons/fa';
import { RiMentalHealthLine } from 'react-icons/ri';

interface InsightSceneProps {
  scene: InsightScene;
  onNext: () => void;
}

// Helper function to parse markdown bold syntax
const parseMarkdownBold = (text: string): React.ReactNode[] => {
  if (!text) return [];
  
  // Split by bold markers
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    // Check if this part is bold (surrounded by **)
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** markers and render as bold
      const content = part.slice(2, -2);
      return <strong key={index} className="text-indigo-300">{content}</strong>;
    }
    // Regular text
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

const InsightSceneComponent: React.FC<InsightSceneProps> = ({ scene, onNext }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 400);
    const contentTimer = setTimeout(() => setShowContent(true), 1200);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <SceneContainer 
      background={scene.background} 
      videoBackground={scene.background.replace('.png', '.mp4')}
    >
      <div className="flex h-full items-center justify-center">
        <div className={`scene-info w-full max-w-3xl bg-black/75 p-8 rounded-lg border-2 border-indigo-400/50 transform transition-all duration-700 flex flex-col ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} overflow-y-auto backdrop-blur-sm`}>
          <h2 className="scene-title text-2xl font-game text-indigo-400 text-shadow-lg shadow-indigo-600/50 mb-4 animate-float flex items-center gap-2 justify-center">
            <BsLightbulb className="text-indigo-300 text-lg" />
            {scene.title}
            <BsLightbulb className="text-indigo-300 text-lg" />
          </h2>
          
          <div className="scene-description bg-black/30 p-6 rounded-md border border-indigo-200/20 shadow-inner mb-6">
            <div className="text-indigo-100 font-game leading-relaxed text-base tracking-wide max-h-64 overflow-y-auto pr-2 md:text-center">
              {parseMarkdownBold(scene.description)}
            </div>
          </div>
          
          {scene.realWorldExample && showContent && (
            <div className={`real-world-example bg-black/40 p-5 rounded-lg border border-blue-500/30 mb-5 transform transition-all duration-700 animate-fade-in`} style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg text-blue-300 font-game mb-3 flex items-center gap-2">
                <FaBookOpen className="text-blue-400 text-base" /> Real World Example
              </h3>
              <div className="p-3 bg-gradient-to-r from-blue-900/20 to-transparent border-l-2 border-blue-500/50">
                <p className="text-blue-100 text-sm leading-relaxed">{parseMarkdownBold(scene.realWorldExample)}</p>
              </div>
            </div>
          )}
          
          {scene.summary && showContent && (
            <div className={`insight-note bg-black/40 p-5 rounded-lg border border-purple-500/30 mb-5 transform transition-all duration-700 animate-fade-in`} style={{ animationDelay: '0.6s' }}>
              <h3 className="text-lg text-purple-300 font-game mb-3 flex items-center gap-2">
                <FaBrain className="text-purple-400 text-base" /> Key Insight
              </h3>
              <div className="p-3 bg-gradient-to-r from-purple-900/20 to-transparent border-l-2 border-purple-500/50">
                <div className="flex gap-3 items-start">
                  <p className="text-purple-100 italic text-sm w-full">{parseMarkdownBold(scene.summary)}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <div className="flex justify-center">
              <GameButton 
                onClick={onNext} 
                variant="action"
                className="animate-pulse hover:animate-none flex items-center justify-center gap-2 px-6 py-2 text-base"
              >
                Continue <BsArrowRight className="text-lg" />
              </GameButton>
            </div>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
};

export default InsightSceneComponent;