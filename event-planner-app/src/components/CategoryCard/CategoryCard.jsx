import React, { useMemo } from 'react';

const CategoryCard = ({ category, onClick }) => {
  const { name, events } = category;

  // Get up to 5 images for the collage
  const collageImages = useMemo(() => {
    return events
      .filter(event => event.image?.url)
      .slice(0, 5)
      .map(event => event.image.url);
  }, [events]);

  // Fallback to first event image if not enough images for collage
  const firstImage = events[0]?.image?.url || '/path/to/default/image.jpg';

  return (
    <div 
      className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg 
        hover:shadow-2xl transform transition-all duration-300 hover:scale-102 
        cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        {collageImages.length >= 4 ? (
          <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-0.5">
            {/* Main image */}
            <div className="col-span-2 row-span-2">
              <img
                src={collageImages[0]}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Side images */}
            {collageImages.slice(1, 5).map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`${name} ${idx + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <img
            src={firstImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 
              group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent 
          to-black opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-white truncate">{name}</h3>
        <p className="text-sm text-gray-400">
          {events.length} {events.length === 1 ? 'Event' : 'Events'}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;