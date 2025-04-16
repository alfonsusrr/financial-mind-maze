'use client';

import { useGame } from './GameEngine';
import { useEffect, useState, useRef } from 'react';

// Add CSS animations 
const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadein {
    animation: fadeIn 0.2s ease-out forwards;
  }
`;

type GameHUDProps = {
  showBalance?: boolean;
  showLevel?: boolean;
  showIncome?: boolean;
  showAge?: boolean;
  showWellBeing?: boolean;
  showPortfolio?: boolean;
  showScore?: boolean;
};

// Helper function to get color based on well-being value (-10 to 10)
const getWellBeingColor = (value: number): string => {
  if (value >= 8) return 'from-green-400 to-green-600'; // Very Happy
  if (value >= 5) return 'from-green-300 to-green-500'; // Happy
  if (value >= 2) return 'from-lime-300 to-lime-500'; // Somewhat Happy
  if (value >= 0) return 'from-yellow-300 to-yellow-500'; // Neutral (positive)
  if (value >= -2) return 'from-yellow-400 to-amber-500'; // Neutral (negative)
  if (value >= -5) return 'from-orange-400 to-orange-600'; // Somewhat Stressed
  if (value >= -8) return 'from-red-400 to-red-500'; // Stressed
  return 'from-red-600 to-red-700'; // Very Stressed
};

// Helper function to get emoji based on well-being value
const getWellBeingEmoji = (value: number): string => {
  if (value >= 8) return '😄'; // Very Happy
  if (value >= 5) return '😊'; // Happy
  if (value >= 2) return '🙂'; // Somewhat Happy
  if (value >= 0) return '😐'; // Neutral (positive)
  if (value >= -2) return '😕'; // Neutral (negative)
  if (value >= -5) return '😣'; // Somewhat Stressed
  if (value >= -8) return '😫'; // Stressed
  return '😰'; // Very Stressed
};

// Helper function to get label based on well-being value
const getWellBeingLabel = (value: number): string => {
  if (value >= 8) return 'Thriving';
  if (value >= 5) return 'Happy';
  if (value >= 2) return 'Content';
  if (value >= 0) return 'Balanced';
  if (value >= -2) return 'Uneasy';
  if (value >= -5) return 'Stressed';
  if (value >= -8) return 'Struggling';
  return 'Overwhelmed';
};

// Helper function to get color based on growth rate
const getGrowthRateColor = (rate: number): string => {
  if (rate >= 0.08) return 'text-green-400'; // Excellent growth
  if (rate >= 0.06) return 'text-green-500'; // Good growth
  if (rate >= 0.04) return 'text-lime-500'; // Moderate growth
  if (rate >= 0.02) return 'text-yellow-500'; // Low growth
  return 'text-amber-500'; // Poor growth
};

// Helper function to get color and sign for portfolio gain/loss
const getPortfolioGainInfo = (currentValue: number, investedAmount: number, realizedGain: number, totalReturnPercentage: number) => {
  // Use total return percentage for color and badge
  const isPositive = totalReturnPercentage >= 0;
  
  // Return color classes and formatted values based on percentage range
  const getBadgeColor = () => {
    if (totalReturnPercentage >= 20) return 'bg-emerald-600 text-white';
    if (totalReturnPercentage >= 10) return 'bg-green-600 text-white';
    if (totalReturnPercentage >= 5) return 'bg-green-500 text-white';
    if (totalReturnPercentage > 0) return 'bg-green-400 text-gray-800';
    if (totalReturnPercentage > -5) return 'bg-red-400 text-gray-800';
    if (totalReturnPercentage > -10) return 'bg-red-500 text-white';
    if (totalReturnPercentage > -20) return 'bg-red-600 text-white';
    return 'bg-red-700 text-white';
  };
  
  return {
    color: getBadgeColor(),
    sign: isPositive ? '+' : '-',
    percent: Math.abs(totalReturnPercentage).toFixed(1) + '%'
  };
};

// Helper function to get color based on score
const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-indigo-400'; // Excellent
  if (score >= 80) return 'text-blue-400'; // Great
  if (score >= 70) return 'text-green-400'; // Good
  if (score >= 60) return 'text-lime-400'; // Satisfactory
  if (score >= 50) return 'text-yellow-400'; // Average
  if (score >= 40) return 'text-amber-400'; // Below Average
  if (score >= 30) return 'text-orange-400'; // Poor
  return 'text-red-400'; // Very Poor
};

// Helper to safely format percentages
const safeFormatPercentage = (value: number | undefined): string => {
  if (value === undefined || isNaN(value)) return '0.0%';
  return (value * 100).toFixed(1) + '%';
};

export function GameHUD({ 
  showBalance = true, 
  showLevel = true, 
  showIncome = true, 
  showAge = true, 
  showWellBeing = true,
  showPortfolio = true,
  showScore = true
}: GameHUDProps) {
  const { gameState, resetGame } = useGame();
  const { currentLevel, playerStats } = gameState;
  
  // State for dropdown toggles
  const [showFinanceDetails, setShowFinanceDetails] = useState(false);
  const [showPortfolioDetails, setShowPortfolioDetails] = useState(false);
  
  // Animation states for various metrics
  const [prevWellBeing, setPrevWellBeing] = useState(playerStats.wellBeing);
  const [isWellBeingChanging, setIsWellBeingChanging] = useState(false);
  
  const [prevNetWorth, setPrevNetWorth] = useState(playerStats.netWorth);
  const [isNetWorthChanging, setIsNetWorthChanging] = useState(false);
  
  const [prevIncome, setPrevIncome] = useState(playerStats.income);
  const [isIncomeChanging, setIsIncomeChanging] = useState(false);
  
  const [prevPortfolioValue, setPrevPortfolioValue] = useState(playerStats.portfolioValue);
  const [isPortfolioValueChanging, setIsPortfolioValueChanging] = useState(false);
  
  const [prevScore, setPrevScore] = useState(gameState.averageScore);
  const [isScoreChanging, setIsScoreChanging] = useState(false);
  
  // Detect value changes and trigger animations
  useEffect(() => {
    // Well-being changes
    if (playerStats.wellBeing !== prevWellBeing) {
      setIsWellBeingChanging(true);
      const timer = setTimeout(() => setIsWellBeingChanging(false), 1000);
      setPrevWellBeing(playerStats.wellBeing);
      return () => clearTimeout(timer);
    }
    
    // Net worth changes
    if (playerStats.netWorth !== prevNetWorth) {
      setIsNetWorthChanging(true);
      const timer = setTimeout(() => setIsNetWorthChanging(false), 1000);
      setPrevNetWorth(playerStats.netWorth);
      return () => clearTimeout(timer);
    }
    
    // Income changes
    if (playerStats.income !== prevIncome) {
      setIsIncomeChanging(true);
      const timer = setTimeout(() => setIsIncomeChanging(false), 1000);
      setPrevIncome(playerStats.income);
      return () => clearTimeout(timer);
    }
    
    // Portfolio value changes
    if (playerStats.portfolioValue !== prevPortfolioValue) {
      setIsPortfolioValueChanging(true);
      const timer = setTimeout(() => setIsPortfolioValueChanging(false), 1000);
      setPrevPortfolioValue(playerStats.portfolioValue);
      return () => clearTimeout(timer);
    }
    
    // Score changes
    if (gameState.averageScore !== prevScore) {
      setIsScoreChanging(true);
      const timer = setTimeout(() => setIsScoreChanging(false), 1000);
      setPrevScore(gameState.averageScore);
      return () => clearTimeout(timer);
    }
  }, [
    playerStats.wellBeing, prevWellBeing,
    playerStats.netWorth, prevNetWorth,
    playerStats.income, prevIncome,
    playerStats.portfolioValue, prevPortfolioValue,
    gameState.averageScore, prevScore
  ]);

  // Calculate position for the well-being meter (convert -10 to 10 scale to 0-100%)
  const wellBeingPercentage = ((playerStats.wellBeing + 10) / 20) * 100;
  
  // Handle outside clicks for dropdowns
  const financeDropdownRef = useRef<HTMLDivElement>(null);
  const portfolioDropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (financeDropdownRef.current && !financeDropdownRef.current.contains(event.target as Node)) {
        setShowFinanceDetails(false);
      }
      if (portfolioDropdownRef.current && !portfolioDropdownRef.current.contains(event.target as Node)) {
        setShowPortfolioDetails(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <style jsx global>{fadeInAnimation}</style>
      
      {/* Overlay when dropdowns are visible */}
      {(showFinanceDetails || showPortfolioDetails) && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" 
          onClick={() => {
            setShowFinanceDetails(false);
            setShowPortfolioDetails(false);
          }}
        />
      )}
      
      <div className={`game-hud fixed top-0 left-0 right-0 z-50 ${currentLevel !== 0 ? 'block' : 'hidden'}`}>
        <div className="w-full max-w-6xl mx-auto px-2">
          {/* Compact top bar */}
          <div className="flex items-center gap-3 p-2 bg-black/70 backdrop-blur-sm border-b border-gray-700 rounded-b-lg shadow-lg">
            {/* Game info section */}
            <div className="flex items-center gap-3 mr-auto">
              {showLevel && currentLevel > 0 && (
                <div className="bg-gradient-to-r from-yellow-800 to-amber-600 px-3 py-1 rounded-md shadow-inner shadow-amber-900/50 border border-amber-500/30">
                  <span className="font-game text-xs text-amber-200/90 font-bold">LEVEL</span>
                  <span className="font-game text-lg text-white ml-1 font-bold">{currentLevel}</span>
                </div>
              )}
              {showAge && currentLevel > 0 && (
                <div className="bg-gradient-to-r from-purple-800 to-indigo-600 px-3 py-1 rounded-md shadow-inner shadow-indigo-900/50 border border-indigo-500/30">
                  <span className="font-game text-xs text-indigo-200/90 font-bold">AGE</span>
                  <span className="font-game text-lg text-white ml-1 font-bold">{playerStats.age.toFixed(1)}</span>
                </div>
              )}
              {showScore && currentLevel > 0 && (
                <div className={`bg-gradient-to-r from-violet-800 to-purple-600 px-3 py-1 rounded-md shadow-inner shadow-purple-900/50 border border-purple-500/30 ${isScoreChanging ? 'scale-105' : ''} transition-all duration-300`}>
                  <span className="font-game text-xs text-purple-200/90 font-bold">SCORE</span>
                  <span className={`font-game text-lg text-white ml-1 font-bold ${getScoreColor(gameState.averageScore)}`}>
                    {gameState.averageScore}
                  </span>
                </div>
              )}
            </div>
            
            {/* Well-being meter */}
            {showWellBeing && currentLevel > 0 && (
              <div className={`px-2 py-1 rounded-md bg-gray-900/80 border border-indigo-600/50 flex items-center gap-2 ${isWellBeingChanging ? 'scale-105' : ''} transition-all duration-300`}>
                <span className="text-xl">{getWellBeingEmoji(playerStats.wellBeing)}</span>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-game text-sm font-bold ${getWellBeingColor(playerStats.wellBeing).split(' ')[1]}`}>
                      {playerStats.wellBeing}
                    </span>
                    <span className={`font-game text-xs ${getWellBeingColor(playerStats.wellBeing).split(' ')[1]}`}>
                      {getWellBeingLabel(playerStats.wellBeing)}
                    </span>
                  </div>
                  <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getWellBeingColor(playerStats.wellBeing)} transition-all duration-500`}
                      style={{ width: `${wellBeingPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Financial info */}
            <div className="flex items-center gap-2 relative" ref={financeDropdownRef}>
              {showBalance && currentLevel > 0 && (
                <button 
                  onClick={() => setShowFinanceDetails(!showFinanceDetails)}
                  className={`px-3 py-1 rounded-md bg-gray-900/80 border ${playerStats.netWorth < 0 ? 'border-red-500/50' : 'border-green-500/50'} flex items-center gap-2 ${isNetWorthChanging ? 'scale-105' : ''} transition-all duration-300 hover:bg-gray-800/90 hover:border-opacity-80 ${showFinanceDetails ? 'ring-2 ring-blue-500/50' : ''}`}
                >
                  <span className="text-lg">💰</span>
                  <div className="flex flex-col items-start">
                    <span className={`font-game text-base font-bold ${playerStats.netWorth < 0 ? 'text-red-400' : 'text-green-400'}`}>
                      ${(playerStats.netWorth || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                    </span>
                    <span className="text-xs text-gray-400">Net Worth</span>
                  </div>
                  <span className={`text-xs opacity-50 transition-transform duration-200 ${showFinanceDetails ? 'rotate-180' : ''}`}>▼</span>
                </button>
              )}
              
              {/* Finance dropdown */}
              {showFinanceDetails && (
                <div className="absolute top-full mt-2 right-0 w-64 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-md shadow-xl shadow-black/50 z-50 p-3 animate-fadein">
                  <h3 className="font-game text-gray-300 text-sm border-b border-gray-700 pb-1 mb-3 flex items-center">
                    <span className="text-sm mr-1">💰</span>
                    Financial Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                        Cash:
                      </span>
                      <span className="font-game font-bold text-green-400">
                        ${(playerStats.cash || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>
                        Debt:
                      </span>
                      <span className="font-game font-bold text-red-400">
                        ${(playerStats.debt || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                        Net Worth:
                      </span>
                      <span className={`font-game font-bold ${playerStats.netWorth < 0 ? 'text-red-400' : 'text-blue-400'}`}>
                        ${(playerStats.netWorth || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                        Annual Income:
                      </span>
                      <span className="font-game font-bold text-blue-400">
                        ${(playerStats.income || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-1 italic">
                      Net Worth = Cash + Portfolio Value - Debt
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Income indicator */}
            {showIncome && currentLevel > 0 && (
              <div className={`px-3 py-1 rounded-md bg-gray-900/80 border border-blue-500/50 flex items-center gap-2 ${isIncomeChanging ? 'scale-105' : ''} transition-all duration-300`}>
                <span className="text-lg">💵</span>
                <div className="flex flex-col items-start">
                  <span className="font-game text-base font-bold text-blue-400">
                    ${(playerStats.income || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                  <span className="text-xs text-gray-400">Annual Income</span>
                </div>
              </div>
            )}
            
            {/* Portfolio info */}
            {showPortfolio && currentLevel > 0 && (
              <div className="flex items-center gap-2 relative" ref={portfolioDropdownRef}>
                <button 
                  onClick={() => setShowPortfolioDetails(!showPortfolioDetails)}
                  className={`px-3 py-1 rounded-md bg-gray-900/80 border border-cyan-500/50 flex items-center gap-2 ${isPortfolioValueChanging ? 'scale-105' : ''} transition-all duration-300 hover:bg-gray-800/90 hover:border-opacity-80 ${showPortfolioDetails ? 'ring-2 ring-cyan-500/50' : ''}`}
                >
                  <span className="text-lg">📈</span>
                  <div className="flex flex-col items-start min-w-[110px]">
                    <div className="flex items-center">
                      <span className="font-game text-base font-bold text-cyan-400">
                        ${(playerStats.portfolioValue || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </span>
                      {playerStats.portfolioInvestedAmount > 0 && (
                        <div className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-bold ${getPortfolioGainInfo(playerStats.portfolioValue, playerStats.portfolioInvestedAmount, playerStats.realizedGain, playerStats.totalReturnPercentage).color}`}>
                          {getPortfolioGainInfo(playerStats.portfolioValue, playerStats.portfolioInvestedAmount, playerStats.realizedGain, playerStats.totalReturnPercentage).sign}
                          {getPortfolioGainInfo(playerStats.portfolioValue, playerStats.portfolioInvestedAmount, playerStats.realizedGain, playerStats.totalReturnPercentage).percent}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">Portfolio</span>
                  </div>
                  <span className={`text-xs opacity-50 transition-transform duration-200 ${showPortfolioDetails ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                {/* Portfolio dropdown */}
                {showPortfolioDetails && (
                  <div className="absolute top-full mt-2 right-0 w-80 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-md shadow-xl shadow-black/50 z-50 p-3 animate-fadein">
                    <h3 className="font-game text-gray-300 text-sm border-b border-gray-700 pb-1 mb-3 flex items-center">
                      <span className="text-sm mr-1">📈</span>
                      Portfolio Details
                    </h3>
                    
                    {/* Current Value Section */}
                    <div className="mb-4 bg-gray-800/60 p-2 rounded-md border border-gray-700/50">
                      <h4 className="font-game text-xs text-gray-400 mb-2 flex items-center">
                        <span className="text-cyan-400 mr-1.5">💰</span>
                        CURRENT POSITION
                      </h4>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Current Value:</span>
                        <span className="font-game font-bold text-cyan-400">
                          ${(playerStats.portfolioValue || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Invested:</span>
                        <span className="font-game font-bold text-blue-400">
                          ${(playerStats.portfolioInvestedAmount || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </span>
                      </div>
                    </div>
                    
                    {/* Performance Section */}
                    <div className="mb-4 bg-gray-800/60 p-2 rounded-md border border-gray-700/50">
                      <h4 className="font-game text-xs text-gray-400 mb-2 flex items-center">
                        <span className="text-green-400 mr-1.5">✨</span>
                        PERFORMANCE
                      </h4>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Unrealized Gain:</span>
                        <span className={`font-game font-bold ${playerStats.unrealizedGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {playerStats.unrealizedGain >= 0 ? '+' : '-'}$
                          {Math.abs(playerStats.unrealizedGain).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Realized Gain:</span>
                        <span className={`font-game font-bold ${playerStats.realizedGain >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {playerStats.realizedGain >= 0 ? '+' : '-'}$
                          {Math.abs(playerStats.realizedGain).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-700/50 pt-2 mt-1">
                        <span className="text-gray-300 text-sm font-semibold">Total Return:</span>
                        <span className={`font-game font-bold ${playerStats.totalReturnPercentage >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {playerStats.totalReturnPercentage >= 0 ? '+' : '-'}
                          {Math.abs(playerStats.totalReturnPercentage).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Strategy Section */}
                    <div className="bg-gray-800/60 p-2 rounded-md border border-gray-700/50">
                      <h4 className="font-game text-xs text-gray-400 mb-2 flex items-center">
                        <span className="text-amber-400 mr-1.5">⚙️</span>
                        INVESTMENT STRATEGY
                      </h4>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Annual Contribution:</span>
                        <span className="font-game font-bold text-teal-400">
                          ${(playerStats.portfolioContribution || 0).toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Growth Rate:</span>
                        <span className={`font-game font-bold ${getGrowthRateColor(playerStats.portfolioGrowthRate || 0)}`}>
                          {safeFormatPercentage(playerStats.portfolioGrowthRate)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 mt-3 italic text-center">
                      Unrealized: Current holdings | Realized: Sold investments
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Reset button */}
            <button 
              onClick={() => resetGame()}
              className="ml-1 font-game text-xs bg-red-900/80 hover:bg-red-800/90 text-white py-1 px-2 rounded-md border border-red-600/50 hover:border-red-500/70 transition-all duration-200 shadow-sm hover:shadow-red-500/20"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </>
  );
}