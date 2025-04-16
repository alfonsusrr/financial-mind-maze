import React, { useEffect, useState } from 'react';
import { EndingScene } from '../../types/games';
import SceneContainer from '../ui/SceneContainer';
import GameButton from '../ui/GameButton';
import { BsArrowRight, BsTrophy } from 'react-icons/bs';
import { FaChartLine, FaRegSmile, FaBrain } from 'react-icons/fa';
import { useGame } from '../GameEngine';

interface EndingSceneProps {
  scene: EndingScene;
  onRestart?: () => void; // Optional restart handler
  onNext?: () => void; // Optional next level handler
}

const EndingSceneComponent: React.FC<EndingSceneProps> = ({ scene, onRestart, onNext }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { gameState } = useGame();
  
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 400);
    const statsTimer = setTimeout(() => setShowStats(true), 1500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  // Financial history graph component
  const FinancialHistoryGraph = () => {
    if (gameState.financialHistory.length <= 1) {
      return <div className="text-gray-300 text-center p-4 font-game">Not enough data to display financial history.</div>;
    }

    // Calculate min and max values for scaling, including 0 in the range
    const allValues = [
        ...gameState.financialHistory.map(entry => entry.netWorth),
        ...gameState.financialHistory.map(entry => entry.income)
    ];
    const minValue = Math.min(0, ...allValues); // Ensure 0 is included for y-axis reference
    const maxValue = Math.max(0, ...allValues);
    const valueRange = maxValue - minValue;

    // Handle edge case where range is 0 (all values are the same)
    const effectiveRange = valueRange === 0 ? 1 : valueRange; // Avoid division by zero
    const effectiveMinValue = valueRange === 0 ? minValue - 0.5 : minValue; // Adjust min slightly if range is 0

    // Graph dimensions and padding - wider and less tall
    const height = 140;
    const width = 400;
    const padding = 25;
    const graphWidth = width - (padding * 2);
    const graphHeight = height - (padding * 2);

    // Normalize value to graph height (inverted for SVG coordinate system)
    const normalizeValue = (value: number) => {
      // Handle the case where all values are the same
      if (valueRange === 0) {
          return padding + graphHeight / 2; // Center vertically
      }
      const scaledValue = ((value - effectiveMinValue) / effectiveRange) * graphHeight;
      return graphHeight - scaledValue + padding; // Invert Y-axis and add padding
    };

    // Get X position based on index
    const getXPosition = (index: number, total: number) => {
      if (total <= 1) return padding + graphWidth / 2; // Center horizontally for single point
      return (index / (total - 1)) * graphWidth + padding;
    };

    // Calculate Y position for the zero line
    const zeroLineY = normalizeValue(0);

    // Generate path data and points for net worth line
    const netWorthPathData = gameState.financialHistory.map((entry, index, array) => {
      const x = getXPosition(index, array.length);
      const y = normalizeValue(entry.netWorth);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');

    const netWorthPoints = gameState.financialHistory.map((entry, index, array) => ({
      x: getXPosition(index, array.length),
      y: normalizeValue(entry.netWorth),
    }));

    // Generate path data and points for income line
    const incomePathData = gameState.financialHistory.map((entry, index, array) => {
      const x = getXPosition(index, array.length);
      const y = normalizeValue(entry.income);
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(' ');

    const incomePoints = gameState.financialHistory.map((entry, index, array) => ({
      x: getXPosition(index, array.length),
      y: normalizeValue(entry.income),
    }));

    // Function to format large numbers (optional, for axis labels)
    const formatAxisLabel = (value: number): string => {
      if (Math.abs(value) >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}K`;
      return value.toFixed(0);
    };

    return (
      <div className="financial-graph bg-black/40 p-3 rounded-lg border border-purple-400/30 shadow-lg mb-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg text-purple-300 font-game flex items-center gap-2 text-shadow shadow-purple-500/50">
            <FaChartLine className="text-purple-400" /> Financial Journey
          </h3>
          
          {/* Legend - Moved to header row for better space usage */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
              <span className="text-xs font-game text-sky-200">Net Worth</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80]"></span>
              <span className="text-xs font-game text-green-200">Income</span>
            </div>
          </div>
        </div>

        <svg width={width} height={height} className="mx-auto font-game overflow-visible">
          {/* Y-axis Labels (Min/Max/Zero) */}
          <text x={padding - 8} y={padding} textAnchor="end" alignmentBaseline="central" fontSize="9" fill="#a78bfa">{formatAxisLabel(maxValue)}</text>
          <text x={padding - 8} y={height - padding} textAnchor="end" alignmentBaseline="central" fontSize="9" fill="#a78bfa">{formatAxisLabel(minValue)}</text>
          {/* Show 0 label only if it's not too close to min or max */}
          {minValue < 0 && maxValue > 0 && Math.abs(zeroLineY - padding) > 10 && Math.abs(zeroLineY - (height - padding)) > 10 && (
            <text x={padding - 8} y={zeroLineY} textAnchor="end" alignmentBaseline="central" fontSize="9" fill="#a78bfa">0</text>
          )}

          {/* Grid lines */}
          {/* Horizontal grid lines (adjust count based on range?) */}
           {Array.from({ length: 3 }).map((_, i) => (
            <line
              key={`h-grid-${i}`}
              x1={padding}
              // Calculate y based on linear scale between min and max
              y1={normalizeValue(minValue + (i * effectiveRange / 2))}
              x2={padding + graphWidth}
              y2={normalizeValue(minValue + (i * effectiveRange / 2))}
              stroke="#4a044e"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: Math.min(gameState.financialHistory.length, 6) }).map((_, i, arr) => (
            <line
              key={`v-grid-${i}`}
              x1={getXPosition(i * Math.floor((gameState.financialHistory.length - 1) / Math.max(1, arr.length - 1)), gameState.financialHistory.length)}
              y1={padding}
              x2={getXPosition(i * Math.floor((gameState.financialHistory.length - 1) / Math.max(1, arr.length - 1)), gameState.financialHistory.length)}
              y2={padding + graphHeight}
              stroke="#4a044e"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* X Axis Base Line (Bottom) */}
          <line x1={padding} y1={height - padding} x2={graphWidth + padding} y2={height - padding} stroke="#a855f7" strokeWidth="1" />
          {/* Y Axis Base Line (Left) */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#a855f7" strokeWidth="1" />

          {/* Zero Line (if applicable) */}
          {minValue < 0 && maxValue > 0 && (
             <line
              x1={padding}
              y1={zeroLineY}
              x2={padding + graphWidth}
              y2={zeroLineY}
              stroke="#a855f7"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          )}

          {/* Net Worth line */}
          <path d={netWorthPathData} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {netWorthPoints.map((point, index) => (
            <circle key={`nw-point-${index}`} cx={point.x} cy={point.y} r="2.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1"/>
          ))}

          {/* Income line */}
          <path d={incomePathData} fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {incomePoints.map((point, index) => (
            <circle key={`inc-point-${index}`} cx={point.x} cy={point.y} r="2.5" fill="#4ade80" stroke="#1e293b" strokeWidth="1"/>
          ))}

          {/* Axis Labels */}
          <text x={padding + graphWidth / 2} y={height - padding + 15} textAnchor="middle" fontSize="9" fill="#a78bfa" className="font-game">Time</text>
          <text x={padding - 15} y={padding + graphHeight / 2} textAnchor="middle" transform={`rotate(-90, ${padding - 10}, ${padding + graphHeight / 2})`} fontSize="9" fill="#a78bfa" className="font-game">Value</text>
        </svg>
      </div>
    );
  };

  return (
    <SceneContainer 
      background={scene.background} 
      videoBackground={scene.background.replace('.png', '.mp4')}
    >
      <div className="flex h-full items-center justify-center pt-16 pb-4">
        <div className={`scene-info w-full max-w-3xl bg-black/75 p-5 rounded-lg border-2 border-purple-400/50 transform transition-all duration-700 flex flex-col ${showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} backdrop-blur-sm shadow-xl`}>
          <h2 className="scene-title text-2xl font-game text-purple-400 text-shadow-lg shadow-purple-600/50 mb-2 animate-float flex items-center gap-2 justify-center sticky top-0 py-1 rounded-t-lg z-10">
            <BsTrophy className="text-purple-300 text-lg" />
            {scene.title}
            <BsTrophy className="text-purple-300 text-lg" />
          </h2>
          
          <div className="scene-description bg-black/30 p-3 rounded-md border border-purple-200/20 shadow-inner mb-3">
            <p className="text-purple-100 font-game leading-relaxed text-base tracking-wide text-center" style={{ whiteSpace: 'pre-wrap' }}>
              {scene.description}
            </p>
          </div>
          
          {showStats && (
            <div className={`ending-summary flex flex-col gap-3 bg-black/50 p-4 rounded-lg border border-purple-500/20 mb-3 transform transition-all duration-700 animate-fade-in`} style={{ animationDelay: '0.5s' }}>
              {/* Financial History Graph */}
              <div className="md:col-span-2">
                <FinancialHistoryGraph />
              </div>
              
              {/* Score Display */}
              <div className="p-3 bg-gradient-to-r from-purple-900/10 to-transparent border-l-2 border-purple-500/50 rounded-r-lg">
                <div className="flex gap-3 items-center">
                  <FaBrain className="text-purple-400 text-base w-8" />
                  <div>
                    <p className="text-purple-300 font-bold text-lg">Score: {scene.score}/100</p>
                  </div>
                </div>
              </div>
              
              {/* Qualitative Summary */}
              <div className="p-3 bg-gradient-to-r from-purple-900/20 to-transparent border border-purple-500/30 rounded-lg">
                <h4 className="text-purple-300 font-game mb-1 flex items-center gap-2 text-base">
                  <FaRegSmile className="text-purple-400" /> Journey Summary
                </h4>
                <p className="text-purple-100 text-sm leading-relaxed">{scene.qualitativeSummary}</p>
              </div>
            </div>
          )}
          
          <div className="mt-auto pt-2">
            <div className="flex justify-center gap-4">
              {onRestart && (
                <GameButton 
                  onClick={onRestart} 
                  variant="secondary"
                  className="flex items-center justify-center gap-2 px-5 py-1.5 text-base"
                >
                  Play Again
                </GameButton>
              )}
              
              {onNext && (
                <GameButton 
                  onClick={onNext} 
                  variant="action"
                  className="animate-pulse hover:animate-none flex items-center justify-center gap-2 px-5 py-1.5 text-base"
                >
                  Next Level <BsArrowRight className="text-lg" />
                </GameButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </SceneContainer>
  );
};

export default EndingSceneComponent;