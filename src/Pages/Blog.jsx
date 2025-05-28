import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const titles = [
        "Bilal: A New Breed of Hero",
        "The Message",
        "Muhammad: The Last Prophet",
        "The Prince of Egypt",
        "Joseph: King of Dreams"
      ];

      const results = [];

      for (let title of titles) {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`
          );
          if (res.data.results.length > 0) {
            results.push(res.data.results[0]);
          }
        } catch (err) {
          console.error('Error fetching movie:', err);
        }
      }

      setBlogs(results);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-[80px] px-[6vw] pb-12">
      <h1 className="text-3xl font-bold mb-8 font-poppins">Islamic Movie Blogs</h1>
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
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{movie.overview || "No description available."}</p>
                <button
                  className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded text-sm font-medium"
                  onClick={() => navigate(`/readblog/${movie.id}`)}
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
};

export default Blog;
