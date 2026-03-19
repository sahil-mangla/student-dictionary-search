import React from 'react';
import { User } from 'lucide-react';

const HighlightText = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  
  // Create regex with case-insensitive flag and capturing group to keep original case
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const safeHighlight = escapeRegExp(highlight);
  const regex = new RegExp(`(${safeHighlight})`, 'gi');
  
  // Split the text into parts based on the highlight term
  const parts = text.split(regex);
  
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? <span key={i} className="highlight">{part}</span> : <span key={i}>{part}</span>
      )}
    </span>
  );
};

const DropdownList = ({ results, query, onSelect, loading }) => {
  if (loading && results.length === 0) {
    return (
      <div className="dropdown empty">
        <p>Searching...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="dropdown empty">
        <p>No matching students found.</p>
      </div>
    );
  }

  return (
    <ul className="dropdown">
      {results.map(student => (
        <li 
          key={student["Roll Number"]} 
          className="dropdown-item" 
          onClick={() => onSelect(student)}
        >
          <div className="item-icon">
            <User size={18} />
          </div>
          <div className="item-details">
            <div className="item-name">
              <HighlightText text={student.Name} highlight={query} />
            </div>
            <div className="item-meta">
              Roll No: {student["Roll Number"]} | Class: {student.Class}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
