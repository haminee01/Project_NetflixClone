import React from "react";
import { useState } from "react";
import "./ReviewList.style.css";

const ReviewList = ({ reviews }) => {
  const [expandedReviews, setExpandedReviews] = useState([]);

  const toggleExpanded = (index) => {
    const updatedExpanded = [...expandedReviews];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpandedReviews(updatedExpanded);
  };

  console.log("reviews", reviews);

  return (
    <div className="reviews">
      {reviews && reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div className="reviews-line" key={index}>
            <p>{review.author}</p>
            <p>
              {expandedReviews[index]
                ? review.content
                : review.content.slice(0, 500) + "..."}
            </p>
            {review.content.length > 500 && (
              <button
                className="more-button"
                onClick={() => toggleExpanded(index)}
              >
                {expandedReviews[index] ? "Quick view" : "More"}
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default ReviewList;
