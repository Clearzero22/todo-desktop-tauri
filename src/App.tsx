import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Settings } from './pages/Settings';
import { useTasks } from './hooks/useTasks';
import './App.css';

type Page = 'home' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { tasks, fetchTasks, isLoading, error } = useTasks();

  React.useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <button 
          className={currentPage === 'home' ? 'active' : ''}
          onClick={() => setCurrentPage('home')}
        >
          Tasks
        </button>
        <button 
          className={currentPage === 'settings' ? 'active' : ''}
          onClick={() => setCurrentPage('settings')}
        >
          Settings
        </button>
      </nav>

      {isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      )}

      <main className="app-main">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
