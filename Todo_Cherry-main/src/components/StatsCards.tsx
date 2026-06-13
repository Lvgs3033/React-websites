
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Task } from '@/pages/Index';

interface StatsCardsProps {
  tasks: Task[];
}

const StatsCards = ({ tasks }: StatsCardsProps) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-800 mb-3">📊 Stats</h3>
        <div className="space-y-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{totalTasks}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCards;
