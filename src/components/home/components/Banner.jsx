import React, { useEffect, useState } from "react";
import Navbar from "./Navbar.jsx";
import Modal from "./Modal.jsx";
import Dropdown from "./Dropdown.jsx";

import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import tmdb from "../../../axios.js";
import { originalPosterURL, API_key } from "../../../constant.js";

function Banner({ title, weNeed, path }) {
  const [items, setItems] = useState([]);
  const [featuredItem, setFeaturedItem] = useState(null);
  const [logo, setLogo] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [urlId, setUrlId] = useState(null);
  const [itemId, setItemId] = useState(null);

  // Determine if the path is for TV shows or movies
  const isTV = path.includes("/tv/");

  useEffect(() => {
    tmdb
      .get(path)
      .then((res) => setItems(res.data.results))
      .catch((err) => console.error("Error fetching data:", err));
  }, [path]);

  const getItemTrailer = async (id) => {
    try {
      const resDetails = await tmdb.get(
        `/${isTV ? "tv" : "movie"}/${id}?api_key=${API_key}&language=en-US`
      );
      const resVideos = await tmdb.get(
        `/${
          isTV ? "tv" : "movie"
        }/${id}/videos?api_key=${API_key}&language=en-US`
      );

      const trailer = resVideos.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      setSelectedItem(resDetails.data);
      setUrlId(trailer?.key || null);
      setItemId(id);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching trailer or details:", error);
    }
  };

  useEffect(() => {
    if (items.length === 0) return;

    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];
    setFeaturedItem(item);

    tmdb
      .get(`/${isTV ? "tv" : "movie"}/${item.id}/images?api_key=${API_key}`)
      .then((res) => {
        const enLogo = res.data.logos
          ? res.data.logos.find((l) => l.iso_639_1 === "en" && l.width >= 300)
          : null;
        const fallbackLogo = res.data.logos
          ? res.data.logos.find((l) => l.width >= 300)
          : null;

        if (enLogo) {
          setLogo(`https://image.tmdb.org/t/p/original${enLogo.file_path}`);
        } else if (fallbackLogo) {
          setLogo(
            `https://image.tmdb.org/t/p/original${fallbackLogo.file_path}`
          );
        } else if (item.poster_path) {
          setLogo(`https://image.tmdb.org/t/p/original${item.poster_path}`);
        } else {
          setLogo(null);
        }
      })
      .catch((err) => {
        console.error("Error fetching logos:", err);
        setLogo(null);
      });
  }, [items]);

  if (!featuredItem) return null;

  return (
    <div className="relative w-full h-auto">
      {/* Backdrop */}
      <img
        src={`${originalPosterURL + featuredItem.backdrop_path}`}
        alt={isTV ? featuredItem.name : featuredItem.title}
        className="w-full h-full object-top object-cover"
      />
      <h1 className="absolute top-20 left-16 text-4xl font-extrabold text-white">
        {title}
      </h1>
      <Dropdown weNeed={weNeed} />

      {/* Gradients */}
      <div className="bg-gradient-to-t from-[#141414] to-transparent absolute bottom-0 h-40 w-full"></div>
      <div className="bg-gradient-to-b from-[#141414] to-transparent absolute -bottom-40 h-40 w-full"></div>

      {/* Logo or fallback title */}
      {logo ? (
        <div className="absolute top-[320px] left-14 max-w-[400px]">
          <img
            src={logo}
            alt={`${isTV ? featuredItem.name : featuredItem.title} logo`}
            className="w-full h-32 object-contain"
          />
        </div>
      ) : (
        <h1 className="text-white font-bold absolute top-[350px] left-14 text-[50px]">
          {isTV ? featuredItem.name : featuredItem.title}
        </h1>
      )}

      {/* Buttons */}
      <button
        onClick={(e) => {
          e.preventDefault();
          getItemTrailer(featuredItem.id);
        }}
        className="btn-play absolute top-[450px] left-14"
      >
        <FaPlay className="text-[30px]" /> &ensp;Play
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          getItemTrailer(featuredItem.id);
        }}
        className="btn-info absolute top-[450px] left-60"
      >
        <AiOutlineInfoCircle className="text-[30px]" /> &ensp;More Info
      </button>

      <Navbar />
      {showModal && selectedItem && (
        <Modal
          movieTitle={featuredItem.title}
          moviesId={itemId}
          showModal={showModal}
          setShowModal={setShowModal}
          selectedMovie={selectedItem}
          urlId={urlId}
        />
      )}
    </div>
  );
}

export default Banner;
