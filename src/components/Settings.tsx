'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DiceSettings } from '@/types/dice';
import { Settings as SettingsIcon, Volume2, VolumeX, Sun, Moon, Palette, Save, RotateCcw } from 'lucide-react';

interface SettingsProps {
  settings: DiceSettings;
  onSettingsChange: (settings: DiceSettings) => void;
  onClose: () => void;
}

export default function Settings({ settings, onSettingsChange, onClose }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<DiceSettings>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(localSettings) !== JSON.stringify(settings));
  }, [localSettings, settings]);

  const handleSettingChange = (key: keyof DiceSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: DiceSettings = {
      soundEnabled: true,
      animationsEnabled: true,
      darkMode: false,
      autoSave: true,
      showHistory: true
    };
    setLocalSettings(defaultSettings);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !localSettings.darkMode;
    handleSettingChange('darkMode', newDarkMode);
    
    // Apply dark mode to body
    if (newDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <h2 className="text-xl font-bold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Settings Options */}
        <div className="space-y-6">
          {/* Sound Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3">Sound & Audio</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {localSettings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>Sound Effects</span>
                </div>
                <motion.button
                  onClick={() => handleSettingChange('soundEnabled', !localSettings.soundEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    layout
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Animation Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3">Animations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Enable Animations</span>
                </div>
                <motion.button
                  onClick={() => handleSettingChange('animationsEnabled', !localSettings.animationsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.animationsEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    layout
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3">Appearance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {localSettings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>Dark Mode</span>
                </div>
                <motion.button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    layout
                  />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div>
            <h3 className="text-lg font-medium mb-3">Data & Storage</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Auto-save Rolls</span>
                <motion.button
                  onClick={() => handleSettingChange('autoSave', !localSettings.autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.autoSave ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    layout
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <span>Show History Panel</span>
                <motion.button
                  onClick={() => handleSettingChange('showHistory', !localSettings.showHistory)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    localSettings.showHistory ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      localSettings.showHistory ? 'translate-x-6' : 'translate-x-1'
                    }`}
                    layout
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <motion.button
            onClick={handleReset}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            whileHover={hasChanges ? { scale: 1.02 } : {}}
            whileTap={hasChanges ? { scale: 0.98 } : {}}
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
} 