import React from "react";
import s from "./MainInfo.module.css";
import sprite from "../../assets/img/sprite.svg";

const MainInfo = ({ camper }) => {
  return (
    <div className={s.details}>
      <h2 className={s.title}>{camper.name}</h2>
      <div className={s.ratingAndLocationRow}>
        <div className={s.ratingRow}>
          <svg className={s.starSvg}>
            <use href={`${sprite}#icon-star`} />
          </svg>
          <p className={s.rating}>
            {camper.rating}({camper.reviews.length} Reviews)
          </p>
        </div>
        <p className={s.location}>
          <svg className={s.mapSvg}>
            <use href={`${sprite}#icon-map`} />
          </svg>
          {camper.location}
        </p>
      </div>
      <p className={s.price}>€{camper.price}</p>
      <div className={s.gallery}>
        {camper.gallery.map((img, idx) => (
          <img
            key={idx}
            src={img.thumb}
            alt={`${camper.name} ${idx + 1}`}
            className={s.image}
          />
        ))}
      </div>
      <p className={s.description}>{camper.description}</p>
    </div>
  );
};

export default MainInfo;
