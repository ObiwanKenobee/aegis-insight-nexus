
import React, { useState } from 'react';
import { Send, BookOpen, Search, Brain, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

interface Citation {
  source: string;
  url: string;
  type: 'peer-reviewed' | 'government' | 'news';
}

const queryTemplates = [
  { id: 'health', label: 'Health Analysis', prompt: 'Analyze current health trends and provide actionable insights for public health policy...' },
  { id: 'climate', label: 'Climate Impact', prompt: 'Assess climate change impacts and recommend adaptation strategies for our region...' },
  { id: 'policy', label: 'Policy Simulation', prompt: 'Simulate the potential outcomes of implementing this policy change...' }
];

export const AIInteractionPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on the latest data analysis, I've identified several key insights regarding your query about "${inputValue}". Here are the main findings with supporting evidence from reliable sources.`,
        citations: [
          { source: 'WHO Health Report 2024', url: '#', type: 'government' },
          { source: 'Climate Research Journal', url: '#', type: 'peer-reviewed' }
        ],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 2000);
  };

  const useTemplate = (template: any) => {
    setInputValue(template.prompt);
    setSelectedTemplate(template.id);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-blue-500" />
          AI Decision Intelligence
        </h3>
        <p className="text-sm text-gray-500 mt-1">Powered by Sonar APIs</p>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Quick Start Templates:</p>
        <div className="flex flex-wrap gap-2">
          {queryTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => useTemplate(template)}
              className={cn(
                "px-3 py-1 text-xs rounded-full border transition-colors",
                selectedTemplate === template.id
                  ? "bg-blue-100 text-blue-700 border-blue-300"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              )}
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Start a conversation with AI to get insights on health, governance, or climate data.</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex",
            message.type === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[80%] rounded-lg p-3",
              message.type === 'user' 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-900"
            )}>
              <p className="text-sm">{message.content}</p>
              {message.citations && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">Sources:</p>
                  {message.citations.map((citation, index) => (
                    <div key={index} className="flex items-center text-xs text-blue-600 hover:underline cursor-pointer">
                      <span className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        citation.type === 'peer-reviewed' ? 'bg-green-500' :
                        citation.type === 'government' ? 'bg-blue-500' : 'bg-orange-500'
                      )}></span>
                      {citation.source}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about health trends, policy impacts, climate risks..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
