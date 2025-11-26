import React from 'react';
import { INITIAL_AGENTS } from '../constants';
import { Activity, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const activeCount = INITIAL_AGENTS.filter(a => a.status === 'working').length;
  const idleCount = INITIAL_AGENTS.filter(a => a.status === 'idle').length;
  
  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-secondary/20 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">System Status</p>
            <p className="text-xl font-bold text-gray-900">Operational</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-secondary/20 shadow-sm flex items-center space-x-4">
           <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">Active Agents</p>
            <p className="text-xl font-bold text-gray-900">{activeCount} / {INITIAL_AGENTS.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-secondary/20 shadow-sm flex items-center space-x-4">
           <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">Pending Tasks</p>
            <p className="text-xl font-bold text-gray-900">12</p>
          </div>
        </div>
         <div className="bg-white p-4 rounded-xl border border-secondary/20 shadow-sm flex items-center space-x-4">
           <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-medium">Events (24h)</p>
            <p className="text-xl font-bold text-gray-900">342</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Recent Activity Log */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-secondary/20 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-serif font-bold text-gray-900">System Activity</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Live</span>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center p-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-4"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Orchestrator delegated Task #{1000 + i} to Code Investigator</p>
                  <p className="text-xs text-gray-400 mt-1">Analyzing dependency graph integrity for module vfs.ts</p>
                </div>
                <span className="text-xs text-gray-400 font-mono">10:{30 + i} AM</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health / Mini Map */}
        <div className="bg-primary text-white rounded-xl shadow-lg p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div>
                <h3 className="font-serif text-xl font-bold mb-1">Architecture Health</h3>
                <p className="text-white/60 text-sm">T20-MAS Protocol v2.1</p>
            </div>
            
            <div className="space-y-4 my-6">
                <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/80">Memory Usage</span>
                        <span className="text-emerald-300">32%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-[32%]"></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/80">Token Budget</span>
                        <span className="text-amber-300">65%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[65%]"></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/80">Agent Latency</span>
                        <span className="text-blue-300">12ms</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-[12%]"></div>
                    </div>
                </div>
            </div>

            <button className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/10">
                Run Diagnostics
            </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
