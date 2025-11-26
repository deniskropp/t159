import React from 'react';
import { Agent } from '../types';
import { Activity, Circle, Cpu } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'working': return 'text-emerald-600 bg-emerald-100';
      case 'idle': return 'text-gray-500 bg-gray-100';
      case 'waiting': return 'text-amber-600 bg-amber-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-secondary/20 shadow-sm p-5 hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/10 transition-colors">
            <Cpu size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-gray-900">{agent.name}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{agent.role}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(agent.status)}`}>
          <Circle size={8} fill="currentColor" />
          <span className="capitalize">{agent.status}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed mb-4 h-16 overflow-hidden text-ellipsis line-clamp-3">
        {agent.description}
      </p>

      <div className="border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-400 mb-2 font-medium">CAPABILITIES</p>
        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((cap, idx) => (
            <span key={idx} className="text-[10px] px-2 py-1 bg-secondary/30 text-primary/80 rounded border border-secondary/20">
              {cap}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
