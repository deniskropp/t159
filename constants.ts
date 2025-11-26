import { Agent, FileSystemNode } from './types';

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'orch-01',
    name: 'Orchestrator',
    role: 'System Coordinator',
    description: 'Manages task delegation, role assignments, and the shared knowledge graph. Ensures the overall plan is executed efficiently.',
    status: 'working',
    capabilities: ['Task Delegation', 'Plan Management', 'Conflict Resolution']
  },
  {
    id: 'code-01',
    name: 'Code Investigator',
    role: 'Analyst',
    description: 'Analyzes existing codebases for context and architectural integrity.',
    status: 'idle',
    capabilities: ['Static Analysis', 'Dependency Mapping', 'Code Review']
  },
  {
    id: 'tas-ext-01',
    name: 'TAS Extractor',
    role: 'Extractor',
    description: 'Identifies abstract actions and reusable patterns from code.',
    status: 'idle',
    capabilities: ['Pattern Recognition', 'Abstraction', 'Metadata Extraction']
  },
  {
    id: 'tas-pur-01',
    name: 'TAS Purifier',
    role: 'Quality Control',
    description: 'Refines abstract principles to ensure they are generic and reusable.',
    status: 'idle',
    capabilities: ['Logic Verification', 'Constraint Checking', 'Optimization']
  },
  {
    id: 'ai-tutor-01',
    name: 'AI Tutor',
    role: 'Educator',
    description: 'Explains concepts and transfers knowledge to users or other agents.',
    status: 'waiting',
    capabilities: ['Explanation Generation', 'Tutorial Creation', 'Q&A']
  },
  {
    id: 'prompt-01',
    name: 'Prompt Engineer',
    role: 'Instruction Architect',
    description: 'Designs and optimizes system prompts for agent personas.',
    status: 'idle',
    capabilities: ['Prompt Optimization', 'Context Design', 'Persona Crafting']
  },
  {
    id: 'des-01',
    name: 'Designer',
    role: 'UI/UX Specialist',
    description: 'Creates visual concepts, color palettes, and typography rules.',
    status: 'working',
    capabilities: ['Visual Design', 'UX Research', 'Prototyping']
  },
  {
    id: 'eng-01',
    name: 'Engineer',
    role: 'Builder',
    description: 'Implements code structures and Pydantic models.',
    status: 'idle',
    capabilities: ['Implementation', 'Testing', 'Refactoring']
  }
];

export const INITIAL_VFS: FileSystemNode[] = [
  {
    id: 'root',
    name: 'root',
    type: 'directory',
    parentId: null,
    children: [
      {
        id: 'src',
        name: 'src',
        type: 'directory',
        parentId: 'root',
        children: [
          {
            id: 'models',
            name: 'models',
            type: 'directory',
            parentId: 'src',
            children: [
              {
                id: 'agent_ts',
                name: 'agent.ts',
                type: 'file',
                parentId: 'models',
                content: '// Agent interfaces\nexport interface AgentProfile { ... }'
              },
              {
                id: 'vfs_ts',
                name: 'vfs.ts',
                type: 'file',
                parentId: 'models',
                content: '// VFS definitions\nexport interface VirtualFileSystemNode { ... }'
              }
            ]
          },
          {
            id: 'main_py',
            name: 'main.py',
            type: 'file',
            parentId: 'src',
            content: 'def main():\n    print("T20-MAS Initialized")'
          }
        ]
      },
      {
        id: 'docs',
        name: 'docs',
        type: 'directory',
        parentId: 'root',
        children: [
          {
            id: 'spec_md',
            name: 'specification.md',
            type: 'file',
            parentId: 'docs',
            content: '# T20-MAS App Specification\n\nThis document outlines the architecture...'
          },
          {
            id: 'prompts_json',
            name: 'engineered_agent_prompts.json',
            type: 'file',
            parentId: 'docs',
            content: '[\n  {\n    "role": "Orchestrator",\n    "prompt": "You are the system coordinator..."\n  }\n]'
          }
        ]
      },
      {
        id: 'conceptual_models_py',
        name: 'conceptual_models.py',
        type: 'file',
        parentId: 'root',
        content: 'from pydantic import BaseModel\n\nclass Task(BaseModel):\n    pass'
      }
    ]
  }
];
