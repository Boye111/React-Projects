import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../CategoryCard/CategoryCard';
import * as SearchBoxModule from '../search-box.jsx';

console.log('SearchBox Module:', SearchBoxModule);
const SearchBox = SearchBoxModule.default;
console.log('Extracted SearchBox:', SearchBox);

const Categories = () => {
  const events = useSelector((state) => state.events.events);
  const [searchField, setSearchField] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  // Normalize and group tags
  const categories = useMemo(() => {
    const categoryMap = new Map();

    events.forEach((event) => {
      event.tags.forEach((tag) => {
        if (['EventbriteCategory', 'EventbriteSubCategory', 'EventbriteFormat'].includes(tag.prefix)) {
          return;
        }

        const normalizedName = normalizeTagName(tag.display_name);
        if (!categoryMap.has(normalizedName)) {
          categoryMap.set(normalizedName, {
            name: normalizedName,
            events: [event],
            originalTag: tag,
          });
        } else {
          if (!categoryMap.get(normalizedName).events.includes(event)) {
            categoryMap.get(normalizedName).events.push(event);
          }
        }
      });
    });

    // Convert map to array and sort by category name
    const sortedCategories = Array.from(categoryMap.values())
      .sort((a, b) => a.name.localeCompare(b.name));

    // Filter categories based on search field
    const filteredCategories = sortedCategories.filter((category) => {
      console.log('Filtering category:', category.name);
      return category.name.toLowerCase().includes(searchField.toLowerCase());
    });

    console.log('Filtered categories:', filteredCategories);
    return filteredCategories;
  }, [events, searchField]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Event Categories</h1>
          <div className="flex items-center gap-4">
            <SearchBox
              placeholder="Search Categories..."
              value={searchField}
              onChange={handleSearchChange}
              className="w-64"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const normalizeTagName = (tagName) => {
  return tagName
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export default Categories;