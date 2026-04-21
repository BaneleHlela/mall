import React from 'react';
import { X, Clock, Search as SearchIcon } from 'lucide-react';

interface SearchHistoryProps {
  searchHistory: string[];
  suggestions: string[];
  onSelectItem: (term: string) => void;
  onClearHistory: () => void;
  onClearHistoryItem: (term: string) => void;
  visible: boolean;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  suggestions,
  onSelectItem,
  onClearHistory,
  onClearHistoryItem,
  visible
}) => {
  if (!visible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 max-h-[300px] overflow-y-auto">
      {/* Recent searches */}
      {searchHistory.length > 0 && (
        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-700">Recent Searches</h3>
            <button 
              onClick={onClearHistory}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear All
            </button>
          </div>
          <ul>
            {searchHistory.map((term, index) => (
              <li key={`history-${index}`} className="flex items-center justify-between py-1">
                <button 
                  onClick={() => onSelectItem(term)}
                  className="flex items-center text-gray-700 hover:text-black w-full text-left"
                >
                  <Clock size={14} className="mr-2 text-gray-400" />
                  <span>{term}</span>
                </button>
                <button 
                  onClick={() => onClearHistoryItem(term)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="p-2 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggestions</h3>
          <ul>
            {suggestions.map((term, index) => (
              <li key={`suggestion-${index}`}>
                <button 
                  onClick={() => onSelectItem(term)}
                  className="flex items-center text-gray-700 hover:text-black w-full text-left py-1"
                >
                  <SearchIcon size={14} className="mr-2 text-gray-400" />
                  <span>{term}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;