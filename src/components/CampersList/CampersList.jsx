import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CamperCard from "../CamperCard/CamperCard";
import FiltersForm from "../FiltersForm/FiltersForm";
import {
  selectCampers,
  selectIsLoading,
  selectError,
  selectTotal,
} from "../../redux/campers/selectors";
import { fetchCampers } from "../../redux/campers/operations";
import s from "./CampersList.module.css";

const CampersList = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const total = useSelector(selectTotal);

  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 4;
  const firstNewCardRef = useRef(null);

  // Завантаження при зміні сторінки або фільтрів
  useEffect(() => {
    dispatch(fetchCampers({ page, limit, filters }));
  }, [dispatch, page, filters]);

  // Скрол до першої нової картки
  useEffect(() => {
    if (page > 1 && firstNewCardRef.current) {
      firstNewCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [campers]);

  const handleShowMore = () => setPage((prev) => prev + 1);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // повертаємо на першу сторінку
  };

  return (
    <section className={s.campers}>
      <FiltersForm onApply={handleApplyFilters} />
      <div className={s.campersList}>
        {isLoading && page === 1 && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {campers.map((camper, index) => {
          const isFirstNew = index === (page - 1) * limit;
          return (
            <div key={camper.id} ref={isFirstNew ? firstNewCardRef : null}>
              <CamperCard camper={camper} />
            </div>
          );
        })}

        {campers.length < total && !isLoading && (
          <button className={s.moreBtn} onClick={handleShowMore}>
            Load more
          </button>
        )}

        {isLoading && page > 1 && <p>Loading more...</p>}
      </div>
    </section>
  );
};

export default CampersList;
