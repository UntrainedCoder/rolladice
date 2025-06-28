'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiceRoll, DiceStatistics } from '@/types/dice';
import { formatDiceRoll, calculateStatistics, getDiceColor, getDiceIcon } from '@/utils/diceUtils';
import { Trash2, BarChart3, Clock, Copy, Share2 } from 'lucide-react';

interface DiceHistoryProps {
  rolls: DiceRoll[];
  onClearHistory: () => void;
  onDeleteRoll: (id: string) => void;
}

export default function DiceHistory({ rolls, onClearHistory, onDeleteRoll }: DiceHistoryProps) {
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedRoll, setSelectedRoll] = useState<DiceRoll | null>(null);

  const statistics = calculateStatistics(rolls);

  const handleCopyRoll = (roll: DiceRoll) => {
    const rollText = formatDiceRoll(roll);
    navigator.clipboard.writeText(rollText);
  };

  const handleShareRoll = async (roll: DiceRoll) => {
    const rollText = formatDiceRoll(roll);
    const shareData = {
      title: 'Dice Roll Result',
      text: rollText,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        // Fallback to copying to clipboard silently
        navigator.clipboard.writeText(rollText);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(rollText);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const getRollStatus = (roll: DiceRoll) => {
    if (roll.critical) return 'critical';
    if (roll.diceType === 'd20' && roll.results.some(r => r === 1)) return 'critical-failure';
    if (roll.diceType === 'd20' && roll.results.some(r => r === 20)) return 'critical-success';
    return 'normal';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'critical-success':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'critical-failure':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  if (rolls.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <BarChart3 className="w-12 h-12 mx-auto mb-2" />
          <h3 className="text-lg font-medium">No Rolls Yet</h3>
          <p className="text-sm">Start rolling dice to see your history here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <h3 className="text-lg font-bold">Roll History</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">({rolls.length} rolls)</span>
        </div>
        <div className="flex space-x-2">
          <motion.button
            onClick={() => setShowStatistics(!showStatistics)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={onClearHistory}
            className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 text-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Statistics Panel */}
      <AnimatePresence>
        {showStatistics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <h4 className="font-medium mb-3">Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600 dark:text-gray-400">Total Rolls</div>
                <div className="font-bold">{statistics.totalRolls}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Average</div>
                <div className="font-bold">{statistics.averageRoll}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Highest</div>
                <div className="font-bold text-green-600">{statistics.highestRoll}</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Lowest</div>
                <div className="font-bold text-red-600">{statistics.lowestRoll}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Roll History List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {rolls.slice().reverse().map((roll) => {
            const status = getRollStatus(roll);
            const statusColor = getStatusColor(status);
            
            return (
              <motion.div
                key={roll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {/* Dice Icon */}
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: getDiceColor(roll.diceType) }}
                    >
                      {getDiceIcon(roll.diceType)}
                    </div>

                    {/* Roll Details */}
                    <div className="flex-1">
                      <div className="font-mono text-sm font-medium">
                        {formatDiceRoll(roll)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatTimestamp(roll.timestamp)}</span>
                        {roll.advantage && (
                          <span className={`px-2 py-1 rounded text-xs ${statusColor}`}>
                            {roll.advantage}
                          </span>
                        )}
                        {roll.critical && (
                          <span className="px-2 py-1 rounded text-xs bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600">
                            Critical!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-1">
                    <motion.button
                      onClick={() => handleCopyRoll(roll)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Copy roll"
                    >
                      <Copy className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleShareRoll(roll)}
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Share roll"
                    >
                      <Share2 className="w-3 h-3" />
                    </motion.button>
                    <motion.button
                      onClick={() => onDeleteRoll(roll.id)}
                      className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Delete roll"
                    >
                      <Trash2 className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
} 