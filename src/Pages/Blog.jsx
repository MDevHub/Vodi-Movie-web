import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        const data = await res.json();
        setBlogs(data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-[80px] px-[6vw] pb-12">
      <h1 className="text-3xl font-bold mb-8 font-poppins">Movie Blog</h1>
      {loading ? (
        <p className="text-gray-400">Loading blogs...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((movie) => (
            <div key={movie.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{movie.overview}</p>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                  onClick={() => navigate('/home')}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
