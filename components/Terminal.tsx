import React, { useState, useEffect, useRef } from 'react';
import { TerminalLine } from '../types';
import { INITIAL_VFS } from '../constants';

const Terminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'T20-MAS CLI Simulator v1.0.0 initialized...', timestamp: Date.now() },
    { id: '2', type: 'system', content: 'Type "help" for available commands.', timestamp: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [cwd, setCwd] = useState('/root');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type: 'input',
      content: `${cwd} $ ${trimmed}`,
      timestamp: Date.now(),
    };

    setLines(prev => [...prev, newLine]);
    processCommand(trimmed);
    setInput('');
  };

  const processCommand = (cmdStr: string) => {
    const args = cmdStr.split(' ');
    const command = args[0].toLowerCase();
    
    let output: string | null = null;
    let type: TerminalLine['type'] = 'output';

    switch (command) {
      case 'help':
        output = `Available commands:
  help      - Show this help message
  ls        - List directory contents
  pwd       - Print working directory
  clear     - Clear terminal
  status    - Show system status
  date      - Show current timestamp`;
        break;
      case 'clear':
        setLines([]);
        return;
      case 'pwd':
        output = cwd;
        break;
      case 'ls':
        // Simplified ls for simulation purposes (always lists root or docs based on simple logic)
        if (cwd === '/root') {
            output = 'src/  docs/  conceptual_models.py';
        } else if (cwd.includes('src')) {
            output = 'models/  main.py';
        } else if (cwd.includes('docs')) {
            output = 'specification.md  engineered_agent_prompts.json';
        } else {
            output = '(empty)';
        }
        break;
      case 'status':
        output = 'SYSTEM INTEGRITY: 100%\nAGENTS ONLINE: 8/8\nVFS MOUNTED: READ/WRITE';
        break;
      case 'date':
        output = new Date().toISOString();
        break;
      default:
        output = `Command not found: ${command}`;
        type = 'error';
    }

    if (output) {
      setLines(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type,
        content: output,
        timestamp: Date.now(),
      }]);
    }
  };

  return (
    <div className="h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 rounded-lg shadow-inner flex flex-col overflow-hidden border border-gray-700">
      <div className="flex-1 overflow-y-auto space-y-1 pb-4">
        {lines.map((line) => (
          <div key={line.id} className={`${line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-secondary/80 mt-2' : 'text-gray-300'} whitespace-pre-wrap`}>
            {line.type === 'system' && <span className="text-blue-400"># </span>}
            {line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-2 flex items-center bg-gray-800/50 p-2 rounded">
        <span className="text-green-500 mr-2">➜</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
          className="bg-transparent border-none outline-none flex-1 text-white"
          autoFocus
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
};

export default Terminal;
