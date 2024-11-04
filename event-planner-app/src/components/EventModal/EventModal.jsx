import React, { useEffect } from 'react';

const EventModal = ({ event, onClose, isBookmarked, onBookmark }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!event) return null;

  const imageUrl = event.image?.url || '/path/to/default/image.jpg';
  const venue = event.primary_venue?.name || 'Online Event';
  const location = event.primary_venue?.address?.localized_address_display || 'Online';

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] 
            overflow-y-auto transform transition-all"
          onClick={e => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={imageUrl}
              alt={event.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBookmark(event.id);
                }}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full
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
              <button
                onClick={onClose}
                className="bg-black bg-opacity-50 text-white p-2 rounded-full
                  hover:bg-opacity-70 transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{event.name}</h2>
            <p className="text-gray-600">{event.summary}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">Date & Time</h3>
                <p className="text-gray-600">
                  {new Date(event.start_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  {event.start_time} - {event.end_time}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">{venue}</p>
                <p className="text-gray-600">{location}</p>
              </div>
            </div>

            {event.tags && (
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span key={tag.id || index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {tag.display_name}
                </span>
                ))}
              </div>
            )}

            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg
                hover:bg-blue-700 transition-colors duration-200"
            >
              More Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;