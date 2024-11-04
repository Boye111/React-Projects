import React, { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venue, setVenue] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name,
      start_date: startDate,
      end_date: endDate,
      primary_venue: { name: venue },
      price,
      tags: tags.split(',').map(tag => tag.trim()),
      image,
    };

    onSubmit(newEvent);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setStartDate('');
    setEndDate('');
    setVenue('');
    setPrice('');
    setTags('');
    setImage(null);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg max-w-lg mx-auto space-y-4">
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        className="w-full p-3 border rounded"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-3 border rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-3 border rounded"
      />
      <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600">
        Create Event
      </button>
    </form>
  );
};

export default EventForm;