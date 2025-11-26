import React from 'react';
import { LayoutDashboard, Users, TerminalSquare, FolderTree, MessageSquare } from 'lucide-react';
import { TabView } from '../types';

interface SidebarProps {
  activeTab: TabView;
  setActiveTab: (tab: TabView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: TabView.DASHBOARD, label: 'Mission Control', icon: LayoutDashboard },
    { id: TabView.AGENTS, label: 'Agents', icon: Users },
    { id: TabView.TERMINAL, label: 'Terminal', icon: TerminalSquare },
    { id: TabView.FILES, label: 'VFS Explorer', icon: FolderTree },
    { id: TabView.CHAT, label: 'Orchestrator Link', icon: MessageSquare },
  ];

  return (
    <div className="w-64 bg-primary text-secondary h-full flex flex-col shadow-xl">
      <div className="p-6 border-b border-secondary/10">
        <h1 className="font-serif text-2xl font-bold tracking-tight text-white">T20-MAS</h1>
        <p className="text-xs text-secondary/60 mt-1 uppercase tracking-widest">System Specification</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-secondary/10 text-white font-medium shadow-sm' 
                  : 'text-secondary/70 hover:bg-secondary/5 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-accent' : 'text-secondary/50 group-hover:text-secondary'} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-secondary/10">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-mono text-secondary/60">SYSTEM ONLINE</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
