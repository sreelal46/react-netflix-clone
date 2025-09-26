import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Card from "../components/Card";
import { genresForTv } from "../../../Genres";
import Footer from "../components/Footer";

export default function Shows({ title, weNeed }) {
  return (
    <>
      <Banner title={title} weNeed={weNeed} path="/tv/popular" />
      {genresForTv.map((item) => (
        <Card title={item.name} gap={item.gap} id={item.id} show="tv" />
      ))}
      <Footer gap="-2000" />
    </>
  );
}
