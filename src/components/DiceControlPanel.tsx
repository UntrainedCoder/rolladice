'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DiceType, DiceRoll } from '@/types/dice';
import { DICE_CONFIGS, DICE_PRESETS, createDiceRoll, validateDiceInput } from '@/utils/diceUtils';
import { ChevronDown, Plus, Minus, Settings, Zap, Shield } from 'lucide-react';

interface DiceControlPanelProps {
  onRoll: (roll: DiceRoll) => void;
  isRolling: boolean;
}

export default function DiceControlPanel({ onRoll, isRolling }: DiceControlPanelProps) {
  const [selectedDice, setSelectedDice] = useState<DiceType>('d20');
  const [quantity, setQuantity] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [advantage, setAdvantage] = useState<'advantage' | 'disadvantage' | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleRoll = () => {
    if (isRolling || !validateDiceInput(quantity, modifier)) return;
    
    const roll = createDiceRoll(selectedDice, quantity, modifier, advantage);
    onRoll(roll);
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = DICE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSelectedDice(preset.diceType);
      setQuantity(preset.quantity);
      setModifier(preset.modifier);
      setAdvantage(preset.advantage || null);
      setSelectedPreset(presetId);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(100, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleModifierChange = (delta: number) => {
    const newModifier = Math.max(-100, Math.min(100, modifier + delta));
    setModifier(newModifier);
  };

  const getRollDescription = () => {
    const config = DICE_CONFIGS[selectedDice];
    const modifierText = modifier > 0 ? `+${modifier}` : modifier < 0 ? `${modifier}` : '';
    const advantageText = advantage ? ` (${advantage})` : '';
    return `${quantity}${config.name}${modifierText}${advantageText}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full">
      {/* Dice Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Select Dice Type
        </label>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(DICE_CONFIGS).map(([type, config]) => (
            <motion.button
              key={type}
              onClick={() => setSelectedDice(type as DiceType)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                selectedDice === type
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Select ${config.name} dice`}
              aria-pressed={selectedDice === type}
              role="radio"
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{config.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{config.description}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {DICE_PRESETS.map((preset) => (
            <motion.button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className={`p-2 rounded-lg border text-sm transition-all duration-200 ${
                selectedPreset === preset.id
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{preset.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quantity Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Quantity
        </label>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Decrease quantity"
            aria-describedby="quantity-value"
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          <span id="quantity-value" className="text-lg font-bold min-w-[3rem] text-center" aria-live="polite">{quantity}</span>
          <motion.button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 100}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Increase quantity"
            aria-describedby="quantity-value"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Modifier Control */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Modifier
        </label>
        <div className="flex items-center space-x-3">
          <motion.button
            onClick={() => handleModifierChange(-1)}
            disabled={modifier <= -100}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Decrease modifier"
            aria-describedby="modifier-value"
          >
            <Minus className="w-4 h-4" />
          </motion.button>
          <span id="modifier-value" className="text-lg font-bold min-w-[4rem] text-center" aria-live="polite">
            {modifier > 0 ? `+${modifier}` : modifier}
          </span>
          <motion.button
            onClick={() => handleModifierChange(1)}
            disabled={modifier >= 100}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Increase modifier"
            aria-describedby="modifier-value"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Advanced Options */}
      <div className="mb-6">
        <motion.button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <span className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span className="font-medium">Advanced Options</span>
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </motion.button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-3"
          >
            {/* Advantage/Disadvantage */}
            {selectedDice === 'd20' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Advantage/Disadvantage
                </label>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => setAdvantage(advantage === 'advantage' ? null : 'advantage')}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                      advantage === 'advantage'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">Advantage</span>
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => setAdvantage(advantage === 'disadvantage' ? null : 'disadvantage')}
                    className={`flex-1 p-2 rounded-lg border-2 transition-all ${
                      advantage === 'disadvantage'
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Disadvantage</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Roll Description */}
      <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Roll Description</div>
        <div id="roll-description" className="font-mono text-lg font-bold">{getRollDescription()}</div>
      </div>

      {/* Roll Button */}
      <motion.button
        onClick={handleRoll}
        disabled={isRolling || !validateDiceInput(quantity, modifier)}
        className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        whileHover={!isRolling ? { scale: 1.02, y: -2 } : {}}
        whileTap={!isRolling ? { scale: 0.98 } : {}}
        aria-label={`Roll ${getRollDescription()}`}
        aria-describedby="roll-description"
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </motion.button>
    </div>
  );
} 