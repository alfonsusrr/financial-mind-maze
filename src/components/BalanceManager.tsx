'use client';

import { useEffect } from 'react';
import { useGame } from './GameEngine';

type BalanceManagerProps = {
  choiceId?: string;
  balanceEffect: number;
  autoApply?: boolean;
};

export function BalanceManager({ choiceId, balanceEffect, autoApply = false }: BalanceManagerProps) {
  const { gameState, makeChoice } = useGame();
  
  useEffect(() => {
    if (autoApply && balanceEffect !== 0) {
      // Apply the balance effect automatically
      updateBalance();
    }
  }, []);
  
  const updateBalance = () => {
    if (choiceId) {
      makeChoice(choiceId, {
        balanceEffect,
        appliedAt: new Date().toISOString()
      });
    }
  };
  
  // This is a utility component and doesn't render anything
  return null;
}

// This component can be used to update the balance when certain scenarios occur
// For example, after a choice is made or a time progression event happens 