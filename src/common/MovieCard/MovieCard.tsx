import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

interface IMovie {
  id: number;
  title: string;
  poster_path: string | null;
  genre_ids: number[];
  vote_average: number;
  popularity: number;
  adult: boolean;
}

interface IGenre {
  id: number;
  name: string;
}

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const { data: genreData } = useMovieGenreQuery();

  if (!movie || !movie.id) {
    return null;
  }

  const isMobile = window.innerWidth <= 768;
  const backgroundImageUrl = isMobile
    ? "https://media.themoviedb.org/t/p/w533_and_h300_bestv2"
    : "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";

  const goToMovieDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  const showGenre = (genreIdList: number[]): string[] => {
    if (!genreData || !genreIdList) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre: IGenre) => genre.id === id);
      return genreObj ? genreObj.name : "";
    });
    return genreNameList;
  };

  return (
    <div
      onClick={goToMovieDetail}
      style={{
        backgroundImage: `url(${backgroundImageUrl}${movie.poster_path || ""})`,
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
          {Array.isArray(movie.genre_ids) &&
            showGenre(movie.genre_ids).map((name, index) => (
              <Badge key={index} bg="danger" className="mr-10">
                {name}
              </Badge>
            ))}
        </div>
        <div className="card-bottom-1">
          <span className="mr-10">
            <img
              className="mr-5"
              src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png"
              style={{ width: "20px", height: "20px" }}
              alt="IMDb logo"
            />
            {movie.vote_average}
          </span>
          <span className="mr-10">
            <img
              className="mr-5"
              src="https://cdn-icons-png.flaticon.com/512/33/33308.png"
              style={{ width: "20px", height: "20px" }}
              alt="Popularity icon"
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
