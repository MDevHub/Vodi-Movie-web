import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Page1 from '../../Pages/Page1';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector9 = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState(null);

  const scrollRef = useRef(null);

  const genresList = [
    { label: 'Action', value: 28 },
    { label: 'SciFi', value: 878 },
    { label: 'Crime', value: 80 },
    { label: 'Drama', value: 18 },
    { label: 'Animation', value: 16 }
  ];

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&sort_by=popularity.desc$${
            filter ? `&with_genres=${filter}` : ''
          }`
        );
        setVideos(res.data.results.slice(0, 20));
      } catch (error) {
        console.error('Error fetching recently viewed movies:', error);
      }
    };
    fetchRecentlyViewed();
  }, [filter]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="px-5 md:px-16 py-6">
      <div className='w-full mx-auto max-w-[1250px]'>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 text-left">
          <div>
            <p className="text-2xl text-white font-semibold transition-all duration-300">
              Recently Viewed Movies
            </p>
          </div>

          <div className="text-white font-semibold overflow-x-auto hide-scrollbar flex gap-6 md:gap-10 md:flex-wrap md:overflow-visible">
            {genresList.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`whitespace-nowrap hover:text-sky-500 ${
                  filter === value ? 'text-sky-500' : ''
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-8">
          <button
            onClick={scrollLeft}
            aria-label="Scroll Left"
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-sky-600 transition-colors"
            style={{ color: 'white', fontSize: '28px' }}
          >
            ‹
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto hide-scrollbar scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="flex-shrink-0 w-[180px] md:w-[200px]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${vid.poster_path}`}
                  alt={vid.title}
                  className="w-full h-[200px] object-cover rounded"
                />
                <Link
                  to={`/watch/${vid.id}`}
                  className="block mt-2 text-sm font-semibold text-white hover:text-sky-500 max-w-full truncate"
                  title={vid.title}
                >
                  {vid.title}
                </Link>
                <p className="text-xs text-white/70 truncate max-w-full">
                  {vid.release_date?.slice(0, 4)} • {vid.genre_ids?.length ? vid.genre_ids.map(id => {
                    const genreMap = {
                      28: 'Action',
                      878: 'Sci-Fi',
                      80: 'Crime',
                      18: 'Drama',
                      16: 'Animation'
                    };
                    return genreMap[id] || '';
                  }).filter(Boolean).join(', ') : 'Unknown Genre'}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            aria-label="Scroll Right"
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full hover:bg-sky-600 transition-colors"
            style={{ color: 'white', fontSize: '28px' }}
          >
            ›
          </button>
        </div>

        <hr className="border-white/20 mt-6" />
        <div className="flex justify-end mt-1">
          <Link
            to="/home"
            className="text-white hover:text-sky-500 flex items-center gap-1 font-semibold"
          >
            View All <span className="text-xl font-bold">&gt;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sector9;
