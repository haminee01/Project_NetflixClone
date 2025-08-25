import React from "react";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import "./RelatedMovies.style.css";
import { IMovie } from "../../../../types/IMovie";

interface RelatedMoviesProps {
  movies: {
    results: IMovie[];
  };
}

const RelatedMovies = ({ movies }: RelatedMoviesProps) => {
  console.log("movies", movies);

  return (
    <div className="card-area">
      {movies.results.map((movie, index) => (
        <div key={index}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default RelatedMovies;
