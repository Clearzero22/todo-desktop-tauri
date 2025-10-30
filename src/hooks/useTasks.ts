import { useState, useCallback } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual Tauri API call
      // const tasksFromAPI = await invoke('get_tasks');
      const tasksFromAPI: Task[] = [
        {
          id: '1',
          title: 'Welcome to Todo App!',
          completed: false,
          priority: 'high',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          category: 'Demo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Try adding a new task',
          completed: false,
          priority: 'medium',
          category: 'Demo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Click the checkbox to complete',
          completed: true,
          priority: 'low',
          category: 'Demo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      setTasks(tasksFromAPI);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual Tauri API call
      // const newTask = await invoke('create_task', { task: taskData });
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setTasks(prev => [...prev, newTask]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual Tauri API call
      // await invoke('update_task', { id, task: updates });
      
      setTasks(prev => prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual Tauri API call
      // await invoke('delete_task', { id });
      
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleTask = useCallback(async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    await updateTask(id, { completed: !task.completed });
  }, [tasks, updateTask]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearError,
  };
}