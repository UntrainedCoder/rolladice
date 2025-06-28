export interface DiceRoll {
  id: string;
  timestamp: number;
  diceType: DiceType;
  quantity: number;
  modifier: number;
  results: number[];
  total: number;
  advantage?: 'advantage' | 'disadvantage' | null;
  critical?: boolean;
}

export interface DiceHistory {
  rolls: DiceRoll[];
  statistics: DiceStatistics;
}

export interface DiceStatistics {
  totalRolls: number;
  averageRoll: number;
  highestRoll: number;
  lowestRoll: number;
  mostRolled: { [key: number]: number };
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceConfig {
  type: DiceType;
  sides: number;
  color: string;
  name: string;
  description: string;
}

export interface DiceSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  darkMode: boolean;
  autoSave: boolean;
  showHistory: boolean;
}

export interface DicePreset {
  id: string;
  name: string;
  description: string;
  diceType: DiceType;
  quantity: number;
  modifier: number;
  advantage?: 'advantage' | 'disadvantage' | null;
}

export interface DiceAnimation {
  type: 'roll' | 'bounce' | 'shake' | 'glow';
  duration: number;
  easing: string;
}

export interface DiceSound {
  roll: string;
  critical: string;
  natural20: string;
  natural1: string;
} 