import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { useAppDispatch } from '../../../app/hooks';
import { fetchStores } from '../../../features/stores/storeSlice';
import SearchHistory from './SearchHistory';

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
  onSearch?: (term: string) => void;
  redirectOnSearch?: boolean;
  initialValue?: string;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder = "Search stores, products...",
  className = "",
  onSearch,
  redirectOnSearch = false,
  initialValue = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Popular search suggestions
  const suggestions = [
    "Restaurants",
    "Clothing stores",
    "Beauty salons",
    "Electronics"
  ];

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse search history:', e);
        setSearchHistory([]);
      }
    }
  }, []);

  // Handle clicks outside the search component to close history/suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Save search term to history
  const saveToHistory = (term: string) => {
    if (!term.trim()) return;
    
    // Add to the beginning and remove duplicates
    const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      saveToHistory(searchTerm);
      
      if (onSearch) {
        onSearch(searchTerm);
      } else {
        dispatch(fetchStores(searchTerm));
      }
      
      if (redirectOnSearch) {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }
      
      setShowHistory(false);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Clear all search history
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  // Clear a single history item
  const clearHistoryItem = (term: string) => {
    const newHistory = searchHistory.filter(item => item !== term);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  // Select an item from history or suggestions
  const selectItem = (term: string) => {
    setSearchTerm(term);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
    >
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 pl-10 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        onFocus={() => {
          setIsFocused(true);
          setShowHistory(true);
        }}
      />
      <div className="absolute left-3 text-gray-400">
        <SearchIcon size={20} />
      </div>
      {searchTerm && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-10 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-3 bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
      >
        <SearchIcon size={14} />
      </button>

      {/* Search history and suggestions */}
      <SearchHistory
        searchHistory={searchHistory}
        suggestions={suggestions}
        onSelectItem={selectItem}
        onClearHistory={clearHistory}
        onClearHistoryItem={clearHistoryItem}
        visible={showHistory}
      />
    </form>
  );
};

export default GlobalSearch;