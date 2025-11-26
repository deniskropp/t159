import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AgentCard from './components/AgentCard';
import Terminal from './components/Terminal';
import FileExplorer from './components/FileExplorer';
import ChatInterface from './components/ChatInterface';
import { TabView } from './types';
import { INITIAL_AGENTS } from './constants';
import { initializeGemini } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.DASHBOARD);

  useEffect(() => {
    initializeGemini();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case TabView.DASHBOARD:
        return <Dashboard />;
      case TabView.AGENTS:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {INITIAL_AGENTS.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        );
      case TabView.TERMINAL:
        return (
          <div className="h-[calc(100vh-8rem)]">
             <h2 className="text-xl font-serif font-bold text-primary mb-4">Command Line Simulator</h2>
             <Terminal />
          </div>
        );
      case TabView.FILES:
        return (
             <div className="h-[calc(100vh-8rem)]">
             <h2 className="text-xl font-serif font-bold text-primary mb-4">VFS Explorer</h2>
             <FileExplorer />
          </div>
        );
      case TabView.CHAT:
        return (
             <div className="h-[calc(100vh-8rem)]">
             <h2 className="text-xl font-serif font-bold text-primary mb-4">Orchestrator Communication</h2>
             <ChatInterface />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f3e5d8]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
