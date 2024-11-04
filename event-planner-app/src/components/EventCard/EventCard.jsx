import React from 'react';

const EventCard = ({ event, onClick, isBookmarked, onBookmark, viewMode = 'grid' }) => {
  const imageUrl = event.image?.url || '/path/to/default/image.jpg';
  const formattedDate = new Date(event.start_date).toLocaleDateString();

  const cardStyles = viewMode === 'grid' 
    ? 'w-full max-w-sm' 
    : 'w-full';

  return (
    <div 
      className={`${cardStyles} group relative bg-gray-800 rounded-lg overflow-hidden 
        shadow-lg hover:shadow-2xl transform transition-all duration-300 
        hover:scale-102 cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        onClick(event);
      }}
    >
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={event.name}
          className="w-full h-full object-cover transition-transform duration-300 
            group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent 
          to-black opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmark(event.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 
            hover:bg-opacity-70 transition-all duration-200"
        >
          <svg
            className={`w-5 h-5 ${isBookmarked ? 'text-yellow-400' : 'text-white'}`}
            fill={isBookmarked ? 'currentColor' : 'none'}
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-white truncate">{event.name}</h3>
        <p className="text-sm text-gray-300 line-clamp-2">
          {event.summary || 'No description available.'}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>{formattedDate}</span>
          {event.price && <span>${event.price}</span>}
        </div>
      </div>
    </div>
  );
};

export default EventCard;