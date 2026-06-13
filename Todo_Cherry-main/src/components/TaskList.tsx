
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Edit, Trash2, Calendar } from 'lucide-react';
import { Task, Category } from '@/pages/Index';

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList = ({ tasks, categories, onToggleComplete, onEdit, onDelete }: TaskListProps) => {
  const getCategoryById = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId);
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🌹';
      case 'medium': return '🌺';
      case 'low': return '🌸';
      default: return '🌸';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (tasks.length === 0) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No tasks found</h3>
          <p className="text-gray-500">Add a new task to get started with your productivity journey!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const category = getCategoryById(task.category);
        return (
          <Card 
            key={task.id} 
            className={`bg-white/80 backdrop-blur-sm border-pink-200 transition-all duration-200 hover:shadow-md ${
              task.completed ? 'opacity-75' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleComplete(task.id)}
                  className="p-1 h-auto text-pink-500 hover:text-pink-600"
                >
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(task)}
                        className="p-1 h-auto text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(task.id)}
                        className="p-1 h-auto text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {task.description && (
                    <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    {category && (
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                        style={{ 
                          borderColor: category.color, 
                          color: category.color,
                          backgroundColor: `${category.color}10`
                        }}
                      >
                        {category.name}
                      </Badge>
                    )}

                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(task.dueDate)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TaskList;
