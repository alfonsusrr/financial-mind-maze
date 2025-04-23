'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { GameScene, StatUpdate, DecisionScene, OutcomeScene, InsightScene, EventScene, EndingScene, LevelInitialStats } from '../types/games'; // Import specific scene types and LevelInitialStats
import level1Data, { initialStats as level1InitialStats } from '../data/level1'; // Import level data and initial stats
import level2Data, { initialStats as level2InitialStats } from '../data/level2';
import level3Data, { initialStats as level3InitialStats } from '../data/level3';
import level4Data, { initialStats as level4InitialStats } from '../data/level4';
import level5Data, { initialStats as level5InitialStats } from '../data/level5';
import level6Data, { initialStats as level6InitialStats } from '../data/level6';

// Define types for our game
export interface PlayerStats {
  cash: number; // Available liquid money
  debt: number; // Money owed (loans, etc)
  netWorth: number; // Calculated as cash + portfolioValue - debt
  income: number; // Annual income
  wellBeing: number; // -10 to 10 scale
  age: number;
  qualitativeNotes: string[];
  portfolioValue: number; // Total value of investments portfolio
  portfolioContribution: number; // Annual contribution to portfolio
  portfolioGrowthRate: number; // Annual growth rate (decimal, e.g., 0.08 for 8%)
  portfolioInvestedAmount: number; // Total amount invested in portfolio (excluding growth)
  realizedGain: number; // Total realized gain/loss from selling investments
  unrealizedGain: number; // Current unrealized gain/loss (portfolioValue - portfolioInvestedAmount)
  totalInvestedCapital: number; // Total cash ever invested into the portfolio
  totalReturnPercentage: number; // Total percentage return across realized and unrealized gains
  totalValueRealized: number; // Total value of all investments that have been realized/sold
}

export type GameState = {
  currentLevel: number;
  currentSceneId: string | null;
  playerStats: PlayerStats;
  gameHistory: string[];
  gameCompleted: boolean;
  showLevelSelect: boolean;
  financialHistory: { 
    cash: number;
    debt: number;
    netWorth: number;
    income: number;
    sceneId: string;
    portfolioValue: number;
    realizedGain: number;
    unrealizedGain: number;
    totalReturnPercentage: number;
    totalValueRealized: number;
    totalInvestedCapital: number;
  }[];
  // Track decision scores for ending selection
  decisionScores: number[];
  averageScore: number;
  // Add asset loading tracking
  isLoading: boolean;
  loadingProgress: number;
};

type GameContextType = {
  gameState: GameState;
  currentSceneData: GameScene | null; // Add current scene data to context
  startGame: (level: number) => void; // Allow passing level data
  makeChoice: (nextSceneId: string) => void; // Simplified choice handler
  handleNext: () => void; // For progressing from outcome/insight scenes
  resetGame: () => void; // Allow passing level data
  preloadLevelAssets: (level: number) => Promise<void>; // Add preloading function
};

// Get the initial scene ID from level data
const getInitialSceneId = (levelData: GameScene[] | null): string | null => {
  if (!levelData) return null;
  return levelData?.[0]?.id || null;
}

// Default fallback initial player stats if level data doesn't provide them
const defaultInitialPlayerStats: PlayerStats = {
  cash: 5000, // Starting cash
  debt: 0, // Starting with no debt
  netWorth: 5000, // Initially equals cash since debt is 0 and portfolio is 0
  income: 0,
  wellBeing: 0,
  age: 22,
  qualitativeNotes: [],
  portfolioValue: 0,
  portfolioContribution: 0,
  portfolioGrowthRate: 0,
  portfolioInvestedAmount: 0,
  realizedGain: 0,
  unrealizedGain: 0,
  totalInvestedCapital: 0,
  totalReturnPercentage: 0,
  totalValueRealized: 0,
};

// Initial financial history with starting values
const getInitialFinancialHistory = (stats: LevelInitialStats, sceneId: string = '') => [
  { 
    cash: stats.cash, 
    debt: stats.debt,
    netWorth: stats.cash + stats.portfolioValue - stats.debt,
    income: stats.income, 
    sceneId: sceneId, 
    portfolioValue: stats.portfolioValue,
    realizedGain: 0,
    unrealizedGain: 0,
    totalReturnPercentage: 0,
    totalValueRealized: 0,
    totalInvestedCapital: stats.portfolioValue,
  }
];

// Helper function to convert LevelInitialStats to PlayerStats
const initializePlayerStats = (stats: LevelInitialStats): PlayerStats => {
  return {
    ...stats,
    netWorth: stats.cash + stats.portfolioValue - stats.debt,
    qualitativeNotes: [], // Add array not in LevelInitialStats
    portfolioInvestedAmount: stats.portfolioValue, // Initially, invested amount equals portfolio value
    realizedGain: 0, // Start with no realized gain/loss
    unrealizedGain: 0, // Start with no unrealized gain/loss
    totalInvestedCapital: stats.portfolioValue, // Initially, total invested equals initial value
    totalReturnPercentage: 0, // Start with 0% return
    totalValueRealized: 0, // Start with no realized value
  };
};

