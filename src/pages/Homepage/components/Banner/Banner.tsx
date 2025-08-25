import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import ClipLoader from "react-spinners/ClipLoader";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface IPopularMoviesResponse {
  results: IMovie[];
}

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <div className="spinner">
        <ClipLoader color="#ffff" loading={isLoading} size={150} />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  const isIPopularMoviesResponse = (d: any): d is IPopularMoviesResponse => {
    return d && d.results && Array.isArray(d.results);
  };

  if (!isIPopularMoviesResponse(data)) {
    return <div>유효한 영화 데이터를 찾을 수 없습니다.</div>;
  }

  const firstMovie = data.results[0];

  if (!firstMovie) {
    return <div>영화를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${firstMovie.poster_path})`,
      }}
      className="banner"
    >
      <div className="banner-text-area">
        <h1 className="banner-text-h1">{firstMovie.title}</h1>
        <h5 className="banner-text-h5">{firstMovie.overview}</h5>
      </div>
    </div>
  );
};

export default Banner;
