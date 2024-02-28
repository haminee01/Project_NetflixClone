import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReviews";
import { useRelatedMovieQuery } from "../../../../hooks/useRelatedMovies";
import ReviewList from "../ReviewList/ReviewList";
import "./MovieReview.style.css";
import RelatedMovies from "../RelatedMovies/RelatedMovies";

const MovieReviews = ({ id }) => {
  const {
    data: ReviewData,
    isLoading,
    isError,
    error,
  } = useMovieReviewQuery({ id });
  const { data: RelateData } = useRelatedMovieQuery({ id });

  const [activeTab, setActiveTab] = useState("reviews");
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

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
    <>
      <div className="review-area">
        <button
          className={`review-tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => toggleTab("reviews")}
        >
          REVIEWS ({ReviewData?.results.length})
        </button>
        <button
          className={`review-tab ${
            activeTab === "relatedMovies" ? "active" : ""
          }`}
          onClick={() => toggleTab("relatedMovies")}
        >
          RELATED MOVIES ({RelateData?.results.length})
        </button>
      </div>
      <div>
        {activeTab === "reviews" && <ReviewList reviews={ReviewData.results} />}
        {activeTab === "relatedMovies" && <RelatedMovies movies={RelateData} />}
      </div>
    </>
  );
};

export default MovieReviews;
