export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: 'idle' | 'working' | 'waiting' | 'error';
  capabilities: string[];
}

export interface FileSystemNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileSystemNode[];
  parentId?: string | null;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

export enum TabView {
  DASHBOARD = 'dashboard',
  AGENTS = 'agents',
  TERMINAL = 'terminal',
  FILES = 'files',
  CHAT = 'chat',
}
