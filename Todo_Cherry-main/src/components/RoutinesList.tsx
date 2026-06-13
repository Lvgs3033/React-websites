
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, CheckCircle, Circle } from 'lucide-react';
import { Routine } from '@/pages/Index';

interface RoutinesListProps {
  routines: Routine[];
  onAddRoutine: () => void;
  onToggleRoutine: (routineId: string) => void;
}

const RoutinesList = ({ routines, onAddRoutine, onToggleRoutine }: RoutinesListProps) => {
  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 ? 'AM' : 'PM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">🌅 Daily Routine</h3>
        
        {routines.length > 0 && (
          <div className="space-y-3 mb-3">
            {routines.map((routine) => (
              <div key={routine.id} className="flex items-start gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleRoutine(routine.id)}
                  className="p-1 h-auto text-pink-500 hover:text-pink-600"
                >
                  {routine.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </Button>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${routine.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {routine.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatTime(routine.time)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button 
          onClick={onAddRoutine}
          variant="outline"
          size="sm"
          className="w-full border-pink-200 text-pink-600 hover:bg-pink-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Routine
        </Button>
      </CardContent>
    </Card>
  );
};

export default RoutinesList;
