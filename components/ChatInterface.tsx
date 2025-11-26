import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { generateOrchestratorResponse } from '../services/geminiService';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'system',
      text: 'Connection established with Orchestrator Node. How can I assist you with the T20-MAS operations today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini API
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));

      const responseText = await generateOrchestratorResponse(input, history);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "No response received.",
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'system',
        text: "Error communicating with the agent network.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-secondary/20 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
        <h3 className="font-serif font-bold text-gray-900">Orchestrator Uplink</h3>
        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-medium">Secure Channel</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === 'user' ? 'bg-secondary text-primary' : 
              msg.role === 'system' ? 'bg-gray-100 text-gray-500' : 'bg-primary text-white'
            }`}>
              {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-primary text-white rounded-tr-sm' 
                : msg.role === 'system' 
                  ? 'bg-gray-100 text-gray-600 font-mono text-xs w-full text-center'
                  : 'bg-secondary/20 text-gray-800 rounded-tl-sm'
            }`}>
              {msg.role === 'system' ? (
                msg.text
              ) : (
                <ReactMarkdown 
                    components={{
                        code: ({node, ...props}) => <code className="bg-black/10 px-1 py-0.5 rounded font-mono text-xs" {...props} />
                    }}
                >
                    {msg.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot size={16} className="text-white" />
             </div>
             <div className="bg-secondary/20 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center">
               <Loader2 size={16} className="animate-spin text-primary" />
               <span className="ml-2 text-xs text-primary/70">Processing request...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 px-2"
            placeholder="Message the Orchestrator..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2">
            AI responses may vary. T20-MAS Protocol v2.1
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
