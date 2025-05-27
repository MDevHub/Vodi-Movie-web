import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector4 = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState(35); // Comedy as default
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchValentineMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=2025&with_genres=${filter}&sort_by=popularity.desc`
        );
        setVideos(res.data.results.slice(0, 6));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchValentineMovies();
  }, [filter]);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const genreLinks = [
    { label: 'Comedy', value: 35 },
    { label: 'Drama', value: 18 },
    { label: 'Musical', value: 10402 },
    { label: 'Romance', value: 10749 }
  ];

  const getGenres = (vid) => {
    return vid.genre_ids ? vid.genre_ids.join(', ') : 'Unknown Genre';
  };

  return (
    <div className="bg-[#05030e] px-5 md:px-16 py-6 md:py-9">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 text-left">
        <div>
          <p className="text-2xl text-white font-semibold transition-all duration-300">
            Valentines Day Movies
          </p>
        </div>

        <div className="text-white font-semibold overflow-x-auto hide-scrollbar flex gap-6 md:gap-10 md:flex-wrap md:overflow-visible">
          {genreLinks.map(({ label, value }) => (
            <Link
              key={value}
              onClick={() => setFilter(value)}
              className={`whitespace-nowrap cursor-pointer hover:text-sky-500 ${
                filter === value ? 'text-sky-500' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mt-6">
        <button
          onClick={() => scroll(-150)}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-sky-500 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-3 shadow-lg"
          aria-label="Scroll Left"
        >
          &#10094;
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar space-x-4 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="min-w-[200px] max-w-[200px] bg-white/5 p-2 rounded-lg shadow flex-shrink-0"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${vid.poster_path}`}
                alt={vid.title || vid.original_title}
                className="w-full h-[200px] object-cover rounded"
              />
              <div className="mt-2">
                <Link
                  to={`/watch/${vid.id}`}
                  className="block text-sm font-semibold text-white hover:text-sky-500 whitespace-nowrap max-w-full truncate"
                  title={vid.title || vid.original_title}
                >
                  {vid.title || vid.original_title}
                </Link>
                <p className="text-xs text-white/70">
                  {vid.release_date?.slice(0, 4)} • {getGenres(vid)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll(150)}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-sky-500 bg-opacity-70 hover:bg-opacity-100 text-white rounded-full p-3 shadow-lg"
          aria-label="Scroll Right"
        >
          &#10095;
        </button>
      </div>

      <hr className="border-t border-white/20 mt-6" />
      <div className="flex justify-end mt-2">
        <Link
          to="/home"
          className="text-sm text-white hover:text-sky-500 font-semibold flex items-center gap-1"
        >
          View All &gt;
        </Link>
      </div>
    </div>
  );
};

export default Sector4;
