import React from 'react';

const SearchBox = ({ className, placeholder, onChangeHandler }) => (
  <input
    className={`search-input border border-gray-300 rounded-md p-2 w-64 h-10 text-sm 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 ${className}`}
    type="search"
    placeholder={placeholder}
    onChange={onChangeHandler}
    style={{ backgroundColor: 'white', color: 'black' }}
  />
);

export default SearchBox;