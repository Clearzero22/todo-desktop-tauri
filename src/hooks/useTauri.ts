import { invoke } from '@tauri-apps/api/core';

export interface TauriAPI {
  // Task operations
  getTasks: () => Promise<any[]>;
  createTask: (task: any) => Promise<any>;
  updateTask: (id: string, task: any) => Promise<any>;
  deleteTask: (id: string) => Promise<void>;
  
  // Category operations
  getCategories: () => Promise<any[]>;
  createCategory: (category: any) => Promise<any>;
  deleteCategory: (id: string) => Promise<void>;
  
  // Reminder operations
  getReminders: () => Promise<any[]>;
  createReminder: (reminder: any) => Promise<any>;
  updateReminder: (id: string, reminder: any) => Promise<any>;
  deleteReminder: (id: string) => Promise<void>;
  
  // System operations
  showNotification: (title: string, body: string) => Promise<void>;
  openFile: (path: string) => Promise<void>;
}

export function useTauri(): TauriAPI {
  return {
    async getTasks() {
      try {
        return await invoke('get_tasks');
      } catch (error) {
        console.error('Failed to get tasks:', error);
        throw error;
      }
    },

    async createTask(task) {
      try {
        return await invoke('create_task', { task });
      } catch (error) {
        console.error('Failed to create task:', error);
        throw error;
      }
    },

    async updateTask(id, task) {
      try {
        return await invoke('update_task', { id, task });
      } catch (error) {
        console.error('Failed to update task:', error);
        throw error;
      }
    },

    async deleteTask(id) {
      try {
        await invoke('delete_task', { id });
      } catch (error) {
        console.error('Failed to delete task:', error);
        throw error;
      }
    },

    async getCategories() {
      try {
        return await invoke('get_categories');
      } catch (error) {
        console.error('Failed to get categories:', error);
        throw error;
      }
    },

    async createCategory(category) {
      try {
        return await invoke('create_category', { category });
      } catch (error) {
        console.error('Failed to create category:', error);
        throw error;
      }
    },

    async deleteCategory(id) {
      try {
        await invoke('delete_category', { id });
      } catch (error) {
        console.error('Failed to delete category:', error);
        throw error;
      }
    },

    async getReminders() {
      try {
        return await invoke('get_reminders');
      } catch (error) {
        console.error('Failed to get reminders:', error);
        throw error;
      }
    },

    async createReminder(reminder) {
      try {
        return await invoke('create_reminder', { reminder });
      } catch (error) {
        console.error('Failed to create reminder:', error);
        throw error;
      }
    },

    async updateReminder(id, reminder) {
      try {
        return await invoke('update_reminder', { id, reminder });
      } catch (error) {
        console.error('Failed to update reminder:', error);
        throw error;
      }
    },

    async deleteReminder(id) {
      try {
        await invoke('delete_reminder', { id });
      } catch (error) {
        console.error('Failed to delete reminder:', error);
        throw error;
      }
    },

    async showNotification(title, body) {
      try {
        await invoke('show_notification', { title, body });
      } catch (error) {
        console.error('Failed to show notification:', error);
        throw error;
      }
    },

    async openFile(path) {
      try {
        await invoke('open_file', { path });
      } catch (error) {
        console.error('Failed to open file:', error);
        throw error;
      }
    },
  };
}