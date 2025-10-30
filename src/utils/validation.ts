export interface ValidationError {
  field: string;
  message: string;
}

export function validateTaskTitle(title: string): ValidationError | null {
  if (!title || title.trim().length === 0) {
    return {
      field: 'title',
      message: 'Task title is required'
    };
  }
  
  if (title.trim().length > 200) {
    return {
      field: 'title',
      message: 'Task title must be less than 200 characters'
    };
  }
  
  return null;
}

export function validateTaskDescription(description: string): ValidationError | null {
  if (description && description.length > 1000) {
    return {
      field: 'description',
      message: 'Task description must be less than 1000 characters'
    };
  }
  
  return null;
}

export function validateDueDate(dueDate: string): ValidationError | null {
  if (!dueDate) return null;
  
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) {
    return {
      field: 'dueDate',
      message: 'Invalid due date format'
    };
  }
  
  const now = new Date();
  if (date < now) {
    return {
      field: 'dueDate',
      message: 'Due date cannot be in the past'
    };
  }
  
  return null;
}

export function validateCategoryName(name: string): ValidationError | null {
  if (!name || name.trim().length === 0) {
    return {
      field: 'name',
      message: 'Category name is required'
    };
  }
  
  if (name.trim().length > 50) {
    return {
      field: 'name',
      message: 'Category name must be less than 50 characters'
    };
  }
  
  if (!/^[a-zA-Z0-9\s\-_]+$/.test(name.trim())) {
    return {
      field: 'name',
      message: 'Category name can only contain letters, numbers, spaces, hyphens, and underscores'
    };
  }
  
  return null;
}

export function validateCategoryColor(color: string): ValidationError | null {
  if (!color) {
    return {
      field: 'color',
      message: 'Category color is required'
    };
  }
  
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexColorRegex.test(color)) {
    return {
      field: 'color',
      message: 'Invalid color format. Please use hex color format (e.g., #FF5733)'
    };
  }
  
  return null;
}

export function validateReminderTime(time: string): ValidationError | null {
  if (!time) {
    return {
      field: 'time',
      message: 'Reminder time is required'
    };
  }
  
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return {
      field: 'time',
      message: 'Invalid time format. Please use HH:MM format (24-hour)'
    };
  }
  
  return null;
}

export function validateEmail(email: string): ValidationError | null {
  if (!email) return null;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      field: 'email',
      message: 'Invalid email format'
    };
  }
  
  return null;
}

export function validateTask(task: {
  title: string;
  description?: string;
  dueDate?: string;
  priority?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const titleError = validateTaskTitle(task.title);
  if (titleError) errors.push(titleError);
  
  const descriptionError = validateTaskDescription(task.description || '');
  if (descriptionError) errors.push(descriptionError);
  
  const dueDateError = validateDueDate(task.dueDate || '');
  if (dueDateError) errors.push(dueDateError);
  
  if (task.priority && !['low', 'medium', 'high'].includes(task.priority)) {
    errors.push({
      field: 'priority',
      message: 'Priority must be low, medium, or high'
    });
  }
  
  return errors;
}

export function validateCategory(category: {
  name: string;
  color: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const nameError = validateCategoryName(category.name);
  if (nameError) errors.push(nameError);
  
  const colorError = validateCategoryColor(category.color);
  if (colorError) errors.push(colorError);
  
  return errors;
}