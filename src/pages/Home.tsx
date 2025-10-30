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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Todo Tasks</h1>
          <p className="text-gray-600 mt-2">
            Manage your daily tasks efficiently
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All ({tasks.length})
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'outline'}
              onClick={() => setFilter('active')}
            >
              Active ({tasks.filter(t => !t.completed).length})
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
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