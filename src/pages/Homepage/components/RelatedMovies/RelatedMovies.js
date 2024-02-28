import React from "react";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import "./RelatedMovies.style.css";

const RelatedMovies = ({ movies }) => {
  console.log("movies", movies);

  return (
    <div className="card-area">
      {movies?.results.map((movies, index) => (
        <div key={index}>
          <MovieCard movie={movies} />
        </div>
      ))}
    </div>
  );
};

export default RelatedMovies;
