import React from "react";
import s from "./Reviews.module.css";
import sprite from "../../assets/img/sprite.svg";

const Reviews = ({ camper }) => {
  const renderStars = (rating) => {
    const totalStars = 5;
    const starsArray = [];

    for (let i = 1; i <= totalStars; i++) {
      starsArray.push(
        <svg key={i} className={`${s.star} ${i <= rating ? s.active : ""}`}>
          <use href={`${sprite}#icon-star`} />
        </svg>
      );
    }

    return starsArray;
  };

  if (!camper?.reviews?.length) return <p>No reviews yet</p>;

  return (
    <section className={s.reviewsSection}>
      <ul className={s.reviewsList}>
        {camper.reviews.map((review, index) => (
          <li key={index} className={s.reviewItem}>
            <div className={s.header}>
              <div className={s.avatar}>
                {review.reviewer_name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={s.name}>{review.reviewer_name}</p>
                <div className={s.stars}>
                  {renderStars(review.reviewer_rating)}
                </div>
              </div>
            </div>
            <p className={s.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Reviews;
