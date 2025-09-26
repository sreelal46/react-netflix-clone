import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaPlay } from "react-icons/fa";
import YouTube from "react-youtube";
import tmdb from "../../../axios";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { API_key, posterURL } from "../../../constant";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { CiBookmarkCheck } from "react-icons/ci";
import { getAuth } from "firebase/auth";

export default function Modal({
  movieTitle,
  showModal,
  setShowModal,
  selectedMovie,
  urlId,
  moviesId,
}) {
  const [changeButton, setChangeButton] = useState(false);
  const [cast, setCast] = useState([]);
  const [docId, setDocId] = useState(null);
  const [heart, setHeart] = useState(false);
  const [show, setShow] = useState("");

  const auth = getAuth();

  //  Fetch cast for the selected movie
  useEffect(() => {
    if (!moviesId) return;

    const fetchCast = async () => {
      try {
        const res = await tmdb.get(
          `/movie/${moviesId}/credits?api_key=${API_key}&language=en-US`
        );
        setCast(res.data.cast || []);
      } catch (error) {
        console.error("Error fetching cast:", error);
      }
    };

    fetchCast();
  }, [moviesId]);

  //  Save movie to Firestore
  const handleCreate = async () => {
    if (!selectedMovie) return;
    const showType = selectedMovie.title ? "movie" : "tv";
    setShow(showType);

    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }
    const userId = user.uid;

    try {
      // Check if this movie already exists in Firestore for this user
      const q = query(
        collection(db, "my_list"),
        where("movieId", "==", moviesId),
        where("userId", "==", userId)
      );
      const querySnap = await getDocs(q);

      if (!querySnap.empty) {
        // Already exists → use its docId
        const existingDoc = querySnap.docs[0];
        setDocId(existingDoc.id);
        setChangeButton(true);
        return;
      }

      // Add new movie for this user
      const docRef = await addDoc(collection(db, "my_list"), {
        userId: userId,
        movieId: moviesId,
        title: movieTitle,
        overview: selectedMovie.overview || "",
        cast: cast.slice(0, 5).map((c) => c.name),
        genres: selectedMovie.genres
          ? selectedMovie.genres.map((g) => g.name)
          : [],
        backdrop_path: selectedMovie.backdrop_path || "",
        release_date: selectedMovie.release_date || "",
        adult: selectedMovie.adult || false,
        urlId: urlId || null,
        show: show,
        createdAt: new Date(),
      });

      setDocId(docRef.id);
      setChangeButton(true);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // Delete movie from Firestore
  const handleDelete = async () => {
    if (!docId) return;
    try {
      await deleteDoc(doc(db, "my_list", docId));
      setChangeButton(false);
      setDocId(null);
    } catch (error) {
      console.log(error);
    }
  };

  //  Helper to display genres
  const getGenres = () => {
    return selectedMovie?.genres
      ? selectedMovie.genres.map((g) => g.name).join(", ")
      : "N/A";
  };

  return (
    <>
      {showModal && selectedMovie && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-zinc-900 rounded-lg shadow-xl w-full max-w-4xl relative">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 z-50 bg-black/70 rounded-full p-2 text-white text-2xl"
              onClick={() => setShowModal(false)}
            >
              <RiCloseLargeLine />
            </button>

            {/* Trailer / Poster */}
            <div className="relative w-full h-[400px] bg-black rounded-t-lg">
              {urlId ? (
                <YouTube
                  videoId={urlId}
                  opts={{
                    height: "100%",
                    width: "100%",
                    playerVars: { autoplay: 1, mute: 1 },
                  }}
                  className="w-full h-full rounded-t-lg"
                />
              ) : (
                <img
                  src={posterURL + selectedMovie.backdrop_path}
                  alt={selectedMovie.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              )}

              {/* Overlay Buttons */}
              <div className="absolute bottom-6 left-6 flex space-x-3 mt-4">
                <button className="flex items-center bg-white text-black px-6 py-2 rounded font-bold hover:bg-gray-300 transition">
                  <FaPlay className="mr-2 text-xl" /> Play
                </button>

                {changeButton ? (
                  <button
                    onClick={handleDelete}
                    className="flex items-center bg-gray-700 bg-opacity-70 text-white px-5 py-2 rounded font-bold hover:bg-gray-600 transition"
                  >
                    <CiBookmarkCheck className="text-3xl" />
                  </button>
                ) : (
                  <button
                    onClick={handleCreate}
                    className="flex items-center bg-gray-700 bg-opacity-70 text-white px-5 py-2 rounded font-bold hover:bg-gray-600 transition"
                  >
                    <IoAdd className="text-3xl" />
                  </button>
                )}

                <button
                  onClick={() => setHeart(!heart)}
                  className="flex items-center bg-gray-700 bg-opacity-70 text-white px-5 py-2 rounded font-bold hover:bg-gray-600 transition"
                >
                  {heart ? (
                    <FaHeart className="text-red-700" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            </div>

            {/* Movie Info */}
            <div className="p-10 text-white">
              <div className="flex items-center space-x-4 text-sm text-gray-300 mb-2">
                <span>
                  {selectedMovie.release_date
                    ? new Date(selectedMovie.release_date).getFullYear()
                    : "N/A"}
                </span>
                <span className="border px-1 border-gray-400">
                  {selectedMovie.adult ? "18+" : "U/A 16+"}
                </span>
                <span>HD</span>
              </div>

              <strong className="text-4xl">{movieTitle}</strong>
              <p className="text-gray-200 mt-5 mb-4">
                {selectedMovie.overview}
              </p>

              <div className="text-sm text-gray-400 space-y-1">
                {/* Cast */}
                <p>
                  <span className="font-semibold text-white">Cast: </span>
                  {cast.length > 0
                    ? cast
                        .slice(0, 5)
                        .map((c) => c.name)
                        .join(", ")
                    : "Loading..."}
                </p>

                {/* Genres */}
                <p>
                  <span className="font-semibold text-white">Genres: </span>
                  {getGenres()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
