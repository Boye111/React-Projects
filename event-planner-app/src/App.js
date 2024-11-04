import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar/NavBar';
import EventList from './components/EventList/EventList';
import EventDetail from './components/EventDetail/EventDetail';
import EventForm from './components/EventForm/EventForm';
import Footer from './components/Footer/Footer';
import Categories from './components/Category/Category';
import { fetchEvents } from './redux/eventSlice';
import BookmarkedEvents from './components/BookMarkedEvents/BookMarkedEvents';
import './App.css';
import './index.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents()); // Dispatch fetchEvents to load events into Redux store
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<EventList />} /> {/* Removed events prop */}
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/create" element={<EventForm />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/bookmarks" element={<BookmarkedEvents />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;