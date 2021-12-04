import React from "react";
import { Link } from "react-router-dom";

const Reviews = ({ review }) => {
  console.log(review, "Reviews Log");
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
// export default SingleProducts;