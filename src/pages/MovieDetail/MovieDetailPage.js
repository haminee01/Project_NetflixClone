import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./MovieDetailPage.style.css";
import { useParams } from "react-router-dom";
import { useMovieDetailQuery } from "../../hooks/useMovieDetails";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";

const MovieDetailPage = () => {
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
  );
};

export default MovieDetailPage;
