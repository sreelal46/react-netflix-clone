import React from "react";
import Navbar from "../components/Navbar";
import CardForNewPopular from "../components/CardForNewPopular";
import Footer from "../components/Footer";

export default function NewAndPopular() {
  return (
    <>
      <Navbar />
      <CardForNewPopular title="Trending" show="trending/all/day" />
      <CardForNewPopular
        title="Now Playing in Theatres"
        gap={350}
        show="movie/now_playing"
      />
      <CardForNewPopular title="Upcoming" gap={650} show="movie/upcoming" />
      <CardForNewPopular
        title="TV Shows (Airing Today)"
        gap={950}
        show="tv/airing_today"
      />
      <CardForNewPopular
        title="TV Shows (Currently On Air)"
        gap={1250}
        show="tv/on_the_air"
      />

      <Footer gap="-1800" />
    </>
  );
}
