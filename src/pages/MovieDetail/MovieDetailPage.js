import React from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import "./MovieDetailPage.style.css";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetails";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import MovieReviews from "../Homepage/components/Review/MovieReviews";

const MovieDetailPage = () => {
  const posterBaseUrl = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";
  const { id } = useParams();

  const { data, isLoading, isError, error } = useMovieDetailQuery({ id });
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
  console.log("ddd", data);

  return (
    <>
      <div className="moviedetail-background moviedetail-area">
        <div>
          <h1>NETFLIX</h1>
          <ul className="breadcrumb-menu">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <span>{data?.title}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="movie-detail">
        <Container>
          <Row>
            <Col xl={6} lg={4}>
              {data ? (
                <img
                  className="detail-poster"
                  src={`${posterBaseUrl}${data.poster_path}`}
                />
              ) : (
                <div>No image available</div>
              )}
            </Col>
            <Col xl={6} lg={8}>
              {data?.genres.map((genre) => (
                <span key={genre.id} className="genre-box">
                  {genre.name}
                </span>
              ))}
              <div className="detail-title">{data?.title}</div>
              <div className="detail-tagline">{data?.tagline}</div>
              <div className="detail-infos">
                <span style={{ marginRight: "20px" }}>
                  <img
                    src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png"
                    style={{
                      width: "25px",
                      height: "25px",
                      marginRight: "5px",
                    }}
                  />
                  {data ? data.vote_average : <div>No average available</div>}
                </span>
                <span style={{ marginRight: "20px" }}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ marginRight: "5px" }}
                  />
                  {data ? data.popularity : <div>No popularity available</div>}
                </span>
                <span className="eighteen">
                  {data.adult ? "19" : "under 18"}
                </span>
              </div>

              <div className="detail-overview">{data?.overview}</div>

              <div className="detail-other">
                <ul>
                  <li>
                    <span className="detail-box">Budget</span>
                    {"$"}
                    {data ? data.budget : <span>No budget available</span>}
                  </li>
                  <li>
                    <span className="detail-box">Revenue</span>
                    {"$"}
                    {data ? data.revenue : <span>No revenue available</span>}
                  </li>
                  <li>
                    <span className="detail-box">Release Day</span>
                    {data ? data.release_date : <span>No date available</span>}
                  </li>
                  <li>
                    <span className="detail-box">Time</span>
                    {data ? data.runtime : <span>No runtime available</span>}
                  </li>
                </ul>
              </div>

              <button className="more-button">Watch Trailer</button>
            </Col>
          </Row>
          <MovieReviews id={id} />
        </Container>
      </div>
    </>
  );
};

export default MovieDetailPage;
