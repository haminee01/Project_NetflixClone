import React, { useState } from "react";
import { Col, Container, Row, Alert, Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import MovieReviews from "../Homepage/components/Review/MovieReviews";
import { useMovieDetailQuery } from "../../hooks/useMovieDetails";
import { IMovieDetails } from "../../hooks/useMovieDetails";
import { useMovieVideos } from "../../hooks/useMovieVideos";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const posterBaseUrl = "https://media.themoviedb.org/t/p/w300_and_h450_bestv2";
  const { id } = useParams<{ id: string }>();

  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError, error } = useMovieDetailQuery({
    id: id as string,
  });

  const {
    data: videoData,
    isLoading: isVideoLoading,
    isError: isVideoError,
    error: videoError,
  } = useMovieVideos({
    id: id as string,
  });

  if (isLoading || isVideoLoading) {
    return (
      <div className="spinner">
        <ClipLoader
          color="#ffff"
          loading={isLoading || isVideoLoading}
          size={150}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error?.message}</Alert>;
  }
  if (isVideoError) {
    return <Alert variant="danger">{videoError?.message}</Alert>;
  }

  if (!data) {
    return null;
  }

  const trailer = videoData?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  const handleShowTrailer = () => {
    if (trailer) {
      setShowModal(true);
    } else {
      alert("트레일러 영상이 없습니다.");
    }
  };

  const handleCloseModal = () => setShowModal(false);

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
            <Col sm={12} lg={4}>
              {data ? (
                <img
                  className="detail-poster"
                  src={`${posterBaseUrl}${data.poster_path}`}
                  alt={data.title}
                />
              ) : (
                <div className="text-white text-center">No image available</div>
              )}
            </Col>
            <Col sm={12} lg={8}>
              <div className="genre-container">
                {data?.genres.map((genre) => (
                  <span key={genre.id} className="genre-box">
                    {genre.name}
                  </span>
                ))}
              </div>
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
                    alt="IMDB Logo"
                  />
                  {data?.vote_average ? data.vote_average.toFixed(1) : "N/A"}
                </span>
                <span style={{ marginRight: "20px" }}>
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ marginRight: "5px" }}
                  />
                  {data?.popularity ? data.popularity.toFixed(0) : "N/A"}
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
                    {data?.budget ? data.budget.toLocaleString() : "N/A"}
                  </li>
                  <li>
                    <span className="detail-box">Revenue</span>
                    {"$"}
                    {data?.revenue ? data.revenue.toLocaleString() : "N/A"}
                  </li>
                  <li>
                    <span className="detail-box">Release Day</span>
                    {data?.release_date || "N/A"}
                  </li>
                  <li>
                    <span className="detail-box">Time</span>
                    {data?.runtime ? `${data.runtime} min` : "N/A"}
                  </li>
                </ul>
              </div>
              <button
                className="more-button"
                onClick={handleShowTrailer}
                disabled={!trailer}
              >
                Watch Trailer
              </button>
            </Col>
          </Row>
          {id && <MovieReviews id={id} />}
        </Container>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{data?.title} Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailer ? (
            <div className="iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div>Trailer not available.</div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieDetailPage;
