import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // <-- add this

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector5 = () => {
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();  // <-- add this

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=War%20for%20the%20Planet%20of%20the%20Apes`
      );
      if (res.data.results.length > 0) setMovie(res.data.results[0]);
    };
    fetchMovie();
  }, []);

  if (!movie) return null;

  return (
    <div className="relative h-[100vh] w-full bg-black cursor-default">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center px-5 md:px-16">
         <div className="max-w-3xl text-white w-full md:w-auto">
            <p className="text-sm mb-2 text-white/80">
            {new Date(movie.release_date).getFullYear()} &nbsp; | &nbsp; {movie.genre_ids?.join(', ') || 'N/A'} &nbsp; | &nbsp; 1h 30m
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{movie.title}</h1>
            <p className="text-white/80 mb-10 max-h-40 overflow-y-auto hide-scrollbar">{movie.overview}</p>
            <div className="sm:flex gap-6 mb-10">
                  <button
                    onClick={() => navigate(`/watch/${movie.id}`)}  // <-- navigate on click
                    className="mb-6 sm:mb-0 px-4 py-3 w-full sm:max-w-max bg-sky-500 hover:bg-sky-600 transition text-white text-lg font-semibold rounded"
                  >
                      WATCH NOW
                  </button>
                  <button className="px-4 w-full sm:w-max py-3 border border-white text-white text-lg font-semibold rounded hover:bg-white hover:text-black transition">
                      + PLAYLIST
                  </button>
            </div>
         </div>

        {/* Circle play only visible on md+ */}
         <div className="ml-auto relative items-center justify-center w-48 h-48 hidden lg:flex">
            <div className="absolute rounded-full border-4 border-cream opacity-30 w-48 h-48 hover:border-8 transition-border duration-300"></div>
            <svg
              onClick={() => navigate(`/watch/${movie.id}`)}  // <-- navigate on click
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-20 h-20 text-sky-600 opacity-70 cursor-pointer hover:opacity-90 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
            >
            <path d="M8 5v14l11-7z" />
            </svg>
         </div>
      </div>
    </div>
  );
};

export default Sector5;
