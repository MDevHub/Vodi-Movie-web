import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector6 = () => {
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('featured');

  // Map tabs to API calls or just use 'featured' as default (adjust as needed)
  const tabs = [
    { label: 'Featured', value: 'featured' },
    { label: 'Best Rated', value: 'best_rated' },
    { label: 'Premiers', value: 'premiers' },
    { label: 'Popular', value: 'popular' },
    { label: 'Kids', value: 'kids' },
  ];

  const fetchVideos = async (tab) => {
    try {
      let url = '';
      // Just example URLs, replace with actual logic for each tab if needed
      switch (tab) {
        case 'best_rated':
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
          break;
        case 'premiers':
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
          break;
        case 'popular':
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
          break;
        case 'kids':
          // Example: genre kids = 10762 (TV), or use family movies 10751 (movies)
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751&sort_by=popularity.desc`;
          break;
        case 'featured':
        default:
          url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
          break;
      }
      const res = await axios.get(url);
      setVideos(res.data.results.slice(0, 7));
    } catch (err) {
      console.error('Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos(activeTab);
  }, [activeTab]);

  const [first, ...rest] = videos;
  const row1 = rest.slice(0, 3);
  const row2 = rest.slice(3, 6);

  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  const getGenres = (vid) => {
    return vid.genre_ids?.length
      ? vid.genre_ids.map((id) => genreMap[id]).slice(0, 2).join(', ')
      : 'Unknown Genre';
  };

  return (
    <div className="bg-[#05030e] px-5 md:px-16 py-10">
      <div className='w-full mx-auto max-w-[1250px]'>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 text-left">
          <div>
            <p className="text-2xl text-white font-semibold transition-all duration-300">
              Vodi 4K Ultra HD
            </p>
          </div>

          <div className="text-white font-semibold overflow-x-auto hide-scrollbar flex gap-6 md:gap-10 md:flex-wrap md:overflow-visible">
            {tabs.map(({ label, value }) => (
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
            {/* First video: taller, dark bg, 4K Ultra HD badge */}
            <div className="relative rounded-lg overflow-hidden shadow h-[450px] md:h-auto bg-black">
              <img
                src={`https://image.tmdb.org/t/p/original${first.backdrop_path}`}
                alt={first.title || first.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-6">
                <div className="self-start bg-red-600 px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                  4K Ultra HD
                </div>
                <div>
                  <Link
                    to={`/watch/${first.id}`}
                    className="text-3xl font-bold text-white hover:text-sky-400 mb-2 block"
                  >
                    {first.title || first.name}
                  </Link>
                  <p className="text-white/80 text-sm">
                    {(first.release_date || first.first_air_date)?.slice(0, 4)} • {getGenres(first)}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side smaller videos */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 content-start">
              {[...row1, ...row2].map((vid) => (
                <div key={vid.id} className="bg-white/5 p-2 rounded-lg shadow">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${vid.poster_path}`}
                    alt={vid.title || vid.name}
                    className="w-full h-24 object-cover rounded"
                  />
                  <Link
                    to={`/watch/${vid.id}`}
                    className="block mt-2 text-sm font-semibold text-white hover:text-sky-500 whitespace-nowrap max-w-full truncate"
                  >
                    {vid.title || vid.name}
                  </Link>
                  <p className="text-xs text-white/70">
                    {(vid.release_date || vid.first_air_date)?.slice(0, 4)} • {getGenres(vid)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sector6;
