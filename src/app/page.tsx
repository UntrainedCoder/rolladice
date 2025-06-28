'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    setShowParticles(false);
    
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setIsRolling(false);
      setShowParticles(true);
      
      // Hide particles after animation
      setTimeout(() => setShowParticles(false), 2000);
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
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderParticles = () => {
    if (!showParticles) return null;
    
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        pointerEvents: 'none',
        zIndex: 20
      }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: '#fbbf24',
              borderRadius: '50%',
              animation: `sparkle 2s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
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
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #fed7aa 0%, #ffffff 50%, #fed7aa 100%)',
        animation: 'backgroundShift 8s ease-in-out infinite',
        zIndex: -2
      }}></div>
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
        animation: 'backgroundFloat 12s ease-in-out infinite',
        zIndex: -1
      }}></div>

      {/* Header */}
      <div style={{
        position: 'absolute',
        top: '40px',
        textAlign: 'center',
        zIndex: 10
      }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '900',
          color: '#1f2937',
          margin: '0 0 12px 0',
          textShadow: '0 4px 8px rgba(0,0,0,0.1)',
          letterSpacing: '-0.03em',
          fontFamily: 'Inter, sans-serif'
        }}>
          Roll a Dice
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#6b7280',
          margin: '0',
          fontWeight: '500',
          opacity: 0.9,
          fontFamily: 'Inter, sans-serif'
        }}>
          WebApp from{' '}
          <a 
            href="https://techpremi.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              color: '#f97316',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ea580c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#f97316';
            }}
          >
            TechPremi.Com
          </a>
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        marginTop: '80px'
      }}>
        {/* Dice Display */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '140px',
            height: '140px',
            backgroundColor: 'white',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '4px solid #fed7aa',
            boxShadow: `
              0 25px 50px -12px rgba(0, 0, 0, 0.25),
              0 0 0 1px rgba(255, 255, 255, 0.8),
              inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `,
            transition: 'all 1s ease-out',
            transform: isRolling ? 'scale(1.1) rotate(12deg)' : 'scale(1) rotate(0deg)',
            animation: isRolling ? 'bounce 1s infinite' : 'none',
            position: 'relative'
          }}>
            {/* 3D Highlight */}
            <div style={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              right: '4px',
              height: '20px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)',
              borderRadius: '16px 16px 0 0',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{
              transition: 'opacity 1s',
              opacity: isRolling ? 0.5 : 1,
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 1
            }}>
              {renderDiceDots(diceValue)}
            </div>
          </div>
          
          {/* Enhanced Glow effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            width: '140px',
            height: '140px',
            background: 'radial-gradient(circle, #fb923c 0%, #f97316 50%, transparent 70%)',
            borderRadius: '20px',
            filter: 'blur(25px)',
            opacity: isRolling ? 0.6 : 0.3,
            transition: 'all 1s',
            transform: isRolling ? 'scale(1.3)' : 'scale(1)',
            zIndex: -1,
            animation: isRolling ? 'glowPulse 1s ease-in-out infinite' : 'none'
          }}></div>
          
          {/* Moving Shadow */}
          <div style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: `translateX(-50%) ${isRolling ? 'translateY(10px)' : 'translateY(0)'}`,
            width: '120px',
            height: '20px',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            transition: 'all 1s ease-out',
            filter: 'blur(4px)'
          }}></div>
          
          {renderParticles()}
        </div>

        {/* Result Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0,
            fontFamily: 'Inter, sans-serif',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            {isRolling ? 'Rolling...' : `You rolled a ${diceValue}`}
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#6b7280',
            margin: 0,
            fontWeight: '500',
            fontFamily: 'Inter, sans-serif'
          }}>
            {isRolling ? 'The dice is tumbling...' : 'Ready for another roll?'}
          </p>
        </div>

        {/* Roll Button */}
        <button
          onClick={rollDice}
          disabled={isRolling}
          style={{
            padding: '18px 36px',
            background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
            color: 'white',
            fontWeight: '700',
            fontSize: '20px',
            borderRadius: '16px',
            border: 'none',
            cursor: isRolling ? 'not-allowed' : 'pointer',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease-out',
            opacity: isRolling ? 0.5 : 1,
            transform: isRolling ? 'none' : 'scale(1)',
            outline: 'none',
            fontFamily: 'Inter, sans-serif',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            if (!isRolling) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 35px -10px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isRolling) {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.15)';
            }
          }}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </button>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0) scale(1.1) rotate(12deg);
          }
          40%, 43% {
            transform: translate3d(0, -30px, 0) scale(1.1) rotate(12deg);
          }
          70% {
            transform: translate3d(0, -15px, 0) scale(1.1) rotate(12deg);
          }
          90% {
            transform: translate3d(0,-4px,0) scale(1.1) rotate(12deg);
          }
        }
        
        @keyframes backgroundShift {
          0%, 100% {
            background: linear-gradient(135deg, #fed7aa 0%, #ffffff 50%, #fed7aa 100%);
          }
          50% {
            background: linear-gradient(135deg, #fbbf24 0%, #ffffff 50%, #fbbf24 100%);
          }
        }
        
        @keyframes backgroundFloat {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        
        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1.3);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.4);
          }
        }
        
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
