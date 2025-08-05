import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector3 = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('week');
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchNewestEpisodes = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
      );
      setVideos(res.data.results.slice(0, 6));
    };
    fetchNewestEpisodes();
  }, [filter]);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const links = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'Last Three Month', value: '3month' }
  ];

  const getGenres = (vid) => {
    return vid.genre_ids ? vid.genre_ids.join(', ') : 'Unknown Genre';
  };

  return (
    <div className="bg-[#05030e] px-5 md:px-16 py-6">
      <div className='w-full mx-auto max-w-[1250px]'>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 text-left">
          <div>
            <p className="text-2xl text-white font-semibold transition-all duration-300">
              Newest Episodes
            </p>
          </div>

          <div className="text-white font-semibold overflow-x-auto hide-scrollbar flex gap-6 md:gap-10 md:flex-wrap md:overflow-visible">
            {links.map(({ label, value }) => (
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
                <Link to={`/watch/${vid.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${vid.poster_path}`}
                    alt={vid.name || vid.original_name}
                    className="w-full h-28 object-cover rounded"
                  />
                </Link>
                <div className="mt-2">
                  <Link
                    to={`/watch/${vid.id}`}
                    className="block text-sm font-semibold text-white hover:text-sky-500 whitespace-nowrap max-w-full truncate"
                    title={vid.name || vid.original_name}
                  >
                    {vid.name || vid.original_name}
                  </Link>
                  <p className="text-xs text-white/70">
                    {vid.first_air_date?.slice(0, 4)} • {getGenres(vid)}
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
    </div>
  );
};

export default Sector3;
