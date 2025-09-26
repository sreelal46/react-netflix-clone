import React, { useState, useEffect } from "react";
import tmdb from "../../../axios";
import { API_key, posterURL } from "../../../constant";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Modal from "./Modal";

export default function Card({ title, gap, id, show }) {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urlId, setUrlId] = useState(null);
  const [moviesId, setMoviesId] = useState(null);

  //fetch data
  useEffect(() => {
    tmdb
      .get(`discover/${show}?api_key=${API_key}&with_genres=${id}`)
      .then((res) => {
        if (res.data.results && res.data.results.length > 0) {
          setMovies(res.data.results);
        }
        // console.log(res.data.results);
      })
      .catch((err) => console.log(err));
  }, [id]);

  //get movie trailer
  const getMovieTrailer = async (movieId, title) => {
    try {
      const resMovie = await tmdb.get(
        `/${show}/${movieId}?api_key=${API_key}&language=en-US`
      );
      const resVideos = await tmdb.get(
        `/${show}/${movieId}/videos?api_key=${API_key}&language=en-US`
      );
      const trailer = resVideos.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      console.log(resMovie.data);
      setMovieTitle(title);

      setSelectedMovie(resMovie.data);
      setUrlId(trailer?.key || null);
      setMoviesId(movieId);
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="container absolute mt-20 top-[510px] px-12 "
      style={{ top: `${gap}px` }}
    >
      <h1 className="text-white text-2xl mb-4 font-bold">{title}</h1>

      <div className="container-card flex space-x-4 overflow-x-auto scrollbar-hide relative">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-80 h-44 flex-shrink-0 cursor-pointer group"
          >
            <img
              src={movie.backdrop_path ? posterURL + movie.backdrop_path : ""}
              alt={movie.title || "Movie Poster"}
              className="w-full h-full object-cover rounded-sm"
            />

            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 rounded-md transform scale-100 group-hover:scale- transition-all duration-300 flex flex-col justify-between p-5 z-40">
              <div>
                <h2 className="text-white font-bold text-sm">
                  {movie.name || movie.title}
                </h2>
                <p className="text-gray-300 text-xs line-clamp-3">
                  {movie.overview}
                </p>
              </div>

              <div className="flex space-x-2 mt-2">
                <button
                  className="flex items-center bg-white text-black px-3 py-1 rounded font-bold hover:bg-gray-300 transition"
                  onClick={() =>
                    getMovieTrailer(movie.id, movie.title || movie.name)
                  }
                >
                  <FaPlay className="mr-1" /> Play
                </button>
                <button
                  className="flex items-center bg-gray-700 bg-opacity-70 text-white px-3 py-1 rounded font-bold hover:bg-gray-600 transition"
                  onClick={() =>
                    getMovieTrailer(movie.id, movie.title || movie.name)
                  }
                >
                  <AiOutlineInfoCircle className="mr-1" /> Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedMovie && (
        <Modal
          movieTitle={movieTitle}
          moviesId={moviesId}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedMovie={selectedMovie}
          urlId={urlId}
        />
      )}
    </div>
  );
}
