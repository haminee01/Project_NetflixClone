import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}` +
          ")",
      }}
      className="movie-card"
    >
      <div className="overlay p-10">
        <div>
          <h1
            className={`movie-title ${
              movie.title.length > 15 ? "smaller-text" : ""
            }`}
          >
            {movie.title}
          </h1>
          {movie.genre_ids.map((id) => (
            <Badge bg="danger" className="mr-10">
              {id}
            </Badge>
          ))}
        </div>
        <div className="card-bottom-1">
          <span className="mr-10">
            <img
              className="mr-5"
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png"
              style={{ width: "20px", height: "20px" }}
            />
            {movie.vote_average}
          </span>
          <span className="mr-10">
            <img
              className="mr-5"
              src="https://cdn-icons-png.flaticon.com/512/33/33308.png"
              style={{ width: "20px", height: "20px" }}
            />
            {movie.popularity}
          </span>
        </div>
        <div className="card-bottom-2">
          <div className="eighteen">{movie.adult ? "Over 18" : "Under 18"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
