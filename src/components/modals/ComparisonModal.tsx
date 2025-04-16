import React from 'react';
import GameButton from '../ui/GameButton';
import { DecisionScene } from '../../types/games';
import { FaBalanceScale, FaRegLightbulb, FaCheck, FaTimes, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';
import { TbArrowBack } from 'react-icons/tb';
import { MdCompareArrows, MdOutlineCheckCircle } from 'react-icons/md';
import { BsLightningChargeFill } from 'react-icons/bs';

interface ComparisonModalProps {
  scene: DecisionScene;
  onClose: () => void;
  onReadyToDecide: () => void;
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ scene, onClose, onReadyToDecide }) => {
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 border-yellow-400 rounded-xl p-6 max-w-4xl w-full relative overflow-auto max-h-[90vh] shadow-xl shadow-yellow-500/20">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent animate-glow opacity-50" />
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <MdCompareArrows className="text-yellow-400 text-3xl animate-pulse" />
          <h3 className="text-2xl font-game text-yellow-400 text-center">
            Decision Comparison
          </h3>
          <MdCompareArrows className="text-yellow-400 text-3xl animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scene.choices.map((choice, index) => (
            <div 
              key={index} 
              className={`p-5 rounded-lg border ${index === 0 ? 'border-blue-400 bg-blue-900/20' : 'border-purple-400 bg-purple-900/20'} 
                transform transition-all hover:scale-[1.02] hover:shadow-lg hover:z-10 relative overflow-hidden`}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              {/* Choice header with icon */}
              <div className="flex items-center gap-2 mb-3">
                {index === 0 ? 
                  <FaBalanceScale className="text-blue-400 text-xl" /> : 
                  <BsLightningChargeFill className="text-purple-400 text-xl" />
                }
                <h4 className="text-xl font-game">{choice.text}</h4>
              </div>
              
              {choice.detailedInfo && (
                <>
                  {/* Short-term impact section */}
                  {choice.detailedInfo.shortTermImpact && (
                    <div className="mb-4 bg-black/30 p-3 rounded-lg border border-yellow-500/20">
                      <h5 className="text-yellow-300 text-sm font-bold mb-2 flex items-center gap-1">
                        <BsLightningChargeFill className="inline-block" /> Short-term Impact:
                      </h5>
                      <ul className="text-sm space-y-2">
                        {choice.detailedInfo.shortTermImpact.financial !== undefined && (
                          <li className="flex items-center gap-2">
                            <span className="text-yellow-200">Financial:</span> 
                            <span className={choice.detailedInfo.shortTermImpact.financial >= 0 ? "text-green-400" : "text-red-400"}>
                              ${choice.detailedInfo.shortTermImpact.financial.toLocaleString()}
                            </span>
                          </li>
                        )}
                        {choice.detailedInfo.shortTermImpact.wellBeing !== undefined && (
                          <li className="flex items-center gap-2">
                            <span className="text-yellow-200">Well-Being:</span>
                            <span className={choice.detailedInfo.shortTermImpact.wellBeing >= 0 ? "text-green-400" : "text-red-400"}>
                              {choice.detailedInfo.shortTermImpact.wellBeing > 0 ? '+' : ''}{choice.detailedInfo.shortTermImpact.wellBeing}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {/* Long-term impact section */}
                  {choice.detailedInfo.longTermImpact && (
                    <div className="mb-4 bg-black/30 p-3 rounded-lg border border-yellow-500/20">
                      <h5 className="text-yellow-300 text-sm font-bold mb-2 flex items-center gap-1">
                        <IoMdTime className="inline-block" /> Long-term Impact:
                      </h5>
                      <ul className="text-sm space-y-2">
                        {choice.detailedInfo.longTermImpact.financial && (
                          <li className="flex items-center gap-2">
                            <span className="text-yellow-200">Financial:</span> 
                            {renderImpactLabel(choice.detailedInfo.longTermImpact.financial)}
                          </li>
                        )}
                        {choice.detailedInfo.longTermImpact.career && (
                          <li className="flex items-center gap-2">
                            <span className="text-yellow-200">Career:</span> 
                            {renderImpactLabel(choice.detailedInfo.longTermImpact.career)}
                          </li>
                        )}
                        {choice.detailedInfo.longTermImpact.satisfaction && (
                          <li className="flex items-center gap-2">
                            <span className="text-yellow-200">Satisfaction:</span> 
                            {renderImpactLabel(choice.detailedInfo.longTermImpact.satisfaction)}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    {/* Risk level */}
                    {choice.detailedInfo.riskLevel && (
                      <div className="bg-black/30 p-2 rounded-lg border border-yellow-500/20 flex items-center gap-2">
                        <FaExclamationTriangle className="text-yellow-300" />
                        <div>
                          <span className="text-yellow-300 text-xs font-bold">Risk Level: </span>
                          <span className="text-sm">{renderImpactLabel(choice.detailedInfo.riskLevel)}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Time commitment */}
                    {choice.detailedInfo.timeCommitment && (
                      <div className="bg-black/30 p-2 rounded-lg border border-yellow-500/20 flex items-center gap-2">
                        <FaClock className="text-yellow-300" />
                        <div>
                          <span className="text-yellow-300 text-xs font-bold">Time: </span>
                          <span className="text-sm">{choice.detailedInfo.timeCommitment}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {/* Benefits */}
                    {choice.detailedInfo.benefits && choice.detailedInfo.benefits.length > 0 && (
                      <div className="bg-green-900/20 p-3 rounded-lg border border-green-500/30">
                        <h5 className="text-green-300 text-sm font-bold mb-1 flex items-center gap-1">
                          <FaCheck className="text-green-400" /> Benefits:
                        </h5>
                        <ul className="list-none pl-1 text-xs space-y-1">
                          {choice.detailedInfo.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-green-400 mt-0.5">•</span> {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Drawbacks */}
                    {choice.detailedInfo.drawbacks && choice.detailedInfo.drawbacks.length > 0 && (
                      <div className="bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                        <h5 className="text-red-300 text-sm font-bold mb-1 flex items-center gap-1">
                          <FaTimes className="text-red-400" /> Drawbacks:
                        </h5>
                        <ul className="list-none pl-1 text-xs space-y-1">
                          {choice.detailedInfo.drawbacks.map((drawback, idx) => (
                            <li key={idx} className="flex items-start gap-1">
                              <span className="text-red-400 mt-0.5">•</span> {drawback}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {/* Insight/preview note */}
              {choice.preview && choice.preview.qualitativeNote && (
                <div className="mt-4 p-3 bg-amber-950/40 border border-yellow-400/30 rounded-md">
                  <div className="text-xs font-game text-yellow-200/90 italic leading-relaxed tracking-wide flex gap-2">
                    <FaRegLightbulb className="text-yellow-400 text-lg flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-yellow-400 font-bold block mb-1">Insight: </span>
                      {choice.preview.qualitativeNote.map((note, idx) => (
                        <span key={idx} className="block mb-1 last:mb-0">{note}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          <GameButton 
            onClick={onClose}
            variant="secondary"
            className="text-sm z-20 flex items-center gap-1"
          >
            <TbArrowBack className="text-lg" />
            Return
          </GameButton>
          <GameButton 
            onClick={onReadyToDecide}
            variant="primary"
            className="text-sm z-20 flex items-center gap-1"
          >
            <MdOutlineCheckCircle className="text-lg" />
            Ready to Decide
          </GameButton>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal; 