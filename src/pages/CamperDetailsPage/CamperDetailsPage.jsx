import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCamper } from "../../redux/campers/selectors";
import s from "./CamperDetailsPage.module.css";
import { useEffect, useState } from "react";
import { fetchCampersById } from "../../redux/campers/operations";
import MainInfo from "../../components/MainInfo/MainInfo";
import Features from "../../components/Features/Features";
import Reviews from "../../components/Reviews/Reviews";
import BookingForm from "../../components/BookingForm/BookingForm";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCamper);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCampersById(id));
  }, [dispatch, id]);

  if (!camper) {
    return <p className={s.notFound}>Camper not found</p>;
  }

  return (
    <div className={s.container}>
      <MainInfo camper={camper} />
      <div className={s.tabs}>
        <button
          className={`${s.tabButton} ${
            activeTab === "features" ? s.activeTab : ""
          }`}
          onClick={() => setActiveTab("features")}
        >
          <span className={s.tabText}>Features</span>
        </button>
        <button
          className={`${s.tabButton} ${
            activeTab === "reviews" ? s.activeTab : ""
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          <span className={s.tabText}>Reviews</span>
        </button>
      </div>

      <div className={s.contentRow}>
        <div className={s.tabContent}>
          {activeTab === "features" && <Features camper={camper} />}
          {activeTab === "reviews" && <Reviews camper={camper} />}
        </div>
        <div className={s.bookingForm}>
          <BookingForm camper={camper} />
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
