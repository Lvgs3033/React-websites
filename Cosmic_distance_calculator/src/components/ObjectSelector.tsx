import { CelestialObject } from '../types';
import { celestialObjects } from '../data/celestialObjects';

interface ObjectSelectorProps {
  label: string;
  selectedObject: CelestialObject | null;
  onSelect: (object: CelestialObject) => void;
}

export function ObjectSelector({ label, selectedObject, onSelect }: ObjectSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700"
        value={selectedObject?.name || ''}
        onChange={(e) => {
          const selected = celestialObjects.find(obj => obj.name === e.target.value);
          if (selected) onSelect(selected);
        }}
      >
        <option value="" className="text-gray-500">Select an object</option>
        {celestialObjects.map((object) => (
          <option key={object.name} value={object.name} className="text-gray-700">
            {object.name} ({object.type})
          </option>
        ))}
      </select>
    </div>
  );
}