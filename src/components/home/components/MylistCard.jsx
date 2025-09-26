import React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import tmdb from "../../../axios";
import { API_key } from "../../../constant";

export function MylistCard() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urlId, setUrlId] = useState(null);
  const [moviesId, setMoviesId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "my_list"));
        const moviesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document id
          ...doc.data(), // All movie fields
        }));
        setMovies(moviesArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const getMovieTrailer = async (movie) => {
    try {
      const showType = movie.show || "movie"; // fallback

      const resMovie = await tmdb.get(
        `/${showType}/${movie.movieId}?api_key=${API_key}&language=en-US`
      );

      const resVideos = await tmdb.get(
        `/${showType}/${movie.movieId}/videos?api_key=${API_key}&language=en-US`
      );
      const trailer = resVideos.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      setSelectedMovie(resMovie.data);
      setUrlId(trailer?.key || null);
      setMoviesId(movie.movieId);
      setMovieTitle(movie.title || movie.name);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="container mt-28 px-12">
        <h1 className="text-white text-2xl mb-4">My List</h1>

        <div className="container-card flex space-x-4 overflow-x-auto scrollbar-hide relative">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="relative w-80 h-44 flex-shrink-0 cursor-pointer group"
              >
                <img
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      : ""
                  }
                  alt={movie.title || "Movie Poster"}
                  className="w-full h-full object-cover rounded-sm"
                />

                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 rounded-md transform scale-100 group-hover:scale-105 transition-all duration-300 flex flex-col justify-between p-5 z-40">
                  <div>
                    <h2 className="text-white font-bold text-sm">
                      {movie.title || movie.name}
                    </h2>
                    <p className="text-gray-300 text-xs line-clamp-3">
                      {movie.overview}
                    </p>
                  </div>

                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => getMovieTrailer(movie)}
                      className="flex items-center bg-white text-black px-3 py-1 rounded font-bold hover:bg-gray-300 transition"
                    >
                      Play
                    </button>
                    <button
                      onClick={() => getMovieTrailer(movie)}
                      className="flex items-center bg-gray-700 bg-opacity-70 text-white px-3 py-1 rounded font-bold hover:bg-gray-600 transition"
                    >
                      Info
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No movies in your list</p>
          )}
        </div>
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
    </>
  );
}
