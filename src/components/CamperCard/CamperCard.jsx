import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./CamperCard.module.css";
import sprite from "../../assets/img/sprite.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/campers/slice";
import { selectFavorites } from "../../redux/campers/selectors";
import FeaturesItems from "../FeaturesItems/FeaturesItems";

const CamperCard = ({ camper }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(camper.id));
  };

  return (
    <div className={s.card}>
      <img
        src={camper.gallery[0]?.thumb}
        alt={camper.name}
        className={s.image}
      />
      <div className={s.content}>
        <div className={s.titleAndPrice}>
          <h2 className={s.title}>{camper.name}</h2>
          <div className={s.priceAndIcon}>
            <p className={s.price}>€{camper.price}</p>
            <button onClick={handleToggleFavorite} className={s.saveBtn}>
              <svg className={`${s.saveSvg} ${isFavorite ? s.active : ""}`}>
                <use href={`${sprite}#icon-save`} />
              </svg>
            </button>
          </div>
        </div>
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
        <p className={s.description}>{camper.description}</p>

        <FeaturesItems camper={camper} />
        <button
          className={s.moreBtn}
          onClick={() => navigate(`/catalog/${camper.id}`)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