// Helper function to get level data and initial stats
const getLevelData = (level: number): { scenes: GameScene[], initialStats: LevelInitialStats } => {
  switch (level) {
    case 1:
      return { scenes: level1Data, initialStats: level1InitialStats };
    case 2:
      return { scenes: level2Data, initialStats: level2InitialStats };
    case 3:
      return { scenes: level3Data, initialStats: level3InitialStats };
    case 4:
      return { scenes: level4Data, initialStats: level4InitialStats };
    case 5:
      return { scenes: level5Data, initialStats: level5InitialStats };
    case 6:
      return { scenes: level6Data, initialStats: level6InitialStats };
    default:
      return { scenes: [], initialStats: defaultInitialPlayerStats as LevelInitialStats };
  }
}

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

// Add preloading utilities
const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve();
      return;
    }

    console.log(`Starting preload for image: ${url}`);
    const img = new Image();
    let resolved = false;

    // Set a timeout to avoid hanging indefinitely
    const timeout = setTimeout(() => {
      if (!resolved) {
        console.warn(`Image preload timed out: ${url}`);
        resolved = true;
        resolve(); // Resolve anyway to continue loading other assets
      }
    }, 10000); // 10 second timeout

    img.onload = () => {
      if (!resolved) {
        clearTimeout(timeout);
        console.log(`Successfully preloaded image: ${url}`);
        resolved = true;
        resolve();
      }
    };

    img.onerror = (err) => {
      if (!resolved) {
        clearTimeout(timeout);
        console.warn(`Failed to preload image: ${url}`, err);
        resolved = true;
        resolve(); // Resolve anyway to continue loading other assets
      }
    };

    // Start loading the image
    img.src = url;

    // For some browsers, if the image is cached, onload might not trigger
    // so we check if it's already complete
    if (img.complete) {
      clearTimeout(timeout);
      console.log(`Image was already cached: ${url}`);
      resolved = true;
      resolve();
    }
  });
};

const preloadVideo = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!url) {
      resolve();
      return;
    }

    console.log(`Starting preload for video: ${url}`);
    const video = document.createElement('video');
    let resolved = false;

    // Set a timeout to avoid hanging indefinitely
    const timeout = setTimeout(() => {
      if (!resolved) {
        console.warn(`Video preload timed out: ${url}`);
        resolved = true;
        resolve(); // Resolve anyway to continue loading other assets
      }
    }, 15000); // 15 second timeout for video (longer than images)

    video.preload = 'auto';
    
    video.oncanplaythrough = () => {
      if (!resolved) {
        clearTimeout(timeout);
        console.log(`Successfully preloaded video: ${url}`);
        resolved = true;
        resolve();
      }
    };

    video.onerror = (err) => {
      if (!resolved) {
        clearTimeout(timeout);
        console.warn(`Failed to preload video: ${url}`, err);
        resolved = true;
        resolve(); // Resolve anyway to continue loading other assets
      }
    };

    // Start loading the video
    video.src = url;
    video.load();
  });
};

