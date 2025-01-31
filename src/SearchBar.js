import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

const SearchBar = ({ items, onSelect, onClear, placeholder }) => {
  const handleOnSelect = (item) => {
    onSelect(item);
  };

  const handleOnClear = () => {
    onClear();
  };

  return (
    <div style={{ 
      width: '300px', 
      margin: '20px auto',
      position: 'relative',
      zIndex: 1000
    }}>
      <ReactSearchAutocomplete
        items={items}
        onSelect={handleOnSelect}
        onClear={handleOnClear}
        autoFocus
        fuseOptions={{ keys: ['name'] }}
        resultStringKeyName="name"
        placeholder={placeholder}
        styling={{
          zIndex: 1000,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
          borderRadius: '4px',
          height: '44px',
        }}
      />
    </div>
  );
};

export default SearchBar;
