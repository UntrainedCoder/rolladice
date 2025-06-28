'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiceType } from '@/types/dice';
import { getDiceColor, getDiceSides, getDiceIcon } from '@/utils/diceUtils';

interface Dice3DProps {
  diceType: DiceType;
  value: number;
  isRolling: boolean;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  onClick?: () => void;
}

export default function Dice3D({
  diceType,
  value,
  isRolling,
  size = 'medium',
  showValue = true,
  onClick
}: Dice3DProps) {
  const diceRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const sides = getDiceSides(diceType);
  const color = getDiceColor(diceType);
  const icon = getDiceIcon(diceType);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setRotation({
          x: Math.random() * 360,
          y: Math.random() * 360,
          z: Math.random() * 360
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setRotation({ x: 0, y: 0, z: 0 });
    }
  }, [isRolling]);

  const renderDiceFace = (faceValue: number) => {
    if (diceType === 'd6') {
      return renderD6Face(faceValue);
    } else if (diceType === 'd20') {
      return renderD20Face(faceValue);
    } else {
      return renderGenericFace(faceValue);
    }
  };

  const renderD6Face = (faceValue: number) => {
    const dotPositions = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8]
    };

    const positions = dotPositions[faceValue as keyof typeof dotPositions] || [];

    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full p-2">
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} className="flex items-center justify-center">
            {positions.includes(index) && (
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderD20Face = (faceValue: number) => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-gray-800 font-bold text-sm">{faceValue}</span>
      </div>
    );
  };

  const renderGenericFace = (faceValue: number) => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-gray-800 font-bold">{faceValue}</span>
      </div>
    );
  };

  const getDiceShape = () => {
    switch (diceType) {
      case 'd4':
        return 'polygon(50% 0%, 100% 100%, 0% 100%)';
      case 'd6':
        return 'rounded-lg';
      case 'd8':
        return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      case 'd10':
        return 'polygon(50% 0%, 100% 30%, 100% 70%, 50% 100%, 0% 70%, 0% 30%)';
      case 'd12':
        return 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
      case 'd20':
        return 'polygon(50% 0%, 100% 20%, 100% 80%, 50% 100%, 0% 80%, 0% 20%)';
      case 'd100':
        return 'rounded-full';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <motion.div
      ref={diceRef}
      className={`relative ${sizeClasses[size]} cursor-pointer select-none`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : undefined}
      aria-label={`${diceType} dice showing ${value}`}
      aria-pressed={isRolling}
      animate={{
        rotateX: isRolling ? rotation.x : 0,
        rotateY: isRolling ? rotation.y : 0,
        rotateZ: isRolling ? rotation.z : 0,
        scale: isRolling ? 1.1 : 1
      }}
      transition={{
        duration: isRolling ? 0.1 : 0.5,
        ease: isRolling ? 'linear' : 'easeOut'
      }}
      whileHover={!isRolling ? { scale: 1.05 } : {}}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Main Dice Body */}
      <div
        className={`relative w-full h-full bg-white border-2 shadow-lg flex items-center justify-center overflow-hidden`}
        style={{
          backgroundColor: color,
          borderColor: color,
          clipPath: getDiceShape(),
          transform: 'translateZ(0)'
        }}
      >
        {/* Dice Icon */}
        <div className="absolute top-1 left-1 text-white opacity-60">
          <span className="text-xs">{icon}</span>
        </div>

        {/* Dice Value */}
        {showValue && (
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bold"
            >
              {renderDiceFace(value)}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Rolling Animation Overlay */}
        {isRolling && (
          <motion.div
            className="absolute inset-0 bg-white bg-opacity-20 flex items-center justify-center"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <span className="text-white font-bold animate-spin">🎲</span>
          </motion.div>
        )}
      </div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl opacity-30"
        style={{ backgroundColor: color }}
        animate={{
          opacity: isRolling ? 0.6 : 0.3,
          scale: isRolling ? 1.2 : 1
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-black opacity-20 rounded-full blur-sm"
        style={{ transform: 'translateX(-50%)' }}
      />
    </motion.div>
  );
} 