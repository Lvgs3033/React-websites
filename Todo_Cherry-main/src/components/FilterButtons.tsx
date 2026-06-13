
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { List, Calendar, CheckCircle, Clock } from 'lucide-react';

interface FilterButtonsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterButtons = ({ activeFilter, onFilterChange }: FilterButtonsProps) => {
  const filters = [
    { id: 'all', label: 'All Tasks', icon: List },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'completed', label: 'Completed', icon: CheckCircle },
    { id: 'pending', label: 'Pending', icon: Clock },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">🌺 Filters</h3>
        <div className="space-y-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onFilterChange(filter.id)}
                className={`w-full justify-start ${
                  activeFilter === filter.id 
                    ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {filter.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterButtons;
