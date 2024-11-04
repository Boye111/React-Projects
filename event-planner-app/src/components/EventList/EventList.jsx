import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../EventCard/EventCard';
import EventModal from '../EventModal/EventModal';
import { useSearchParams } from "react-router-dom";
import * as SearchBoxModule from '../search-box.jsx';

console.log('SearchBox Module:', SearchBoxModule);
const SearchBox = SearchBoxModule.default;
console.log('Extracted SearchBox:', SearchBox);

const EventList = () => {
  const events = useSelector((state) => state.events.events);
  
  const [searchField, setSearchField] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [dateFilter, setDateFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    setBookmarkedEvents(new Set(savedBookmarks));
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchField.toLowerCase()) ||
      event.summary?.toLowerCase().includes(searchField.toLowerCase());
    
    const matchesDate = !dateFilter || 
      new Date(event.start_date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();
    
    const normalizeTagName = (tagName) => {
      return tagName.toLowerCase().replace(/\s+/g, '');
    };

    // Updated tag filtering logic
    const matchesTag = !tagFilter || 
      event.tags?.some((tag) =>
        normalizeTagName(tag.display_name) === normalizeTagName(tagFilter)
      );

    const matchesCategory = !categoryFilter || 
      event.tags.some(tag => 
        normalizeTagName(tag.display_name) === normalizeTagName(categoryFilter)
      );
  
    return matchesSearch && matchesDate && matchesTag && matchesCategory;
  });

  const handleSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const toggleBookmark = (eventId) => {
    setBookmarkedEvents(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(eventId)) {
        newBookmarks.delete(eventId);
      } else {
        newBookmarks.add(eventId);
      }
      localStorage.setItem('bookmarkedEvents', JSON.stringify([...newBookmarks]));
      return newBookmarks;
    });
  };

  const ViewToggle = () => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
      >
        <GridIcon />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'} text-white`}
      >
        <ListIcon />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-4xl font-bold text-white">Events</h1>
          <div className="flex items-center gap-4">
            <SearchBox
              placeholder="Search events..."
              onChangeHandler={handleSearchChange}
              className="w-64"
            />
            <ViewToggle />
          </div>
        </header>

        <div className="mb-8 flex flex-wrap gap-3">
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            placeholder="Filter by tag"
            className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div 
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
                isBookmarked={bookmarkedEvents.has(event.id)}
                onBookmark={toggleBookmark}
                viewMode={viewMode}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white py-8">
              No events found matching your criteria
            </div>
          )}
        </div>

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            isBookmarked={bookmarkedEvents.has(selectedEvent.id)}
            onBookmark={() => toggleBookmark(selectedEvent.id)}
          />
        )}
      </div>
    </div>
  );
};

const GridIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
  </svg>
);

const ListIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
  </svg>
);

export default EventList;