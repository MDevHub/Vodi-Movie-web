import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 text-[#d6c8c8d8] text-2xl md:text-3xl font-bold">
      <h1>404 - Page Not Found</h1>
      <p className="mt-2 mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/home" className="hover:text-sky-500">
        Go back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
