import React, { useState } from 'react';
import { INITIAL_VFS } from '../constants';
import { FileSystemNode } from '../types';
import { Folder, FolderOpen, FileCode, FileText, ChevronRight, ChevronDown } from 'lucide-react';

const FileNode: React.FC<{ node: FileSystemNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = useState(depth < 2); // Auto open root and first level

  const toggle = () => {
    if (node.type === 'directory') {
      setIsOpen(!isOpen);
    }
  };

  const getIcon = () => {
    if (node.type === 'directory') {
      return isOpen ? <FolderOpen size={16} className="text-accent" /> : <Folder size={16} className="text-accent/80" />;
    }
    if (node.name.endsWith('.ts') || node.name.endsWith('.py')) return <FileCode size={16} className="text-primary" />;
    return <FileText size={16} className="text-gray-500" />;
  };

  return (
    <div className="select-none">
      <div 
        onClick={toggle}
        className={`flex items-center py-1 px-2 hover:bg-secondary/20 rounded cursor-pointer transition-colors ${depth === 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <span className="mr-1 text-gray-400">
            {node.type === 'directory' && (
                isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />
            )}
            {node.type === 'file' && <span className="w-3" />} {/* Spacer */}
        </span>
        <span className="mr-2">{getIcon()}</span>
        <span className="text-sm font-mono">{node.name}</span>
      </div>
      
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <FileNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC = () => {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm border border-secondary/20 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-secondary/20 bg-gray-50/50">
        <h3 className="font-serif font-bold text-gray-900">Virtual File System</h3>
        <p className="text-xs text-gray-500">Read-only view of the project structure</p>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {INITIAL_VFS.map((node) => (
          <FileNode key={node.id} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
