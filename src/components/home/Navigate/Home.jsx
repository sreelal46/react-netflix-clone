import React from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { genres } from "../../../Genres";

export default function Home() {
  return (
    <>
      <Banner path="/movie/popular" />
      {genres.map((value) => (
        <Card title={value.name} gap={value.gap} id={value.id} show="movie" />
      ))}
      <Footer gap="-4000" />
    </>
  );
}
