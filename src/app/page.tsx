'use client';

import { useState } from 'react';

export default function Home() {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
    }, 1000);
  };

  const renderDiceDots = (value: number) => {
    const dotPositions = {
      1: [4], // center
      2: [0, 8], // top-left, bottom-right
      3: [0, 4, 8], // top-left, center, bottom-right
      4: [0, 2, 6, 8], // corners
      5: [0, 2, 4, 6, 8], // corners + center
      6: [0, 2, 3, 5, 6, 8] // two columns of three
    };

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '8px',
        width: '100%',
        height: '100%',
        padding: '16px'
      }}>
        {Array.from({ length: 9 }, (_, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {dotPositions[value as keyof typeof dotPositions].includes(index) && (
              <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#1f2937',
                borderRadius: '50%'
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fed7aa 0%, #ffffff 50%, #fed7aa 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '40px',
        textAlign: 'center',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          color: '#1f2937',
          margin: '0 0 8px 0',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          letterSpacing: '-0.02em'
        }}>
          Roll a Dice
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          margin: '0',
          fontWeight: '500',
          opacity: 0.8
        }}>
          WebApp from TechPremi.Com
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        marginTop: '60px'
      }}>
        {/* Dice Display */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '128px',
            height: '128px',
            backgroundColor: 'white',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #fed7aa',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: 'all 1s ease-out',
            transform: isRolling ? 'scale(1.1) rotate(12deg)' : 'scale(1) rotate(0deg)',
            animation: isRolling ? 'bounce 1s infinite' : 'none'
          }}>
            <div style={{
              transition: 'opacity 1s',
              opacity: isRolling ? 0.5 : 1,
              width: '100%',
              height: '100%'
            }}>
              {renderDiceDots(diceValue)}
            </div>
          </div>
          
          {/* Glow effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '128px',
            height: '128px',
            backgroundColor: '#fb923c',
            borderRadius: '16px',
            filter: 'blur(20px)',
            opacity: isRolling ? 0.4 : 0.2,
            transition: 'all 1s',
            transform: isRolling ? 'scale(1.25)' : 'scale(1)',
            zIndex: -1
          }}></div>
        </div>

        {/* Result Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            {isRolling ? 'Rolling...' : `You rolled a ${diceValue}`}
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0
          }}>
            {isRolling ? 'The dice is tumbling...' : 'Ready for another roll?'}
          </p>
        </div>

        {/* Roll Button */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          style={{
            padding: '16px 32px',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            borderRadius: '12px',
            border: 'none',
            cursor: isRolling ? 'not-allowed' : 'pointer',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease-out',
            opacity: isRolling ? 0.5 : 1,
            transform: isRolling ? 'none' : 'scale(1)',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            if (!isRolling) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isRolling) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }
          }}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0,-4px,0);
          }
        }
      `}</style>
    </div>
  );
}
