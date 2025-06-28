import { DiceType, DiceConfig, DiceRoll, DiceStatistics } from '@/types/dice';

export const DICE_CONFIGS: Record<DiceType, DiceConfig> = {
  d4: {
    type: 'd4',
    sides: 4,
    color: '#ef4444',
    name: 'D4',
    description: 'Four-sided die'
  },
  d6: {
    type: 'd6',
    sides: 6,
    color: '#3b82f6',
    name: 'D6',
    description: 'Six-sided die'
  },
  d8: {
    type: 'd8',
    sides: 8,
    color: '#10b981',
    name: 'D8',
    description: 'Eight-sided die'
  },
  d10: {
    type: 'd10',
    sides: 10,
    color: '#f59e0b',
    name: 'D10',
    description: 'Ten-sided die'
  },
  d12: {
    type: 'd12',
    sides: 12,
    color: '#8b5cf6',
    name: 'D12',
    description: 'Twelve-sided die'
  },
  d20: {
    type: 'd20',
    sides: 20,
    color: '#ec4899',
    name: 'D20',
    description: 'Twenty-sided die'
  },
  d100: {
    type: 'd100',
    sides: 100,
    color: '#6366f1',
    name: 'D100',
    description: 'Hundred-sided die'
  }
};

export const DICE_PRESETS = [
  {
    id: 'attack',
    name: 'Attack Roll',
    description: 'Standard attack roll with advantage/disadvantage',
    diceType: 'd20' as DiceType,
    quantity: 1,
    modifier: 0,
    advantage: null
  },
  {
    id: 'damage',
    name: 'Damage Roll',
    description: 'Weapon damage roll',
    diceType: 'd6' as DiceType,
    quantity: 2,
    modifier: 3,
    advantage: null
  },
  {
    id: 'initiative',
    name: 'Initiative',
    description: 'Initiative roll',
    diceType: 'd20' as DiceType,
    quantity: 1,
    modifier: 2,
    advantage: null
  },
  {
    id: 'saving-throw',
    name: 'Saving Throw',
    description: 'Saving throw roll',
    diceType: 'd20' as DiceType,
    quantity: 1,
    modifier: 5,
    advantage: null
  }
];

export function rollDice(sides: number, quantity: number = 1): number[] {
  const results: number[] = [];
  for (let i = 0; i < quantity; i++) {
    results.push(Math.floor(Math.random() * sides) + 1);
  }
  return results;
}

export function rollWithAdvantage(): number[] {
  const roll1 = Math.floor(Math.random() * 20) + 1;
  const roll2 = Math.floor(Math.random() * 20) + 1;
  return [roll1, roll2];
}

export function rollWithDisadvantage(): number[] {
  const roll1 = Math.floor(Math.random() * 20) + 1;
  const roll2 = Math.floor(Math.random() * 20) + 1;
  return [roll1, roll2];
}

export function calculateTotal(results: number[], modifier: number = 0): number {
  return results.reduce((sum, result) => sum + result, 0) + modifier;
}

export function isCritical(results: number[], diceType: DiceType): boolean {
  if (diceType === 'd20') {
    return results.some(result => result === 20);
  }
  return false;
}

export function isCriticalFailure(results: number[], diceType: DiceType): boolean {
  if (diceType === 'd20') {
    return results.some(result => result === 1);
  }
  return false;
}

export function createDiceRoll(
  diceType: DiceType,
  quantity: number,
  modifier: number = 0,
  advantage?: 'advantage' | 'disadvantage' | null
): DiceRoll {
  const config = DICE_CONFIGS[diceType];
  let results: number[];

  if (diceType === 'd20' && advantage) {
    if (advantage === 'advantage') {
      results = rollWithAdvantage();
    } else {
      results = rollWithDisadvantage();
    }
  } else {
    results = rollDice(config.sides, quantity);
  }

  const total = calculateTotal(results, modifier);
  const critical = isCritical(results, diceType);

  return {
    id: generateId(),
    timestamp: Date.now(),
    diceType,
    quantity,
    modifier,
    results,
    total,
    advantage,
    critical
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function calculateStatistics(rolls: DiceRoll[]): DiceStatistics {
  if (rolls.length === 0) {
    return {
      totalRolls: 0,
      averageRoll: 0,
      highestRoll: 0,
      lowestRoll: 0,
      mostRolled: {}
    };
  }

  const allResults = rolls.flatMap(roll => roll.results);
  const totalRolls = rolls.length;
  const averageRoll = allResults.reduce((sum, result) => sum + result, 0) / allResults.length;
  const highestRoll = Math.max(...allResults);
  const lowestRoll = Math.min(...allResults);

  const mostRolled: { [key: number]: number } = {};
  allResults.forEach(result => {
    mostRolled[result] = (mostRolled[result] || 0) + 1;
  });

  return {
    totalRolls,
    averageRoll: Math.round(averageRoll * 100) / 100,
    highestRoll,
    lowestRoll,
    mostRolled
  };
}

export function formatDiceRoll(roll: DiceRoll): string {
  const config = DICE_CONFIGS[roll.diceType];
  const modifierText = roll.modifier > 0 ? `+${roll.modifier}` : roll.modifier < 0 ? `${roll.modifier}` : '';
  const resultsText = roll.results.join(', ');
  
  if (roll.advantage) {
    const advantageText = roll.advantage === 'advantage' ? 'with advantage' : 'with disadvantage';
    return `${roll.quantity}${config.name} ${advantageText}: [${resultsText}]${modifierText} = ${roll.total}`;
  }
  
  return `${roll.quantity}${config.name}${modifierText}: [${resultsText}] = ${roll.total}`;
}

export function getDiceColor(diceType: DiceType): string {
  return DICE_CONFIGS[diceType].color;
}

export function getDiceName(diceType: DiceType): string {
  return DICE_CONFIGS[diceType].name;
}

export function getDiceSides(diceType: DiceType): number {
  return DICE_CONFIGS[diceType].sides;
}

export function validateDiceInput(quantity: number, modifier: number): boolean {
  return quantity > 0 && quantity <= 100 && modifier >= -100 && modifier <= 100;
}

export function getRandomDiceType(): DiceType {
  const types: DiceType[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
  return types[Math.floor(Math.random() * types.length)];
}

export function getDiceIcon(diceType: DiceType): string {
  const icons: Record<DiceType, string> = {
    d4: '🔺',
    d6: '🎲',
    d8: '🔷',
    d10: '🔶',
    d12: '🔸',
    d20: '🎯',
    d100: '💎'
  };
  return icons[diceType];
} 