import React from "react";
import { Link } from "react-router-dom";
import "./Products.css"

const Reviews = ({ review }) => {
  return (
    <div className="review-card">
      {review ? (
        <>
          <h4>{review.title}</h4>
          <p>Review: {review.content}</p>
        </>
      ) : null}
    </div>
  );
};

export default Reviews;
