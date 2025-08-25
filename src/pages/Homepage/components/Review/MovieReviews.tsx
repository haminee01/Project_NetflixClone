import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Alert from "react-bootstrap/Alert";
import { useMovieReviewQuery } from "../../../../hooks/useMovieReviews";
import { useRelatedMovieQuery } from "../../../../hooks/useRelatedMovies";
import ReviewList from "../ReviewList/ReviewList";
import "./MovieReview.style.css";
import RelatedMovies from "../RelatedMovies/RelatedMovies";
import { IMovie } from "../../../../types/IMovie";
import { IReview } from "../../../../types/IReview";

interface MovieReviewsProps {
  id: string | number;
}

const MovieReviews = ({ id }: MovieReviewsProps) => {
  const {
    data: ReviewData,
    isLoading,
    isError,
    error,
  } = useMovieReviewQuery({ id });

  const { data: RelateData } = useRelatedMovieQuery({ id });

  const [activeTab, setActiveTab] = useState("reviews");
  const toggleTab = (tab: string) => {
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
    return <Alert variant="danger">{error?.message}</Alert>;
  }

  return (
    <>
      <div className="review-area">
        <button
          className={`review-tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => toggleTab("reviews")}
        >
          REVIEWS ({ReviewData?.results.length || 0})
        </button>
        <button
          className={`review-tab ${
            activeTab === "relatedMovies" ? "active" : ""
          }`}
          onClick={() => toggleTab("relatedMovies")}
        >
          RELATED MOVIES ({RelateData?.results.length || 0})
        </button>
      </div>
      <div>
        {activeTab === "reviews" && ReviewData && (
          <ReviewList reviews={ReviewData.results} />
        )}
        {activeTab === "relatedMovies" && RelateData && (
          <RelatedMovies movies={RelateData} />
        )}
      </div>
    </>
  );
};

export default MovieReviews;
