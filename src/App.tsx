import React, { useState } from 'react';
import { Home } from '@/pages/Home';
import { Settings } from '@/pages/Settings';
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import './App.css';

type Page = 'home' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { fetchTasks, isLoading, error } = useTasks();

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
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4">
            <Button 
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('home')}
            >
              Tasks
            </Button>
            <Button 
              variant={currentPage === 'settings' ? 'default' : 'ghost'}
              onClick={() => setCurrentPage('settings')}
            >
              Settings
            </Button>
          </div>
        </div>
      </nav>

      {isLoading && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="container mx-auto px-4 py-8">
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
            <p className="text-destructive">Error: {error}</p>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
