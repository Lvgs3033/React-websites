export interface CelestialObject {
  name: string;
  distanceFromEarth: number; // in light years
  type: 'star' | 'galaxy' | 'nebula' | 'planet';
  description: string;
  color: string;
  nasaId?: string;
  imageUrl?: string;
}

export interface DistanceCalculatorProps {
  object1: CelestialObject | null;
  object2: CelestialObject | null;
  onObjectSelect: (objectNumber: 1 | 2, object: CelestialObject) => void;
}

export interface NASAImage {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
}

export interface NASANewsArticle {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}