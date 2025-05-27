import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector8 = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState(16); // Default to Animation

  const tabList = [
    { label: 'Animation', value: 16 },
    { label: 'Family', value: 10751 },
    { label: 'For Girls', value: 10762 },
    { label: 'For Boys', value: 10759 },
  ];

  useEffect(() => {
    const fetchKidsVideos = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${activeTab}&sort_by=popularity.desc`
        );
        setVideos(res.data.results.slice(0, 7));
      } catch (err) {
        console.error('Error fetching kids videos:', err);
      }
    };
    fetchKidsVideos();
  }, [activeTab]);

  const [first, ...rest] = videos;
  const row1 = rest.slice(0, 3);
  const row2 = rest.slice(3, 6);

  const getGenres = (vid) => {
    return vid.genre_ids?.length
      ? vid.genre_ids.map((id) => genreMap[id]).slice(0, 2).join(', ')
      : 'Unknown Genre';
  };

  const genreMap = {
    16: 'Animation',
    10751: 'Family',
    10762: 'Kids',
    10759: 'Action',
  };

  return (
    <div className="bg-[#05030e] px-5 md:px-16 py-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 text-left">
        <div>
          <p className="text-2xl text-white font-semibold transition-all duration-300">
            Vodi Kids
          </p>
        </div>

        <div className="text-white font-semibold overflow-x-auto hide-scrollbar flex gap-6 md:gap-10 md:flex-wrap md:overflow-visible">
          {tabList.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`hover:text-sky-500 whitespace-nowrap ${
                activeTab === value ? 'text-sky-500' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {videos.length >= 7 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="relative rounded-lg overflow-hidden shadow h-full md:h-auto">
            <div className="h-full md:h-full w-full">
              <img
                src={`https://image.tmdb.org/t/p/original${first.backdrop_path}`}
                alt={first.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
                <Link
                  to={`/watch/${first.id}`}
                  className="text-2xl font-bold text-white hover:text-sky-400 mb-2"
                >
                  {first.name || first.original_name}
                </Link>
                <p className="text-white/80 text-sm">
                  {first.first_air_date?.slice(0, 4)} • {getGenres(first)}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
            {[...row1, ...row2].map((vid) => (
              <div key={vid.id} className="bg-white/5 p-2 rounded-lg shadow">
                <img
                  src={`https://image.tmdb.org/t/p/w300${vid.poster_path}`}
                  alt={vid.name}
                  className="w-full h-24 object-cover rounded"
                />
                <Link
                  to={`/watch/${vid.id}`}
                  className="block mt-2 text-sm font-semibold text-white hover:text-sky-500 whitespace-nowrap max-w-full truncate"
                >
                  {vid.name || vid.original_name}
                </Link>

                <p className="text-xs text-white/70">
                  {vid.first_air_date?.slice(0, 4)} • {getGenres(vid)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
   </div>
  );
};

export default Sector8;
