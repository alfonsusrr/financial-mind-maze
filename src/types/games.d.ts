export type StatUpdate = {
    // netWorthChange?: number | string; // Deprecated - now calculated from cash + portfolio - debt
    cashChange?: number | string; // Direct change to cash balance, or "portfolioValueChange" to use portfolio change
    debtChange?: number | string; // Change to debt (positive means more debt)
    incomeChange?: number | string;
    wellBeingChange?: number;
    roiPotential?: 'low' | 'moderate' | 'high';
    qualitativeNote?: string;
    ageChange?: number;
    portfolioContribution?: number | string; // Annual contribution to portfolio
    portfolioGrowthRate?: number | string; // Growth rate for portfolio (e.g., 0.08 for 8%)
    portfolioValueChange?: number | string; // Direct change to portfolio value
};

// Initial stats for level start
export interface LevelInitialStats {
  cash: number;
  debt: number;
  income: number;
  wellBeing: number;
  age: number;
  portfolioValue: number;
  portfolioContribution: number;
  portfolioGrowthRate: number;
}

export type Choice = {
    text: string;
    nextSceneId: string;
    score?: number; // Score value (0-100) for this choice
    detailedInfo?: {
      shortTermImpact?: {
        financial?: number;
        wellBeing?: number;
      };
      longTermImpact?: {
        financial?: string;
        career?: string;
        satisfaction?: string;
      };
      timeCommitment?: string;
      riskLevel?: 'low' | 'moderate' | 'high';
      benefits?: string[];
      drawbacks?: string[];
      requiresResources?: string[];
    };
    preview?: {
      emotionalImpact?: string[];
      qualitativeNote?: string[];
    };
  };
  
  // Scene type enum
  export type SceneType =
    | 'decision'
    | 'outcome'
    | 'reflection'
    | 'insight'
    | 'ending'
    | 'event';
  
  // Base scene structure
  export interface BaseScene {
    id: string;
    type: SceneType;
    title: string;
    description: string;
    background: string;
  }
  
  // 🎯 Decision Scene
  export interface DecisionScene extends BaseScene {
    type: 'decision';
    choices: Choice[];
  }
  
  // 💥 Outcome Scene
  export interface OutcomeScene extends BaseScene {
    type: 'outcome';
    outcome: StatUpdate;
    nextSceneId: string;
  }
  
  // 🧭 Reflection Scene
  export interface ReflectionScene extends BaseScene {
    type: 'reflection';
    playerStats: StatUpdate;
  }
  
  // 🧠 Insight Scene
  export interface InsightScene extends BaseScene {
    type: 'insight';
    realWorldExample?: string;
    outcome?: StatUpdate;
    nextSceneId: string;
    summary?: string;
  }
  
  // 🏁 Ending Scene
  export interface EndingScene extends BaseScene {
    type: 'ending';
    qualitativeSummary: string;
    score: number;
    scoreThreshold?: number; // Minimum score needed to reach this ending
  }
  
  // 📅 Event Scene
  export interface EventScene extends BaseScene {
    type: 'event';
    outcome: StatUpdate;
    nextSceneId: string;
  }
  
  // 🧩 Union Type
  export type GameScene =
    | DecisionScene
    | OutcomeScene
    | ReflectionScene
    | InsightScene
    | EndingScene
    | EventScene;