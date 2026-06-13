
import React, { useEffect, useState } from 'react';

const FloatingPetals = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generatePetals = () => {
      const newPetals = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 4,
      }));
      setPetals(newPetals);
    };

    generatePetals();
    
    // Add global styles for the animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-20px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute text-pink-300 text-2xl"
          style={{
            left: `${petal.left}%`,
            top: '-20px',
            animation: `fall ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
};

export default FloatingPetals;
