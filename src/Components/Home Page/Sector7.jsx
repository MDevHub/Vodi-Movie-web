import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Sector7 = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchFeaturedTV = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
        );
        setVideos(res.data.results.slice(0, 2));
      } catch (error) {
        console.error('Error fetching featured TV series:', error);
      }
    };
    fetchFeaturedTV();
  }, []);

  return (
    <div className="bg-[black] px-5 md:px-16 py-10">
      <h2 className="text-2xl text-white font-semibold mb-6">Featured TV Series</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((vid) => (
          <div key={vid.id} className="relative rounded-lg overflow-hidden shadow h-64 md:h-80">
            <img
              src={`https://image.tmdb.org/t/p/original${vid.backdrop_path}`}
              alt={vid.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-end">
              <Link
                to={`/watch/${vid.id}`}
                className="text-xl font-bold text-white hover:text-sky-400"
              >
                {vid.name || vid.original_name}
              </Link>
              <p className="text-white/80 text-sm mt-1">{vid.first_air_date?.slice(0, 4)}</p>
            </div>
          </div>
        ))}
      </div>

      <hr className="border-white/20 mt-8" />
      <div className="flex justify-end mt-2">
         <Link
            to=""
            className="text-white hover:text-sky-500 flex items-center gap-1 font-semibold"
         >
            View All <span className="text-xl font-bold">&gt;</span>
         </Link>
      </div>
    </div>
  );
};

export default Sector7;
