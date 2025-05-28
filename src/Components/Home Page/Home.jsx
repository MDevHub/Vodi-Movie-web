import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

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
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`
        );
        if (res.data.results.length > 0) {
          results.push(res.data.results[0]);
        }
      }

      setMovies(results);
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    beforeChange: (_, next) => setActiveIndex(next),
  };

  return (
    <div className="cursor-grab">
      <Slider ref={sliderRef} {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="relative h-[100vh] w-full">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
              className="object-cover w-full h-full"
            />

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-5 md:px-16">
              <p className="text-sm text-center sm:text-left text-white/80 mb-2">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"} &nbsp; | &nbsp;
                Animation, History &nbsp; | &nbsp; ~90 mins
              </p>
              <h1 className="text-3xl md:text-6xl text-center sm:text-left font-bold text-white mb-6">
                {movie.title}
              </h1>
              <div className="sm:flex gap-6 mb-10">
                <Link to={`/watch/${movie.id}`}>
                  <button className="mb-6 sm:mb-0 px-4 py-3 w-full sm:max-w-max bg-sky-500 hover:bg-sky-600 transition text-white text-lg font-semibold rounded">
                    WATCH NOW
                  </button>
                </Link>
                <button className="px-4 w-full sm:w-max py-3 border border-white text-white text-lg font-semibold rounded hover:bg-white hover:text-black transition">
                  + PLAYLIST
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                {movies.map((m, i) => (
                  <img
                    key={m.id}
                    src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                    alt={m.title}
                    onClick={() => sliderRef.current.slickGoTo(i)}
                    className={`h-[100px] w-auto rounded shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ${
                      i === activeIndex ? 'border-2 border-sky-500' : ''
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
