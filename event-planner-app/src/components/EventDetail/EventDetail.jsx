import React from 'react';

const EventDetail = ({ event }) => {
  const imageUrl = event.image?.url || 'path/to/default/image.jpg';
  const venue = event.primary_venue?.name || 'Online Event';
  const location = event.primary_venue?.address?.localized_address_display || 'Online';

  return (
    <div className="p-6 bg-white rounded-lg">
      {event.image && (
        <img
          src={imageUrl}
          alt={event.name || 'Event Image'}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-4">{event.summary}</p>
      <div className="space-y-2">
        <p><strong>Date:</strong> {event.start_date}</p>
        <p><strong>Time:</strong> {event.start_time} - {event.end_time}</p>
        <p><strong>Venue:</strong> {venue}</p>
        <p><strong>Location:</strong> {location}</p>
      </div>
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-500 hover:underline mt-4"
      >
        More details on Eventbrite
      </a>
    </div>
  );
};

export default EventDetail;
