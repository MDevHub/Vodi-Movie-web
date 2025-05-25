import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      );
      setMovies(res.data.results.slice(0, 5)); // limit to top 5
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false
  };

  return (
    <div className="mt-[70px]">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative h-[100vh] w-full">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-10">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{movie.title}</h1>
              <p className="text-xl text-gray-200 mb-6">{new Date(movie.release_date).getFullYear()}</p>
              <button className="px-6 py-3 bg-red-600 text-white rounded-full text-lg hover:bg-red-700 transition">
                Watch Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
