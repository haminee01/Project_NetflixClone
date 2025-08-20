import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) {
    return (
      <div className="spinner">
        <ClipLoader color="#ffff" loading={isLoading} size={150} />
      </div>
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  if (!data || !data.results) {
    return null;
  }

  return (
    <MovieSlider
      title="Popular Movies"
      movies={data.results}
      responsive={responsive}
    />
  );
};

export default PopularMovieSlide;
