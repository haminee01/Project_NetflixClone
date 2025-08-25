import React from "react";
import "./MovieSlider.style.css";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";

interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  adult: boolean;
}

interface MovieSliderProps {
  title: string;
  movies: IMovie[];
  responsive: ResponsiveType;
}

const MovieSlider = ({ title, movies, responsive }: MovieSliderProps) => {
  return (
    <div className="popular-slide">
      <h3 className="font-size">{title}</h3>
      <Carousel
        infinite={true}
        centerMode={false}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
