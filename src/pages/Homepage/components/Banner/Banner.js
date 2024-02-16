import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import ClipLoader from "react-spinners/ClipLoader";
<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap')
</style>;

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log("ddd", data);
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
  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${data?.results[0].poster_path}` +
          ")",
      }}
      className="banner"
    >
      <div className="banner-text-area">
        <h1 className="banner-text-h1">{data?.results[0].title}</h1>
        <h5 className="banner-text-h5">{data?.results[0].overview}</h5>
      </div>
    </div>
  );
};

export default Banner;
