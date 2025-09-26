import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { genres } from "../../../Genres";

export default function Movie({ title, weNeed }) {
  return (
    <>
      <Banner title={title} weNeed={weNeed} path={"/movie/top_rated"} />
      {genres.map((value) => (
        <Card title={value.name} gap={value.gap} id={value.id} show="movie" />
      ))}
      {/* <Navbar /> */}
      <Footer gap="-4000" />
    </>
  );
}
