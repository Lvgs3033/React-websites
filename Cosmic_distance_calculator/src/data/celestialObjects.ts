import { CelestialObject } from '../types';

export const celestialObjects: CelestialObject[] = [
  {
    name: 'Sun',
    distanceFromEarth: 0.0000158,
    type: 'star',
    description: 'Our solar system\'s central star',
    color: '#FFD700'
  },
  {
    name: 'Proxima Centauri',
    distanceFromEarth: 4.2,
    type: 'star',
    description: 'The closest star to our Solar System',
    color: '#FF4500'
  },
  {
    name: 'Sirius',
    distanceFromEarth: 8.6,
    type: 'star',
    description: 'The brightest star in Earth\'s night sky',
    color: '#87CEEB'
  },
  {
    name: 'Betelgeuse',
    distanceFromEarth: 548,
    type: 'star',
    description: 'A red supergiant star in Orion',
    color: '#FF6B6B'
  },
  {
    name: 'Andromeda Galaxy',
    distanceFromEarth: 2537000,
    type: 'galaxy',
    description: 'The nearest major galaxy to the Milky Way',
    color: '#9370DB'
  },
  {
    name: 'Orion Nebula',
    distanceFromEarth: 1344,
    type: 'nebula',
    description: 'A diffuse nebula in the Milky Way',
    color: '#48D1CC'
  }
];