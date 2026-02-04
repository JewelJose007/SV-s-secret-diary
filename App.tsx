
import React, { useState, useEffect } from 'react';
import { View, JournalEntry, User } from './types';
import Navigation from './components/Navigation';
import Home from './views/Home';
import Journal from './views/Journal';
import Pause from './views/Pause';
import Archive from './views/Archive';
import Reflect from './views/Reflect';
import Login from './views/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.LOGIN);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('steady_heart_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setCurrentView(View.HOME);
      } catch (e) {
        localStorage.removeItem('steady_heart_user');
      }
    }
  }, []);

  // Sync entries for the logged-in user
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`steady_heart_entries_${user.id}`);
      if (saved) {
        try { setEntries(JSON.parse(saved)); } catch (e) {}
      } else {
        setEntries([]);
      }
    }
  }, [user]);

  // Save entries on change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`steady_heart_entries_${user.id}`, JSON.stringify(entries));
    }
  }, [entries, user]);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('steady_heart_user', JSON.stringify(u));
    setCurrentView(View.HOME);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('steady_heart_user');
    setCurrentView(View.LOGIN);
  };

  const handleSaveEntry = (newEntry: Omit<JournalEntry, 'id' | 'date' | 'userId'>) => {
    if (!user) return;
    const entry: JournalEntry = {
      ...newEntry,
      id: crypto.randomUUID(),
      userId: user.id,
      date: new Date().toISOString(),
    };
    setEntries(prev => [entry, ...prev]);
    setCurrentView(View.HOME);
  };

  const renderView = () => {
    if (!user && currentView !== View.LOGIN) return <Login onLogin={handleLogin} />;

    switch (currentView) {
      case View.LOGIN: return <Login onLogin={handleLogin} />;
      case View.HOME: return <Home onNavigate={setCurrentView} user={user!} onLogout={handleLogout} entriesCount={entries.length} />;
      case View.WRITE: return <Journal onSave={handleSaveEntry} onCancel={() => setCurrentView(View.HOME)} />;
      case View.PAUSE: return <Pause />;
      case View.REFLECT: return <Reflect entries={entries} />;
      case View.ARCHIVE: return <Archive entries={entries} />;
      default: return <Home onNavigate={setCurrentView} user={user!} onLogout={handleLogout} entriesCount={entries.length} />;
    }
  };

  return (
    <div className="min-h-screen max-w-screen-md mx-auto relative shadow-2xl bg-[#fafafa] flex flex-col">
      <main className="flex-1 overflow-y-auto pb-24">
        {renderView()}
      </main>
      {user && currentView !== View.HOME && (
        <Navigation currentView={currentView} onNavigate={setCurrentView} />
      )}
    </div>
  );
};

export default App;
