import React, { useState } from "react";
import "./ReviewList.style.css";
import { IReview } from "../../../../types/IReview";

interface ReviewListProps {
  reviews: IReview[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  const [expandedReviews, setExpandedReviews] = useState<boolean[]>([]);

  const toggleExpanded = (index: number) => {
    const updatedExpanded = [...expandedReviews];
    updatedExpanded[index] = !updatedExpanded[index];
    setExpandedReviews(updatedExpanded);
  };

  console.log("reviews", reviews);

  return (
    <div className="reviews">
      {reviews && Array.isArray(reviews) && reviews.length > 0 ? (
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
