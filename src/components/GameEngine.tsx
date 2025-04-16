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
  }[];
  // Track decision scores for ending selection
  decisionScores: number[];
  averageScore: number;
};

type GameContextType = {
  gameState: GameState;
  currentSceneData: GameScene | null; // Add current scene data to context
  startGame: (level: number) => void; // Allow passing level data
  makeChoice: (nextSceneId: string) => void; // Simplified choice handler
  handleNext: () => void; // For progressing from outcome/insight scenes
  resetGame: () => void; // Allow passing level data
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
    totalValueRealized: 0
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

// Provider component
export function GameProvider({ children }: { children: ReactNode }) {
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
          // Initialize new stats based on previous state
          const newStats: PlayerStats = {
              ...prev.playerStats,
              cash: prev.playerStats.cash,
              debt: prev.playerStats.debt,
              netWorth: prev.playerStats.netWorth,
              qualitativeNotes: [...prev.playerStats.qualitativeNotes], // Ensure array is copied
              realizedGain: prev.playerStats.realizedGain,
              unrealizedGain: prev.playerStats.unrealizedGain,
              totalReturnPercentage: prev.playerStats.totalReturnPercentage
          };

          const earnedIncome = newStats.income * ageChange; // Assumes income is per year and ageChange is in years

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

          // Apply portfolio contribution changes FIRST (before income changes)
          // This ensures contributions are calculated based on current income
          if (update.portfolioContribution !== undefined) {
            // Handle percentage-based contributions (calculate from income)
            if (typeof update.portfolioContribution === 'string' && update.portfolioContribution.endsWith('%')) {
              const percentageStr = update.portfolioContribution.slice(0, -1);
              const percentage = parseFloat(percentageStr);
              if (!isNaN(percentage)) {
                // Set to absolute amount based on current income
                newStats.portfolioContribution = (percentage / 100) * prev.playerStats.income;
              }
            } else {
              // Handle absolute contribution amounts or delta changes
              const contributionDelta = parseChange(update.portfolioContribution, prev.playerStats.portfolioContribution);
              newStats.portfolioContribution += contributionDelta;
            }
          }

          // Calculate financial changes if age changes
          if (ageChange > 0) {
            // For each year that passes add income and 
            newStats.cash += newStats.income * ageChange;
              
            // Add contribution to portfolio value
            const contributionAmount = newStats.portfolioContribution * ageChange;
            newStats.portfolioValue += contributionAmount;
            
            // Also track the contribution in the invested amount
            newStats.portfolioInvestedAmount += contributionAmount;

            // Add growth
            newStats.portfolioValue *= (1 + newStats.portfolioGrowthRate) ** ageChange;
          }

          // Apply income changes AFTER portfolio contribution calculation
          if (update.incomeChange !== undefined) {
            const incomeDelta = parseChange(update.incomeChange, prev.playerStats.income);
            newStats.income += incomeDelta;
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

          // Store the initial portfolio value before any changes
          const initialPortfolioValue = newStats.portfolioValue;
          const initialInvestedAmount = newStats.portfolioInvestedAmount;

          // Apply cash changes - handle special portfolioValueChange case when portfolio is liquidated
          if (update.cashChange !== undefined) {
            if (typeof update.cashChange === "string" && update.cashChange.startsWith("portfolioValueChange")) {
              // Portfolio liquidation case - check if partial liquidation is specified
              let liquidationPercentage = 100; // Default to 100% (full liquidation)
              
              // Check if a specific percentage is specified (e.g., "portfolioValueChange:50%")
              if (update.cashChange.includes(":")) {
                const percentStr = update.cashChange.split(":")[1].replace("%", "");
                const parsedPercentage = parseFloat(percentStr);
                if (!isNaN(parsedPercentage) && parsedPercentage > 0 && parsedPercentage <= 100) {
                  liquidationPercentage = parsedPercentage;
                }
              }
              
              // Calculate the amount to liquidate based on percentage
              const liquidationAmount = (newStats.portfolioValue * liquidationPercentage) / 100;
              
              if (liquidationAmount <= 0 || newStats.portfolioValue <= 0) {
                // Nothing to liquidate, skip
                newStats.qualitativeNotes.push(`No portfolio value to liquidate.`);
              } else {
                // 1. Calculate the proportion being sold
                const proportionSold = liquidationAmount / newStats.portfolioValue;
                
                // 2. Calculate how much of the invested amount corresponds to what's sold
                const investedAmountSold = newStats.portfolioInvestedAmount * proportionSold;
                
                // 3. Calculate unrealized gain/loss for this portion
                const unrealizedGainFromSale = liquidationAmount - investedAmountSold;
                
                // 4. Add the liquidated value to realized gain
                newStats.realizedGain += unrealizedGainFromSale;
                
                // 5. Record the total value being realized from the portfolio
                newStats.totalValueRealized += liquidationAmount;
                
                // 6. Add the liquidation amount to cash
                newStats.cash += liquidationAmount;
                
                // 7. Reduce portfolio value by liquidated amount
                newStats.portfolioValue -= liquidationAmount;
                
                // 8. Reduce portfolio invested amount proportionally
                newStats.portfolioInvestedAmount -= investedAmountSold;
                
                // 9. Update qualitative notes to make the change visible to the player
                if (liquidationPercentage === 100) {
                  // Full liquidation
                  if (unrealizedGainFromSale > 0) {
                    newStats.qualitativeNotes.push(`Liquidated entire portfolio for a gain of $${unrealizedGainFromSale.toFixed(2)}. Funds added to cash.`);
                  } else if (unrealizedGainFromSale < 0) {
                    newStats.qualitativeNotes.push(`Liquidated entire portfolio for a loss of $${Math.abs(unrealizedGainFromSale).toFixed(2)}. Remaining funds added to cash.`);
                  } else {
                    newStats.qualitativeNotes.push(`Liquidated entire portfolio at breakeven. Funds added to cash.`);
                  }
                } else {
                  // Partial liquidation
                  if (unrealizedGainFromSale > 0) {
                    newStats.qualitativeNotes.push(`Liquidated ${liquidationPercentage}% of portfolio for a gain of $${unrealizedGainFromSale.toFixed(2)}. $${liquidationAmount.toFixed(2)} added to cash.`);
                  } else if (unrealizedGainFromSale < 0) {
                    newStats.qualitativeNotes.push(`Liquidated ${liquidationPercentage}% of portfolio for a loss of $${Math.abs(unrealizedGainFromSale).toFixed(2)}. $${liquidationAmount.toFixed(2)} added to cash.`);
                  } else {
                    newStats.qualitativeNotes.push(`Liquidated ${liquidationPercentage}% of portfolio at breakeven. $${liquidationAmount.toFixed(2)} added to cash.`);
                  }
                }
              }
            } else {
              const cashDelta = parseChange(update.cashChange, prev.playerStats.cash);
              newStats.cash += cashDelta;
              
              // Add a qualitative note about cash changes for visibility
              if (cashDelta > 0) {
                newStats.qualitativeNotes.push(`Added $${cashDelta.toFixed(2)} to cash.`);
              } else if (cashDelta < 0) {
                newStats.qualitativeNotes.push(`Spent $${Math.abs(cashDelta).toFixed(2)} from cash.`);
              }
            }
          }

          // Apply direct portfolio value changes (separate from growth)
          let portfolioValueDelta = 0;
          if (update.portfolioValueChange !== undefined && update.cashChange !== "portfolioValueChange") {
            if (typeof update.portfolioValueChange === 'number') {
              portfolioValueDelta = update.portfolioValueChange;
              newStats.portfolioValue += portfolioValueDelta;
              if (portfolioValueDelta > 0) {
                newStats.portfolioInvestedAmount += portfolioValueDelta;
                newStats.qualitativeNotes.push(`Invested $${portfolioValueDelta.toFixed(2)} in portfolio.`);
              } else if (portfolioValueDelta < 0) {
                // For partial portfolio liquidation
                // Original portfolio value before this change
                const originalPortfolioValue = newStats.portfolioValue - portfolioValueDelta;
                
                // Calculate proportion of portfolio being sold
                const proportionSold = Math.abs(portfolioValueDelta) / originalPortfolioValue;
                
                // Calculate how much of the invested amount corresponds to what's sold
                const investedAmountSold = newStats.portfolioInvestedAmount * proportionSold;
                
                // Reduce the invested amount by what's sold
                newStats.portfolioInvestedAmount -= investedAmountSold;
                
                // Calculate realized gain/loss for this partial sale
                const realizedGainFromSale = Math.abs(portfolioValueDelta) - investedAmountSold;
                
                // Update the realized gain and total value realized
                newStats.realizedGain += realizedGainFromSale;
                newStats.totalValueRealized += Math.abs(portfolioValueDelta);
                
                // Add qualitative note about the sale
                if (realizedGainFromSale > 0) {
                  newStats.qualitativeNotes.push(`Sold portfolio assets worth $${Math.abs(portfolioValueDelta).toFixed(2)} for a gain of $${realizedGainFromSale.toFixed(2)}.`);
                } else if (realizedGainFromSale < 0) {
                  newStats.qualitativeNotes.push(`Sold portfolio assets worth $${Math.abs(portfolioValueDelta).toFixed(2)} for a loss of $${Math.abs(realizedGainFromSale).toFixed(2)}.`);
                } else {
                  newStats.qualitativeNotes.push(`Sold portfolio assets worth $${Math.abs(portfolioValueDelta).toFixed(2)} at breakeven.`);
                }
              }
            } else {
              portfolioValueDelta = parseChange(update.portfolioValueChange, prev.playerStats.portfolioValue);
              newStats.portfolioValue += portfolioValueDelta;
              
              // Make portfolio value changes visible to player
              if (portfolioValueDelta > 0) {
                newStats.qualitativeNotes.push(`Portfolio value increased by $${portfolioValueDelta.toFixed(2)} or ${((portfolioValueDelta / (newStats.portfolioValue - portfolioValueDelta)) * 100).toFixed(1)}%.`);
              } else if (portfolioValueDelta < 0) {
                newStats.qualitativeNotes.push(`Portfolio value decreased by $${Math.abs(portfolioValueDelta).toFixed(2)} or ${((Math.abs(portfolioValueDelta) / (newStats.portfolioValue - portfolioValueDelta)) * 100).toFixed(1)}%.`);
              }
            }
          }

          // Calculate unrealized gain/loss (for current holdings)
          newStats.unrealizedGain = newStats.portfolioValue - newStats.portfolioInvestedAmount;

          // Calculate total return percentage using the correct formula
          // Total gain = realized gain + unrealized gain
          const totalGain = newStats.realizedGain + newStats.unrealizedGain;
          
          // Total investment base = current portfolioInvestedAmount + totalValueRealized
          const totalInvestmentBase = newStats.portfolioInvestedAmount + newStats.totalValueRealized;
          
          console.log(`totalValueRealized: ${newStats.totalValueRealized}`);
          console.log(`portfolioValue: ${newStats.portfolioValue}`);
          console.log(`totalInvestmentBase: ${totalInvestmentBase}`);
          console.log(`totalGain: ${totalGain}`);
          
          // Add a note about the current return percentage
          if (totalInvestmentBase > 0) {
            const previousReturnPct = prev.playerStats.totalReturnPercentage;
            newStats.totalReturnPercentage = (totalGain / totalInvestmentBase) * 100;
            
            // Only add a note if the return percentage changed significantly
            const changePct = Math.abs(newStats.totalReturnPercentage - previousReturnPct);
            if (changePct > 1) {
              if (newStats.totalReturnPercentage > previousReturnPct) {
                newStats.qualitativeNotes.push(`Your total investment return increased to ${newStats.totalReturnPercentage.toFixed(1)}%.`);
              } else if (newStats.totalReturnPercentage < previousReturnPct) {
                newStats.qualitativeNotes.push(`Your total investment return decreased to ${newStats.totalReturnPercentage.toFixed(1)}%.`);
              }
            }
          } else {
            newStats.totalReturnPercentage = 0;
          }

          // Apply debt changes
          if (update.debtChange !== undefined) {
            const debtDelta = parseChange(update.debtChange, prev.playerStats.debt);
            newStats.debt += debtDelta;
          }

          // Update net worth based on new cash, portfolio, and debt values
          newStats.netWorth = newStats.cash + newStats.portfolioValue - newStats.debt;

          // Apply wellBeing changes
          if (update.wellBeingChange !== undefined) {
            // Ensure wellBeing stays within -10 to 10 range
            const newWellBeing = newStats.wellBeing + update.wellBeingChange;
            newStats.wellBeing = Math.max(-10, Math.min(10, newWellBeing));
          }

          // Add qualitative notes
          if (update.qualitativeNote) {
            newStats.qualitativeNotes.push(update.qualitativeNote);
          }

          // Apply age update *last* after calculations based on it are done
          newStats.age += ageChange;

          return { ...prev, playerStats: newStats };
      });
  }, []); // No dependencies needed if it only uses its argument and setGameState

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
                    totalValueRealized: prev.playerStats.totalValueRealized
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
                averageScore: avgScore
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
                  currentLevel: 1,
                  currentSceneId: getInitialSceneId(resetLevelScenes) || '',
                  playerStats: initializePlayerStats(resetInitialStats),
                  gameHistory: [],
                  gameCompleted: false,
                  showLevelSelect: false,
                  financialHistory: getInitialFinancialHistory(resetInitialStats),
                  decisionScores: [],
                  averageScore: 0,
                }));
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
               }));
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

  }, [currentSceneData, gameState.currentLevel, advanceToScene]); // Remove resetGame dependency


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
            totalValueRealized: playerStats.totalValueRealized
        }],
        decisionScores: [], // Initialize empty scores array for new game
        averageScore: 0,
    });

    // The useEffect watching gameState.currentLevel will automatically
    // call setLevelData(initialLevelData) when the gameState is updated above.
  }, []);


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