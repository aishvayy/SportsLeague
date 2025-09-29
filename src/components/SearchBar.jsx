import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search leagues by name..." }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
