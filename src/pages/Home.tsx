import { useState } from 'react';
import { TaskList } from '@/components/TaskList';
import { AddTaskModal } from '@/components/AddTaskModal';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const { 
    tasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    isLoading, 
    error 
  } = useTasks();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleAddTask = async (newTask: Omit<any, 'id' | 'completed'>) => {
    await addTask(newTask);
  };

  const handleToggleTask = async (id: string) => {
    await toggleTask(id);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleEditTask = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit task:', id);
  };

  return (
    <div className="space-y-8 fade-in">
      <div className="flex items-center justify-between slide-in">
        <div>
          <h1 className="text-4xl font-bold text-gradient tracking-tight mb-2">
            Todo Tasks
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your daily tasks efficiently
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          size="lg"
          className="gradient-button floating-animation shadow-glow-hover"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Task
        </Button>
      </div>

      <Card className="gradient-card border-0 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'gradient-button' : 'hover:bg-white/70 border-gray-200'}
            >
              All ({tasks.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
              className={filter === 'active' ? 'gradient-button' : 'hover:bg-white/70 border-gray-200'}
            >
              Active ({tasks.filter(t => !t.completed).length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'gradient-button' : 'hover:bg-white/70 border-gray-200'}
            >
              Completed ({tasks.filter(t => t.completed).length})
            </Button>
          </div>
        </CardContent>
      </Card>

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
}