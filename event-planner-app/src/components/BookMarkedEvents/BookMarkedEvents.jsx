import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../EventCard/EventCard';
import EventModal from '../EventModal/EventModal';

const BookmarkedEvents = () => {
  const allEvents = useSelector((state) => state.events.events);
  const [bookmarkedEvents, setBookmarkedEvents] = useState(new Set());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedEvents') || '[]');
    setBookmarkedEvents(new Set(savedBookmarks));
  }, []);

  // Filter events to show only bookmarked ones
  const bookmarkedEventsList = allEvents.filter(event => 
    bookmarkedEvents.has(event.id)
  );

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
          <h1 className="text-4xl font-bold text-white">Bookmarked Events</h1>
          <ViewToggle />
        </header>

        <div 
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
        >
          {bookmarkedEventsList.length > 0 ? (
            bookmarkedEventsList.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
                isBookmarked={true}
                onBookmark={toggleBookmark}
                viewMode={viewMode}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-white py-8">
              No bookmarked events yet. Add some events to your bookmarks!
            </div>
          )}
        </div>

        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            isBookmarked={true}
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

export default BookmarkedEvents;