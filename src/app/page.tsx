'use client';

import { useState } from 'react';

export default function Home() {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    // Animate for 1 second
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
    }, 1000);
  };

  const getDiceIcon = (value: number) => {
    const dots = {
      1: '⚀',
      2: '⚁', 
      3: '⚂',
      4: '⚃',
      5: '⚄',
      6: '⚅'
    };
    return dots[value as keyof typeof dots];
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        {/* Dice Display */}
        <div className="relative">
          <div className={`
            w-32 h-32 bg-white rounded-2xl shadow-2xl flex items-center justify-center text-6xl
            border-4 border-orange-200
            transition-all duration-1000 ease-out
            ${isRolling ? 'animate-bounce scale-110 rotate-12' : 'scale-100 rotate-0'}
            hover:shadow-orange-200/50
          `}>
            <span className={`
              transition-all duration-1000
              ${isRolling ? 'opacity-50' : 'opacity-100'}
            `}>
              {getDiceIcon(diceValue)}
            </span>
          </div>
          
          {/* Glow effect */}
          <div className={`
            absolute inset-0 w-32 h-32 bg-orange-400 rounded-2xl blur-xl opacity-20
            transition-all duration-1000
            ${isRolling ? 'scale-125 opacity-40' : 'scale-100 opacity-20'}
          `}></div>
        </div>

        {/* Result Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {isRolling ? 'Rolling...' : `You rolled a ${diceValue}`}
          </h2>
          <p className="text-gray-600 text-lg">
            {isRolling ? 'The dice is tumbling...' : 'Ready for another roll?'}
          </p>
        </div>

        {/* Roll Button */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          className={`
            px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 
            text-white font-bold text-lg rounded-xl shadow-lg
            transition-all duration-300 ease-out
            hover:from-orange-600 hover:to-orange-700 
            hover:shadow-xl hover:scale-105
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            focus:outline-none focus:ring-4 focus:ring-orange-300
          `}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>
    </main>
  );
}
