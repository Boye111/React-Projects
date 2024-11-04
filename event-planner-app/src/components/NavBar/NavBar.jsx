import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-500 p-4 text-white">
      <h1 className="text-3xl">Event Planner Management App</h1>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/categories" className="hover:underline">
            Categories
          </Link>
        </li>
        <li>
          <Link to="/bookmarks" className="hover:underline">
            Bookmarks
          </Link>
        </li>
        <li>
          <Link to="/create" className="hover:underline">
            Create Event
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;