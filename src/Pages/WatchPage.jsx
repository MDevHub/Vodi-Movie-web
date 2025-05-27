import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'dc22c3c06d3bd543d80a04a985a39485';

export default function WatchPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      setMovie(res.data);
    };

    const fetchVideos = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
      );
      const longVideos = res.data.results.filter(
        (vid) =>
          vid.site === 'YouTube' &&
          (vid.type === 'Featurette' || vid.type === 'Clip' || vid.type === 'Behind the Scenes')
      );
      setTrailerKey((longVideos[0] || res.data.results[0])?.key);
    };

    const fetchSuggested = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
      );
      setSuggested(res.data.results.slice(0, 10));
    };

    fetchMovie();
    fetchVideos();
    fetchSuggested();
  }, [id]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white px-4 md:px-16 py-8">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-white/70">
        <Link to="/" className="hover:underline">
          Home
        </Link>{' '}
        / <span>{movie.title}</span>
      </div>

      {/* Video Player */}
      <div className="relative pb-[40.25%] h-0 mb-6 rounded overflow-hidden">
        {trailerKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
            title="Movie Video"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black text-white">
            Video not available
          </div>
        )}
      </div>

      {/* Video Info */}
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-white/70 mb-4">
        {movie.release_date?.slice(0, 4)} • {movie.runtime} mins •{' '}
        {movie.genres?.map((g) => g.name).join(', ')}
      </p>
      <p className="max-w-2xl text-white/80">{movie.overview}</p>

      {/* ✅ Suggested Videos Section Updated */}
      <div className="mt-10">
         <h2 className="text-xl font-bold text-white mb-4">Suggested Videos</h2>
         <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
            {suggested.map((video) => (
               <Link
                  to={`/watch/${video.id}`}
                  key={video.id}
                  className="flex-shrink-0 w-[180px] sm:w-[200px] md:w-[220px]"
               >
               <img
                  src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
                  alt={video.title}
                  className="w-full h-[250px] object-cover rounded hover:text-sky-500"
               />
               <p className="text-white mt-2 font-semibold truncate hover:text-sky-500 " title={video.title}>
                  {video.title}
               </p>
               <p className="text-white/60 text-sm">
                  {video.release_date?.slice(0, 4)} •{' '}
                  {video.genre_ids
                     ?.map((id) => {
                     const genreMap = {
                        28: 'Action',
                        878: 'Sci-Fi',
                        80: 'Crime',
                        18: 'Drama',
                     };
                     return genreMap[id] || '';
                     })
                     .filter(Boolean)
                     .join(', ') || 'Unknown Genre'}
               </p>
               </Link>
            ))}
         </div>
      </div>

    </div>
  );
}
