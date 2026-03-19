import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';
import DropdownList from './DropdownList';

const SearchBar = ({ onSelectStudent }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const searchContainerRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Only fetch if 3 or more characters
    if (debouncedQuery.trim().length >= 3) {
      setLoading(true);
      
      const apiUrl = import.meta.env.MODE === 'production' 
        ? `/api/students/search?q=${encodeURIComponent(debouncedQuery)}`
        : `http://localhost:5001/api/students/search?q=${encodeURIComponent(debouncedQuery)}`;
        
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          setResults(data);
          setLoading(false);
          setShowDropdown(true);
        })
        .catch(err => {
          console.error('Error fetching students:', err);
          setLoading(false);
        });
    } else {
      setResults([]);
      setShowDropdown(false);
      setLoading(false);
    }
  }, [debouncedQuery]);

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          className="search-input"
          placeholder="Search students by name (min 3 chars)..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            // Optionally, we could show the dropdown immediately when typing or wait for fetch
            if (e.target.value.trim().length >= 3) {
              setLoading(true);
            }
          }}
          onFocus={() => {
            if (query.trim().length >= 3) {
              setShowDropdown(true);
            }
          }}
        />
        {loading && <div className="spinner"></div>}
      </div>
      
      {showDropdown && query.trim().length >= 3 && (
        <DropdownList 
          results={results} 
          query={query}
          onSelect={(student) => {
            onSelectStudent(student);
            setShowDropdown(false);
            // Optionally setQuery("") to reset, but retaining allows editing
          }} 
          loading={loading && results.length === 0}
        />
      )}
    </div>
  );
};

export default SearchBar;
