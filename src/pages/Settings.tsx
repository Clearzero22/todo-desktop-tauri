import { useState } from 'react';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export function Settings() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Work', color: '#ff6b6b' },
    { id: '2', name: 'Personal', color: '#4ecdc4' },
    { id: '3', name: 'Shopping', color: '#45b7d1' },
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#ff6b6b');

  const [notifications, setNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      color: newCategoryColor,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setNewCategoryColor('#ff6b6b');
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="settings-page">
      <header className="page-header">
        <h1>Settings</h1>
      </header>

      <section className="settings-section">
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map(category => (
            <div key={category.id} className="category-item">
              <div 
                className="category-color"
                style={{ backgroundColor: category.color }}
              />
              <span>{category.name}</span>
              <button 
                onClick={() => handleDeleteCategory(category.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="add-category">
          <input
            type="text"
            placeholder="Category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <input
            type="color"
            value={newCategoryColor}
            onChange={(e) => setNewCategoryColor(e.target.value)}
          />
          <button onClick={handleAddCategory}>Add Category</button>
        </div>
      </section>

      <section className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
            Enable notifications
          </label>
        </div>

        {notifications && (
          <div className="setting-item">
            <label>
              Default reminder time:
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </label>
          </div>
        )}
      </section>
    </div>
  );
}