'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

// Mock chat messages
const mockMessages = [
  { type: 'user', message: 'Create a presentation about our startup' },
  { type: 'bot', message: 'I\'ll help you create a comprehensive startup presentation. Let me start generating slides...' },
  { type: 'user', message: 'Include problem statement and solution' },
  { type: 'bot', message: 'Perfect! I\'ll make sure to include a clear problem statement and our innovative solution.' },
  { type: 'user', message: 'Add market analysis and competitive advantage' },
  { type: 'bot', message: 'Generating slides with market analysis and competitive advantage sections...' },
  { type: 'user', message: 'Include financial projections' },
  { type: 'bot', message: 'Adding financial projections and growth strategy to the presentation.' },
  { type: 'user', message: 'Make it look professional' },
  { type: 'bot', message: 'Applying professional styling and formatting to all slides. Almost ready!' },
];

export default function ChatHistory() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Chat History
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Your conversation with AI assistant
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {mockMessages.map((msg, index) => (
            <div key={index} className="flex gap-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={msg.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'}>
                  {msg.type === 'user' ? (
                    <User className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-purple-600" />
                  )}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900">
                    {msg.type === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {msg.type === 'user' ? '2m ago' : '1m ago'}
                  </span>
                </div>
                
                <div className={`p-3 rounded-lg text-sm ${
                  msg.type === 'user' 
                    ? 'bg-blue-50 text-blue-900 border border-blue-200' 
                    : 'bg-slate-50 text-slate-700 border border-slate-200'
                }`}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Status */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          AI is generating your presentation...
        </div>
      </div>
    </div>
  );
}