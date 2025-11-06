import React, { useState } from 'react';
import { Rocket, Sun, Moon } from 'lucide-react';
import { CelestialObject } from './types';
import { Scene } from './components/Scene';
import { ObjectSelector } from './components/ObjectSelector';
import { DistanceDisplay } from './components/DistanceDisplay';
import { motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useQuery } from 'react-query';
import { getAPOD } from './services/nasa';

function App() {
  const [object1, setObject1] = useState<CelestialObject | null>(null);
  const [object2, setObject2] = useState<CelestialObject | null>(null);
  const { theme, isDark, toggleTheme } = useTheme();
  
  const { data: apod } = useQuery('apod', getAPOD);

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2">
            <Rocket className="w-8 h-8" style={{ color: theme.accent }} />
            <h1 className="text-3xl font-bold">Cosmic Distance Calculator</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full"
            style={{ backgroundColor: theme.primary }}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </motion.div>

        {apod && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-8 rounded-lg overflow-hidden shadow-xl"
          >
            <img 
              src={apod.url} 
              alt={apod.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4" style={{ backgroundColor: theme.primary }}>
              <h3 className="text-xl font-bold mb-2">{apod.title}</h3>
              <p className="text-sm">{apod.explanation}</p>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: theme.primary }}
          >
            <h2 className="text-xl font-semibold mb-4">Select Celestial Objects</h2>
            <div className="space-y-4">
              <ObjectSelector
                label="First Object"
                selectedObject={object1}
                onSelect={(obj) => setObject1(obj)}
                theme={theme}
              />
              <ObjectSelector
                label="Second Object"
                selectedObject={object2}
                onSelect={(obj) => setObject2(obj)}
                theme={theme}
              />
            </div>
          </motion.div>

          <DistanceDisplay object1={object1} object2={object2} theme={theme} />
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 rounded-lg shadow-lg overflow-hidden"
        >
          <Scene object1={object1} object2={object2} />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-8 p-6 rounded-lg shadow-lg"
          style={{ backgroundColor: theme.primary }}
        >
          <h2 className="text-xl font-semibold mb-4">About Cosmic Distances</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              Cosmic distances are so vast that astronomers use special units of measurement. 
              The most common units are:
            </p>
            <ul className="space-y-2">
              <li><strong>Astronomical Unit (AU):</strong> The average distance between Earth and the Sun (about 150 million kilometers)</li>
              <li><strong>Light Year:</strong> The distance light travels in one year (about 9.46 trillion kilometers)</li>
              <li><strong>Parsec:</strong> Approximately 3.26 light years, based on stellar parallax measurement</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;