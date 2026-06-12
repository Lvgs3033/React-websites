import { CelestialObject } from '../types';

interface DistanceDisplayProps {
  object1: CelestialObject | null;
  object2: CelestialObject | null;
}

function formatDistance(lightYears: number): string {
  if (lightYears < 0.001) {
    return `${(lightYears * 63241.1).toFixed(2)} astronomical units`;
  } else if (lightYears < 1) {
    return `${(lightYears * 63241.1).toFixed(2)} AU`;
  } else if (lightYears < 1000) {
    return `${lightYears.toFixed(2)} light years`;
  } else if (lightYears < 1000000) {
    return `${(lightYears / 1000).toFixed(2)} thousand light years`;
  } else {
    return `${(lightYears / 1000000).toFixed(2)} million light years`;
  }
}

export function DistanceDisplay({ object1, object2 }: DistanceDisplayProps) {
  if (!object1 || !object2) return null;

  const distance = Math.abs(object1.distanceFromEarth - object2.distanceFromEarth);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Distance Information</h3>
      <p className="text-gray-600">
        Distance between {object1.name} and {object2.name}:
      </p>
      <p className="text-2xl font-bold text-gray-700 mt-1">
        {formatDistance(distance)}
      </p>
      <div className="mt-4 text-gray-500">
        <p className="mb-2">Did you know?</p>
        <p>
          Light traveling between these objects would take approximately{' '}
          {distance < 1 ? `${(distance * 365.25).toFixed(1)} days` : `${distance.toFixed(1)} years`} to complete the journey!
        </p>
      </div>
    </div>
  );
}