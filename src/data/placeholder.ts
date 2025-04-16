// This is a placeholder for the remaining level data files
// Each level will be created following the same structure as level1.ts

import level1 from './level2';

// For now, we'll use level1 data as a placeholder for the other levels
// In a real implementation, each level would have its own data
const level2 = { ...level1, levelNumber: 2, title: "The High-Stakes Leverage Gamble" };
const level3 = { ...level1, levelNumber: 3, title: "The Market Downturn Response" };
const level4 = { ...level1, levelNumber: 4, title: "The Hot IPO Decision" };
const level5 = { ...level1, levelNumber: 5, title: "The Real Estate Opportunity" };
const level6 = { ...level1, levelNumber: 6, title: "The Legacy Stock Dilemma" };
const level7 = { ...level1, levelNumber: 7, title: "The Comprehensive Financial Plan" };
const level8 = { ...level1, levelNumber: 8, title: "The Social Influence Network" };

export { level2, level3, level4, level5, level6, level7, level8 }; 