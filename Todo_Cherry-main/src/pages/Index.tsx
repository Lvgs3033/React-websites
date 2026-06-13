import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, CheckCircle, Clock, List } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TaskModal from '@/components/TaskModal';
import CategoryModal from '@/components/CategoryModal';
import RoutineModal from '@/components/RoutineModal';
import WelcomeModal from '@/components/WelcomeModal';
import TaskList from '@/components/TaskList';
import FilterButtons from '@/components/FilterButtons';
import StatsCards from '@/components/StatsCards';
import CategoriesList from '@/components/CategoriesList';
import RoutinesList from '@/components/RoutinesList';
import FloatingPetals from '@/components/FloatingPetals';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Routine {
  id: string;
  title: string;
  time: string;
  description: string;
  frequency: 'daily' | 'weekdays' | 'weekends';
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Personal', color: '#ff69b4' },
    { id: '2', name: 'Work', color: '#9370db' },
    { id: '3', name: 'Health', color: '#20b2aa' },
  ]);
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Create default tasks
  const createDefaultTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    return [
      {
        id: 'default-1',
        title: 'Start your day with meditation',
        description: 'Take 10 minutes to center yourself and set positive intentions for the day',
        category: '1', // Personal
        priority: 'medium' as const,
        dueDate: today,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'default-2',
        title: 'Review daily goals',
        description: 'Check your priorities and plan your most important tasks',
        category: '2', // Work
        priority: 'high' as const,
        dueDate: today,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'default-3',
        title: 'Drink 8 glasses of water',
        description: 'Stay hydrated throughout the day for optimal health',
        category: '3', // Health
        priority: 'medium' as const,
        dueDate: today,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'default-4',
        title: 'Plan tomorrow\'s schedule',
        description: 'Organize your upcoming tasks and appointments',
        category: '2', // Work
        priority: 'low' as const,
        dueDate: tomorrowString,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'default-5',
        title: 'Practice gratitude',
        description: 'Write down three things you\'re grateful for today',
        category: '1', // Personal
        priority: 'low' as const,
        dueDate: today,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
  };

  useEffect(() => {
    // Load data from localStorage
    const savedTasks = localStorage.getItem('cherry-tasks');
    const savedCategories = localStorage.getItem('cherry-categories');
    const savedRoutines = localStorage.getItem('cherry-routines');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Set default tasks if no saved tasks exist
      const defaultTasks = createDefaultTasks();
      setTasks(defaultTasks);
    }
    
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedRoutines) setRoutines(JSON.parse(savedRoutines));
  }, []);

  useEffect(() => {
    localStorage.setItem('cherry-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('cherry-categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('cherry-routines', JSON.stringify(routines));
  }, [routines]);

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const addRoutine = (routineData: Omit<Routine, 'id' | 'completed'>) => {
    const newRoutine: Routine = {
      ...routineData,
      id: Date.now().toString(),
      completed: false,
    };
    setRoutines([...routines, newRoutine]);
  };

  const toggleRoutineComplete = (routineId: string) => {
    setRoutines(routines.map(routine => 
      routine.id === routineId ? { ...routine, completed: !routine.completed } : routine
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case 'today':
        return task.dueDate === new Date().toISOString().split('T')[0];
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      <FloatingPetals />
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <CheckCircle className="text-pink-500" />
            Cherry Blossom Planner
          </h1>
          <p className="text-gray-600">Bloom with productivity, one task at a time 🌸</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardContent className="p-4">
                <Button 
                  onClick={() => setIsTaskModalOpen(true)}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Task
                </Button>
              </CardContent>
            </Card>

            <StatsCards tasks={tasks} />
            <CategoriesList 
              categories={categories} 
              onAddCategory={() => setIsCategoryModalOpen(true)} 
            />
            <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            <RoutinesList 
              routines={routines} 
              onAddRoutine={() => setIsRoutineModalOpen(true)}
              onToggleRoutine={toggleRoutineComplete}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search tasks... 🔍"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-pink-200 focus:border-pink-400"
                  />
                </div>
              </CardContent>
            </Card>

            <TaskList 
              tasks={filteredTasks}
              categories={categories}
              onToggleComplete={toggleTaskComplete}
              onEdit={(task) => {
                setEditingTask(task);
                setIsTaskModalOpen(true);
              }}
              onDelete={deleteTask}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <WelcomeModal 
        isOpen={isWelcomeModalOpen} 
        onClose={() => setIsWelcomeModalOpen(false)} 
      />
      
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={editingTask ? updateTask : addTask}
        categories={categories}
        editingTask={editingTask}
      />
      
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={addCategory}
      />
      
      <RoutineModal
        isOpen={isRoutineModalOpen}
        onClose={() => setIsRoutineModalOpen(false)}
        onSave={addRoutine}
      />
    </div>
  );
};

export default Index;
