
import React, { useState } from 'react';
import { Search, Filter, ExternalLink, Save, Share } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  source: string;
  type: 'peer-reviewed' | 'government' | 'news';
  url: string;
  timestamp: string;
  relevanceScore: number;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Global Health Security Index 2024: Climate Resilience Assessment',
    snippet: 'Recent analysis shows that countries with robust climate adaptation policies demonstrate significantly better health outcomes during extreme weather events...',
    source: 'WHO Global Health Observatory',
    type: 'government',
    url: '#',
    timestamp: '2 days ago',
    relevanceScore: 0.95
  },
  {
    id: '2',
    title: 'Machine Learning Applications in Public Health Decision Making',
    snippet: 'A comprehensive review of AI-driven approaches to public health surveillance and policy optimization, with case studies from 15 countries...',
    source: 'Nature Medicine',
    type: 'peer-reviewed',
    url: '#',
    timestamp: '1 week ago',
    relevanceScore: 0.89
  }
];

export const SearchPanel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    timeRange: 'all',
    relevance: 0.7
  });

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1500);
  };

  const getSourceBadgeColor = (type: string) => {
    switch (type) {
      case 'peer-reviewed': return 'bg-green-100 text-green-700 border-green-300';
      case 'government': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'news': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Search className="h-5 w-5 mr-2 text-blue-500" />
          AI-Powered Research & Citation
        </h2>
        
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for policies, research, health data, climate studies..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select 
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="all">All Sources</option>
              <option value="peer-reviewed">Peer Reviewed</option>
              <option value="government">Government</option>
              <option value="news">News</option>
            </select>
          </div>
          <select 
            value={filters.timeRange}
            onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All Time</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
          </select>
        </div>
      </div>
      
      {loading && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      )}
      
      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Found {results.length} results with citations</p>
          
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.snippet}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Save className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs border",
                    getSourceBadgeColor(result.type)
                  )}>
                    {result.type.replace('-', ' ')}
                  </span>
                  <span className="text-gray-500">{result.source}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{result.timestamp}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-gray-500">
                    Relevance: {Math.round(result.relevanceScore * 100)}%
                  </div>
                  <button className="flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors">
                    <ExternalLink className="h-3 w-3" />
                    <span className="text-xs">View Source</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