const preloadAsset = (url: string): Promise<void> => {
  if (!url) return Promise.resolve();
  
  const fileExtension = url.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(fileExtension || '')) {
    return preloadImage(url);
  } else if (['mp4', 'webm', 'ogg'].includes(fileExtension || '')) {
    return preloadVideo(url);
  }
  
  return Promise.resolve();
};

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
  const preloadLevelAssets = useCallback(async (level: number): Promise<void> => {
    const { scenes } = getLevelData(level);
    const assetUrls: string[] = [];
    
    // Extract assets directly in this function to avoid type issues
    scenes.forEach(scene => {
      // For background images - use correct property name and handle all formats
      if ((scene as any).background) {
        assetUrls.push((scene as any).background);
      } else if ((scene as any).backgroundImage) {
        assetUrls.push((scene as any).backgroundImage);
      }
      
      // Extract character images if present
      if ((scene as any).character) {
        assetUrls.push((scene as any).character);
      } else if ((scene as any).characterImage) {
        assetUrls.push((scene as any).characterImage);
      }
      
      // Extract video URLs if present
      if ((scene as any).video) {
        assetUrls.push((scene as any).video);
      } else if ((scene as any).videoUrl) {
        assetUrls.push((scene as any).videoUrl);
      }
      
      // Extract any other media assets based on scene type
      if (scene.type === 'decision') {
        // Process decision choices for images
        try {
          const decisionScene = scene as any;
          if (decisionScene.choices && Array.isArray(decisionScene.choices)) {
            decisionScene.choices.forEach((choice: any) => {
              if (choice && choice.image) {
                assetUrls.push(choice.image);
              }
            });
          }
        } catch (err) {
          console.warn("Error processing decision scene choice images:", err);
        }
      }
      
      // Check for media property in any scene type
      if ((scene as any).media) {
        assetUrls.push((scene as any).media);
      }
    });
    
    // Debug what assets were found
    console.log(`Found ${assetUrls.length} assets to preload for level ${level}:`, assetUrls);
    
    // Remove duplicates and invalid entries
    const uniqueUrls = [...new Set(assetUrls)].filter(url => url && typeof url === 'string');
    
    if (uniqueUrls.length === 0) {
      setGameState(prev => ({ ...prev, isLoading: false, loadingProgress: 100 }));
      return;
    }
    
    // Set loading state to true
    setGameState(prev => ({ ...prev, isLoading: true, loadingProgress: 0 }));
    
    let loadedCount = 0;
    const totalAssets = uniqueUrls.length;
    
    // Load assets concurrently but track progress sequentially
    for (const url of uniqueUrls) {
      try {
        await preloadAsset(url);
        console.log(`Successfully preloaded: ${url}`);
      } catch (error) {
        console.warn(`Failed to preload asset: ${url}`, error);
      }
      
      loadedCount++;
      
      // Update progress
      const progress = Math.round((loadedCount / totalAssets) * 100);
      setGameState(prev => ({ ...prev, loadingProgress: progress }));
    }
    
    // Set loading complete
    setGameState(prev => ({ ...prev, isLoading: false, loadingProgress: 100 }));
    console.log(`Completed preloading ${loadedCount} assets for level ${level}`);
  }, []);

  const [levelData, setLevelData] = useState<GameScene[]>([]); // Store current level data
  const [gameState, setGameState] = useState<GameState>(() => {
     // Load from localStorage after initial state is defined
     if (typeof window !== 'undefined') {
         const savedState = localStorage.getItem('financialMindMazeGameState');
         if (savedState) {
             try {
                const loadedState = JSON.parse(savedState);
                // load levelData based on the current level
                switch (loadedState.currentLevel) {
                    case 1:
                      setLevelData(getLevelData(1).scenes);
                      break;
                    case 2:
                      setLevelData(getLevelData(2).scenes);
                      break;
                    default:
                      setLevelData([]);
                }

                // Basic validation to ensure loaded state has the necessary structure
                if (loadedState.currentSceneId && loadedState.playerStats) {
                    return loadedState;
                }
             } catch (e) {
                console.error("Failed to parse saved game state:", e);
                // Fallback to initial state if parsing fails
             }
         }
     }
     // Initialize state, potentially loading from localStorage
     const { scenes: initialLevelScenes, initialStats } = getLevelData(1);
     const initialSceneId = getInitialSceneId(initialLevelScenes);
     const initialState: GameState = {
        currentLevel: 0, // Assuming level 1 starts
        currentSceneId: initialSceneId,
        playerStats: initializePlayerStats(initialStats),
        gameHistory: initialSceneId ? [initialSceneId] : [],
        gameCompleted: false,
        showLevelSelect: false,
        financialHistory: getInitialFinancialHistory(initialStats, initialSceneId || ''),
        decisionScores: [], // Initialize empty scores array
        averageScore: 0,
        isLoading: false,
        loadingProgress: 0,
     };
     return initialState; // Return initial state if no valid saved state
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('financialMindMazeGameState', JSON.stringify(gameState));
    }
  }, [gameState]);

  // Add a function to select the appropriate ending based on averageScore
  const selectEndingBasedOnScore = useCallback((endingScenes: EndingScene[]): string | undefined => {
    // Sort endings by scoreThreshold in descending order
    const sortedEndings = [...endingScenes].sort((a, b) => 
      (b.scoreThreshold || 0) - (a.scoreThreshold || 0)
    );
    
    // Find the first ending where the player's average score meets or exceeds the threshold
    for (const ending of sortedEndings) {
      if (gameState.averageScore >= (ending.scoreThreshold || 0)) {
        return ending.id;
      }
    }
    
    // If no thresholds are met, return the ending with the lowest threshold
    return sortedEndings[sortedEndings.length - 1]?.id;
  }, [gameState.averageScore]);

  // Derive current scene data
  const currentSceneData = levelData.find(scene => scene.id === gameState.currentSceneId) || null;

  // --- State Update Logic ---
  const applyStatUpdate = useCallback((update: StatUpdate | undefined) => {
      if (!update) return; // Do nothing if no update object

      setGameState(prev => {
          // Calculate income earned during the age change period
          const ageChange = update.ageChange ?? 0;

          // Initialize new stats based on previous state, copying necessary arrays
          const newStats: PlayerStats = {
              ...prev.playerStats,
              qualitativeNotes: [...prev.playerStats.qualitativeNotes],
              // We will calculate cash, debt, portfolio values etc. based on changes
          };

          // Helper function to parse change value (number or percentage string)
          const parseChange = (changeValue: number | string | undefined, currentValue: number): number => {
            if (typeof changeValue === 'number') {
              return changeValue;
            }
            if (typeof changeValue === 'string' && changeValue.endsWith('%')) {
              const percentage = parseFloat(changeValue.slice(0, -1));
              if (!isNaN(percentage)) {
                return (percentage / 100) * currentValue;
              }
            }
            return 0; // Default to 0 if invalid format or undefined
          };

          // --- Pre-calculate potential changes to base stats like income, contribution rate, growth rate ---
          // Apply income changes first as they might affect percentage-based contributions
          if (update.incomeChange !== undefined) {
            const incomeDelta = parseChange(update.incomeChange, prev.playerStats.income);
            newStats.income += incomeDelta;
          }

          // Apply portfolio contribution changes (absolute amount or based on *new* income if percentage)
          if (update.portfolioContribution !== undefined) {
            if (typeof update.portfolioContribution === 'string' && update.portfolioContribution.endsWith('%')) {
              const percentageStr = update.portfolioContribution.slice(0, -1);
              const percentage = parseFloat(percentageStr);
              if (!isNaN(percentage)) {
                // Set absolute amount based on potentially updated income
                newStats.portfolioContribution = (percentage / 100) * newStats.income;
              }
            } else {
              // Handle absolute contribution amounts or delta changes relative to previous contribution rate
              const contributionDelta = parseChange(update.portfolioContribution, prev.playerStats.portfolioContribution);
              newStats.portfolioContribution += contributionDelta;
            }
          }

          // Apply portfolio growth rate changes
          if (update.portfolioGrowthRate !== undefined) {
            if (typeof update.portfolioGrowthRate === 'number') {
              newStats.portfolioGrowthRate = update.portfolioGrowthRate; // Set directly as absolute value
            } else if (typeof update.portfolioGrowthRate === 'string' && update.portfolioGrowthRate.endsWith('%')) {
              const percentage = parseFloat(update.portfolioGrowthRate.slice(0, -1));
              if (!isNaN(percentage)) {
                newStats.portfolioGrowthRate = percentage / 100; // Convert percentage to decimal
              }
            }
          }

          // --- Initialize working values for stats affected by multiple factors ---
          let currentCash = prev.playerStats.cash;
          let currentDebt = prev.playerStats.debt;
          let currentPortfolioValue = prev.playerStats.portfolioValue;
          let currentInvestedAmount = prev.playerStats.portfolioInvestedAmount;
          let currentRealizedGain = prev.playerStats.realizedGain;
          let currentTotalValueRealized = prev.playerStats.totalValueRealized;
          let currentWellBeing = prev.playerStats.wellBeing;
          let currentTotalInvestedCapital = prev.playerStats.totalInvestedCapital;

          // --- Apply age-related changes (income addition, contributions, growth) ---
          if (ageChange > 0) {
            // 1. Add income earned over the period to cash
            currentCash += newStats.income * ageChange; // Use updated income rate

            // 2. Add contributions to portfolio
            const contributionAmount = newStats.portfolioContribution * ageChange; // Use updated contribution rate
            if (contributionAmount > 0) {
                 currentPortfolioValue += contributionAmount;
                 currentInvestedAmount += contributionAmount; // Contributions increase invested amount
                 currentTotalInvestedCapital += contributionAmount; // Contributions also increase total capital invested
                 newStats.qualitativeNotes.push(`Contributed $${(contributionAmount).toFixed(2)} to portfolio over ${ageChange} year(s).`);
            }

            // 3. Apply portfolio growth (compounded)
            if (currentPortfolioValue > 0 && newStats.portfolioGrowthRate !== 0) {
                const growthFactor = (1 + newStats.portfolioGrowthRate) ** ageChange;
                const valueBeforeGrowth = currentPortfolioValue;
                currentPortfolioValue *= growthFactor;
                const growthAmount = currentPortfolioValue - valueBeforeGrowth;
                if (Math.abs(growthAmount) > 0.01) { // Only note if there's noticeable growth/loss
                    newStats.qualitativeNotes.push(`Portfolio value changed by $${growthAmount.toFixed(2)} due to market growth/decline over ${ageChange} year(s).`);
                }
            }
          }


          // --- Process Portfolio Liquidation (Sale for Cash) ---
          let liquidationProcessed = false;
          if (update.cashChange !== undefined && typeof update.cashChange === "string" && update.cashChange.startsWith("portfolioValueChange")) {
            liquidationProcessed = true; // Flag that this handles the portfolio value change
            let liquidationPercentage = 100;

            // Check for partial liquidation specification (e.g., "portfolioValueChange:50%")
              if (update.cashChange.includes(":")) {
                const percentStr = update.cashChange.split(":")[1].replace("%", "");
                const parsedPercentage = parseFloat(percentStr);
                if (!isNaN(parsedPercentage) && parsedPercentage > 0 && parsedPercentage <= 100) {
                  liquidationPercentage = parsedPercentage;
                }
              }
              
            const effectivePortfolioValue = currentPortfolioValue; // Value *before* this specific sale
            const effectiveInvestedAmount = currentInvestedAmount;

            // Ensure we don't try to liquidate more than exists
            const liquidationAmount = Math.min(effectivePortfolioValue, (effectivePortfolioValue * liquidationPercentage) / 100);

            console.log(`Attempting to liquidate ${liquidationPercentage}% ($${liquidationAmount.toFixed(2)}) from portfolio value $${effectivePortfolioValue.toFixed(2)}`);

            if (liquidationAmount > 0 && effectivePortfolioValue > 0) {
              // Calculate proportion accurately based on actual amount being liquidated
              const proportionSold = liquidationAmount / effectivePortfolioValue;

              // Calculate how much of the invested amount corresponds to what's sold
              const investedAmountSold = effectiveInvestedAmount * proportionSold;

              // Calculate realized gain/loss for this specific sale
              const realizedGainFromSale = liquidationAmount - investedAmountSold;

              // Update core stats
              currentRealizedGain += realizedGainFromSale;
              currentTotalValueRealized += liquidationAmount; // Track total value obtained from sales
              currentCash += liquidationAmount; // Add proceeds to cash
              currentPortfolioValue -= liquidationAmount; // Decrease portfolio value
              currentInvestedAmount -= investedAmountSold; // Decrease invested amount proportionally

              // Add qualitative notes
              const gainOrLossText = realizedGainFromSale > 0 ? `a gain of $${realizedGainFromSale.toFixed(2)}` :
                                     realizedGainFromSale < 0 ? `a loss of $${Math.abs(realizedGainFromSale).toFixed(2)}` :
                                     `breakeven`;
                if (liquidationPercentage === 100) {
                 newStats.qualitativeNotes.push(`Liquidated entire portfolio for ${gainOrLossText}. $${liquidationAmount.toFixed(2)} added to cash.`);
                  } else {
                 newStats.qualitativeNotes.push(`Liquidated ${liquidationPercentage}% ($${liquidationAmount.toFixed(2)}) of portfolio for ${gainOrLossText}. Funds added to cash.`);
              }

            } else {
              newStats.qualitativeNotes.push(`Attempted to liquidate portfolio, but no value was available.`);
            }
          }

          // --- Process Other Cash Changes (Non-Liquidation) ---
          if (update.cashChange !== undefined && !liquidationProcessed) {
              const cashDelta = parseChange(update.cashChange, prev.playerStats.cash); // Delta based on original cash for percentages
              currentCash += cashDelta;
              // Add qualitative note about cash changes
              if (cashDelta > 0) {
                newStats.qualitativeNotes.push(`Received $${cashDelta.toFixed(2)} cash.`);
              } else if (cashDelta < 0) {
                newStats.qualitativeNotes.push(`Spent $${Math.abs(cashDelta).toFixed(2)} from cash.`);
              }
            }


          // --- Process Direct Portfolio Value Changes (Investments / Market Adjustments) ---
          // This block should NOT run if a liquidation occurred in the same step, as that handled value changes.
          if (update.portfolioValueChange !== undefined && !liquidationProcessed) {
             // Calculate delta based on the portfolio value *before* this specific change
             const valueBeforeDirectChange = currentPortfolioValue;
             const portfolioValueDelta = parseChange(update.portfolioValueChange, valueBeforeDirectChange);

             if (portfolioValueDelta > 0) {
                 // Positive change: Considered a new Investment
                 currentPortfolioValue += portfolioValueDelta;
                 currentInvestedAmount += portfolioValueDelta; // Investment increases the invested amount basis
                 currentTotalInvestedCapital += portfolioValueDelta; // Investment increases total capital invested
                 newStats.qualitativeNotes.push(`Invested an additional $${portfolioValueDelta.toFixed(2)} into the portfolio.`);
             } else if (portfolioValueDelta < 0) {
                 // Negative change: Considered a Market Fluctuation or write-down (Affects Unrealized Gain)
                 const newValue = currentPortfolioValue + portfolioValueDelta;
                 currentPortfolioValue = Math.max(0, newValue); // Don't let market value drop below zero
                 // NOTE: This does NOT generate cash or realized gain. It reduces the asset's value.
                 // Invested amount remains the same unless it's a complete write-off (not explicitly handled here).
                 const actualChange = currentPortfolioValue - valueBeforeDirectChange; // How much it actually changed (due to floor at 0)
                 if (Math.abs(actualChange) > 0.01) {
                     newStats.qualitativeNotes.push(`Portfolio market value changed by $${actualChange.toFixed(2)}.`);
                     if (valueBeforeDirectChange > 0) {
                         const pctChange = (actualChange / valueBeforeDirectChange) * 100;
                         newStats.qualitativeNotes.push(`Market value change: ${pctChange.toFixed(1)}%.`);
                     }
                 }
             }
          }


          // --- Apply Debt Changes ---
          if (update.debtChange !== undefined) {
            const debtDelta = parseChange(update.debtChange, prev.playerStats.debt);
            currentDebt += debtDelta;
            if (debtDelta > 0) {
                newStats.qualitativeNotes.push(`Took on $${debtDelta.toFixed(2)} in new debt.`);
            } else if (debtDelta < 0) {
                newStats.qualitativeNotes.push(`Paid off $${Math.abs(debtDelta).toFixed(2)} in debt.`);
            }
          }

          // --- Apply WellBeing Changes ---
          if (update.wellBeingChange !== undefined) {
            const newWellBeing = currentWellBeing + update.wellBeingChange;
            // Ensure wellBeing stays within -10 to 10 range
            currentWellBeing = Math.max(-10, Math.min(10, newWellBeing));
            // Note: Could add qualitative note about well-being change if desired
          }

          // --- Add Explicit Qualitative Notes from Update ---
          if (update.qualitativeNote) {
            newStats.qualitativeNotes.push(update.qualitativeNote);
          }

          // --- Finalize Primary Stats ---
          newStats.cash = Math.round(currentCash * 100) / 100; // Round to avoid floating point issues
          newStats.debt = Math.round(currentDebt * 100) / 100;
          newStats.portfolioValue = Math.round(currentPortfolioValue * 100) / 100;
          newStats.portfolioInvestedAmount = Math.round(currentInvestedAmount * 100) / 100;
          newStats.realizedGain = Math.round(currentRealizedGain * 100) / 100;
          newStats.totalValueRealized = Math.round(currentTotalValueRealized * 100) / 100;
          newStats.wellBeing = currentWellBeing;
          newStats.totalInvestedCapital = Math.round(currentTotalInvestedCapital * 100) / 100;

          // Prevent negative values where they don't make sense
          newStats.portfolioValue = Math.max(0, newStats.portfolioValue);
          newStats.portfolioInvestedAmount = Math.max(0, newStats.portfolioInvestedAmount);
          newStats.cash = Math.max(0, newStats.cash); // Or allow negative cash? Depends on game design. Assuming >= 0 for now.
          newStats.debt = Math.max(0, newStats.debt);


          // --- Calculate Derived Stats ---
          newStats.netWorth = newStats.cash + newStats.portfolioValue - newStats.debt;
          newStats.unrealizedGain = newStats.portfolioValue - newStats.portfolioInvestedAmount;

          const totalGain = newStats.realizedGain + newStats.unrealizedGain;
          // Total investment base = total capital ever put into the portfolio
          const totalInvestedCapitalBase = newStats.totalInvestedCapital;

          console.log(` --- Stats Update Cycle ---`);
          console.log(` Age Change: ${ageChange}`);
          console.log(` Update Payload:`, update);
          console.log(` Prev Stats:`, prev.playerStats);
          console.log(` --- Intermediate ---`);
          console.log(` Income: ${newStats.income}, Contribution: ${newStats.portfolioContribution}, Growth Rate: ${newStats.portfolioGrowthRate}`);
          console.log(` Liquidation Processed: ${liquidationProcessed}`);
          console.log(` --- Final Primary ---`);
          console.log(` Cash: ${newStats.cash}, Debt: ${newStats.debt}, Portfolio Value: ${newStats.portfolioValue}, Invested Amt: ${newStats.portfolioInvestedAmount}`);
          console.log(` Realized Gain: ${newStats.realizedGain}, Total Value Realized: ${newStats.totalValueRealized}`);
          console.log(` --- Final Derived ---`);
          console.log(` Net Worth: ${newStats.netWorth}, Unrealized Gain: ${newStats.unrealizedGain}`);
          console.log(` Total Gain: ${totalGain}, Total Invested Capital: ${totalInvestedCapitalBase}`);


          if (totalInvestedCapitalBase > 0 && Math.abs(totalInvestedCapitalBase) > 0.01) { // Avoid division by zero or near-zero
            const previousReturnPct = prev.playerStats.totalReturnPercentage;
            newStats.totalReturnPercentage = (totalGain / totalInvestedCapitalBase) * 100;
            
            // Only add a note if the return percentage changed significantly
            const changePct = Math.abs(newStats.totalReturnPercentage - previousReturnPct);
            // Add note if it's the first time calculating or if change is significant
            if (changePct > 1 || prev.playerStats.totalReturnPercentage === 0 && newStats.totalReturnPercentage !== 0) {
                 const roundedReturn = newStats.totalReturnPercentage.toFixed(1);
              if (newStats.totalReturnPercentage > previousReturnPct) {
                     newStats.qualitativeNotes.push(`Your total investment return increased to ${roundedReturn}%.`);
              } else if (newStats.totalReturnPercentage < previousReturnPct) {
                     newStats.qualitativeNotes.push(`Your total investment return decreased to ${roundedReturn}%.`);
                 } else if (prev.playerStats.totalReturnPercentage === 0 && newStats.totalReturnPercentage !== 0) {
                     newStats.qualitativeNotes.push(`Your total investment return is now ${roundedReturn}%.`);
              }
            }
          } else {
            // Handle case where no capital was ever invested
            if (prev.playerStats.totalReturnPercentage !== 0) {
                newStats.qualitativeNotes.push(`Investment return percentage is reset as no capital is invested.`);
            }
            newStats.totalReturnPercentage = 0;
          }

          // Apply age update *last*
          newStats.age = prev.playerStats.age + ageChange; // Calculate based on previous age

          console.log(` Final Stats:`, newStats);
          console.log(` --- End Stats Update Cycle ---`);

          return { ...prev, playerStats: newStats };
      });
  }, []); // Dependencies removed as we now use `prev` state directly

  // --- Game Flow Logic ---
  const advanceToScene = useCallback((sceneId: string | undefined) => {
        if (!sceneId) {
            console.error("Attempted to advance to undefined scene ID");
            return;
        }

        // Special handling for dynamic ending selection based on score
        if (sceneId.includes('ending_selector')) {
          // Find all ending scenes for the current level
          const endingScenes = levelData.filter(
              scene => scene.type === 'ending'
          ) as EndingScene[];
          
          if (endingScenes.length > 0) {
              // Select appropriate ending based on score
              const selectedEndingId = selectEndingBasedOnScore(endingScenes);
              if (selectedEndingId) {
                  console.log(`Selected ending: ${selectedEndingId} based on score: ${gameState.averageScore}`);
                  sceneId = selectedEndingId; // Override the destination with selected ending
              }
          }
      }

        const nextScene = levelData.find(scene => scene.id === sceneId);
        if (!nextScene) {
            console.error(`Scene with ID ${sceneId} not found!`);
            return;
        }


        // Apply outcome *before* setting the new scene state
        if (nextScene.type === 'outcome' || nextScene.type === 'event') {
            applyStatUpdate((nextScene as OutcomeScene | EventScene).outcome);
        } else if (nextScene.type === 'insight') {
            applyStatUpdate((nextScene as InsightScene).outcome);
        }

         // Handle ending scene separately? Or just update state?
         const isEnding = nextScene.type === 'ending';


        setGameState(prev => {
            // Update financial history with current stats
            const updatedFinancialHistory = [
                ...prev.financialHistory,
                {
                    cash: prev.playerStats.cash,
                    debt: prev.playerStats.debt,
                    netWorth: prev.playerStats.netWorth,
                    income: prev.playerStats.income,
                    sceneId: sceneId || '',
                    portfolioValue: prev.playerStats.portfolioValue,
                    realizedGain: prev.playerStats.realizedGain,
                    unrealizedGain: prev.playerStats.unrealizedGain,
                    totalReturnPercentage: prev.playerStats.totalReturnPercentage,
                    totalValueRealized: prev.playerStats.totalValueRealized,
                    totalInvestedCapital: prev.playerStats.totalInvestedCapital
                }
            ];

            return {
                ...prev,
                currentSceneId: sceneId,
                gameHistory: [...prev.gameHistory, sceneId || ''],
                gameCompleted: isEnding,
                financialHistory: updatedFinancialHistory
            };
        });

  }, [levelData, applyStatUpdate, gameState.averageScore, selectEndingBasedOnScore]);


  const makeChoice = useCallback((nextSceneId: string) => {
      // Find the current scene
      const currentScene = levelData.find(scene => scene.id === gameState.currentSceneId);
      if (currentScene?.type === 'decision') {
        // Find the selected choice
        const selectedChoice = (currentScene as DecisionScene).choices.find(choice => choice.nextSceneId === nextSceneId);
        
        // If choice has a score, add it to the decisionScores array and update average
        if (selectedChoice?.score !== undefined) {
          setGameState(prev => {
            const newScores = [...prev.decisionScores, selectedChoice.score!];
            const newAverageScore = newScores.length > 0
              ? Math.round(newScores.reduce((sum, score) => sum + score, 0) / newScores.length)
              : 0;
            return {
              ...prev,
              decisionScores: newScores,
              averageScore: newAverageScore // Update average score here
            };
          });
        }
      }
      
      // No need to find the scene here, advanceToScene will handle it and apply effects
      advanceToScene(nextSceneId);
  }, [advanceToScene, gameState.currentSceneId, levelData]);


  const handleNext = useCallback(() => {
      if (!currentSceneData) return;

      let nextSceneId: string | undefined = undefined;
      let nextLevel: number | undefined = undefined; // Track if we are changing levels

      switch (currentSceneData.type) {
          case 'outcome':
          case 'insight':
          case 'event':
            nextSceneId = (currentSceneData as OutcomeScene | InsightScene | EventScene).nextSceneId;
            break;
          case 'ending':
            // Calculate average score before transitioning to next level
            setGameState(prev => {
              const scores = prev.decisionScores;
              const avgScore = scores.length > 0 
                ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) 
                : 0;
              
              return {
                ...prev,
                averageScore: avgScore,
                isLoading: true, // Set loading to true before level transition
                loadingProgress: 0
              };
            });
            
            // Determine the next level and its start scene
            nextLevel = gameState.currentLevel + 1;
            const { scenes: nextLevelScenes } = getLevelData(nextLevel); // Get data for the *next* level
            const initialSceneId = getInitialSceneId(nextLevelScenes);
            // Fix type issue by ensuring initialSceneId is converted to string | undefined
            nextSceneId = initialSceneId || undefined;

            if (!nextSceneId || nextLevelScenes.length === 0) {
                console.error(`Could not find starting scene for level ${nextLevel}, or level data is empty. Ending game or resetting.`);
                // TODO: Implement proper end-of-all-levels logic if desired
                // Use a function expression instead of resetGame to avoid circular reference
                const { scenes: resetLevelScenes, initialStats: resetInitialStats } = getLevelData(1);
                setGameState(prevState => ({
                  ...prevState,
                  currentLevel: 1,
                  currentSceneId: getInitialSceneId(resetLevelScenes) || '',
                  playerStats: initializePlayerStats(resetInitialStats),
                  gameHistory: [],
                  gameCompleted: false,
                  showLevelSelect: false,
                  financialHistory: getInitialFinancialHistory(resetInitialStats),
                  decisionScores: [],
                  averageScore: 0,
                  isLoading: true,
                  loadingProgress: 0
                }));
                
                // Preload level 1 assets
                preloadLevelAssets(1);
                return;
            }
            break;
          default:
              console.warn(`handleNext called on non-progressible scene type: ${currentSceneData.type}`);
              return; // Don't advance if it's not an applicable scene type
      }

      if (nextSceneId) {
          if (nextLevel !== undefined) {
               // --- Level Transition ---
               console.log(`Advancing to level ${nextLevel}, start scene: ${nextSceneId}`);
               
               // Get initial stats for the next level
               const { initialStats: nextLevelInitialStats } = getLevelData(nextLevel);
               
               setGameState(prev => ({
                   ...prev,
                   currentLevel: nextLevel!,
                   currentSceneId: nextSceneId!,
                   gameHistory: [...prev.gameHistory, nextSceneId!],
                   // Reset financial stats using level-specific initial stats
                   playerStats: initializePlayerStats(nextLevelInitialStats),
                   gameCompleted: false,
                   showLevelSelect: false,
                   financialHistory: getInitialFinancialHistory(nextLevelInitialStats, nextSceneId!),
                   // Reset decision scores for new level
                   decisionScores: [],
                   averageScore: 0,
                   isLoading: true, // Set loading to true for level transition
                   loadingProgress: 0
               }));
               
               // Preload assets for the next level
               preloadLevelAssets(nextLevel);
          } else {
               // --- Same Level Scene Transition ---
               // Use advanceToScene for transitions within the same level.
               // advanceToScene will handle finding the scene in the current levelData and applying outcomes.
               advanceToScene(nextSceneId);
          }
      } else {
          console.error(`Scene ${currentSceneData.id} (type: ${currentSceneData.type}) is missing a valid nextSceneId or logic to determine it.`);
          // Potential issue: An outcome/insight/event scene doesn't link anywhere.
      }

  }, [currentSceneData, gameState.currentLevel, advanceToScene, preloadLevelAssets]);


  // Modify startGame to use level-specific initial stats
  const startGame = useCallback((level: number = 1): void => {
    // Special case: if level is -1, show level selection screen
    if (level === -1) {
      console.log("Setting showLevelSelect to true");
      setGameState(prev => ({
        ...prev,
        showLevelSelect: true,
        currentLevel: 0 // Reset to intro level
      }));
      return;
    }

    console.log(`Starting game at level: ${level}`);
    const { scenes: initialLevelScenes, initialStats } = getLevelData(level);
    const initialSceneId = getInitialSceneId(initialLevelScenes);

    if (level !== 0 && (initialLevelScenes.length === 0 || !initialSceneId)) {
        console.error(`Cannot start game: Invalid level (${level}) or no starting scene found.`);
        // Fallback to level 1 if the requested level is invalid
        if (level !== 0) {  // Removed level 1 check to allow reset to level 0
            console.warn("Falling back to Level 1.");
            startGame(1); // Recursive call with level 1
        }
        return; // Stop execution if level is invalid
    }

    // Clear previous saved state *before* setting new state
    if (typeof window !== 'undefined') {
      localStorage.removeItem('financialMindMazeGameState');
      console.log("Cleared previous game state from localStorage.");
    }

    // Initialize player stats with portfolio gain tracking
    const playerStats = initializePlayerStats(initialStats);
    
    // Set the game state completely, which will trigger effects
    setGameState({
        currentLevel: level,
        currentSceneId: initialSceneId || '',
        playerStats: playerStats,
        gameHistory: [initialSceneId || ''],
        gameCompleted: false,
        showLevelSelect: false, // Reset to false when starting a specific level
        financialHistory: [{
            cash: playerStats.cash,
            debt: playerStats.debt,
            netWorth: playerStats.netWorth,
            income: playerStats.income,
            sceneId: initialSceneId || '',
            portfolioValue: playerStats.portfolioValue,
            realizedGain: playerStats.realizedGain,
            unrealizedGain: playerStats.unrealizedGain,
            totalReturnPercentage: playerStats.totalReturnPercentage,
            totalValueRealized: playerStats.totalValueRealized,
            totalInvestedCapital: playerStats.totalInvestedCapital
        }],
        decisionScores: [], // Initialize empty scores array for new game
        averageScore: 0,
        isLoading: true, // Set loading to true initially
        loadingProgress: 0,
    });

    // Start preloading assets for the level
    preloadLevelAssets(level);

    // The useEffect watching gameState.currentLevel will automatically
    // call setLevelData(initialLevelData) when the gameState is updated above.
  }, [preloadLevelAssets]);


  const resetGame = useCallback((): void => {
    console.log("Resetting game...");
    startGame(0); // Reset is starting the game again at level 0
  }, [startGame]);

  // Context Value
  const contextValue: GameContextType = {
    gameState,
    currentSceneData,
    startGame,
    makeChoice,
    handleNext,
    resetGame,
    preloadLevelAssets, // Add the preloading function to context
  };

  // Effect to synchronize levelData when gameState.currentLevel changes
  useEffect(() => {
    const { scenes } = getLevelData(gameState.currentLevel);
    setLevelData(scenes);
    console.log(`Level data updated for level ${gameState.currentLevel}`);
  }, [gameState.currentLevel]); // Rerun only when the level number changes

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook for accessing the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 