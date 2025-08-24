import React, { useState } from "react";
import s from "./FiltersForm.module.css";
import sprite from "../../assets/img/sprite.svg";

const FiltersForm = ({ onApply }) => {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState(""); // тип кузова
  const [features, setFeatures] = useState({
    AC: false,
    kitchen: false,
    bathroom: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  });

  const iconMap = {
    AC: { icon: "icon-wind", className: s.featureSvg },
    kitchen: { icon: "icon-kitchen", className: s.featureSvg },
    bathroom: { icon: "icon-shower", className: s.featureSvg },
    TV: { icon: "icon-tv", className: s.featureSvg },
    radio: { icon: "icon-radio", className: s.featureSvg },
    refrigerator: { icon: "icon-fridge", className: s.featureSvg },
    microwave: { icon: "icon-microwave", className: s.iconSpecial },
    gas: { icon: "icon-gas", className: s.iconSpecial },
    water: { icon: "icon-water", className: s.iconSpecial },
  };

  const formMap = {
    alcove: { icon: "icon-alcove", label: "Alcove" },
    van: { icon: "icon-van", label: "Van" },
    integrated: { icon: "icon-integrated", label: "Fully Integrated" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeFeatures = Object.fromEntries(
      Object.entries(features).filter(([_, value]) => value)
    );
    const filters = {
      location: location.trim() || undefined,
      form: form || undefined,
      ...activeFeatures,
    };
    onApply(filters);
  };

  return (
    <form onSubmit={handleSubmit} className={s.filtersForm}>
      {/* Location */}
      <label className={s.locationLabel}>Location</label>
      <div className={s.location}>
        <input
          type="text"
          placeholder="City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={s.input}
        />
        <svg
          className={s.mapSvg}
          style={{ fill: location ? "var(--main)" : "var(--gray)" }}
        >
          <use href={`${sprite}#icon-map`} />
        </svg>
      </div>

      {/* Feature buttons */}
      <h3 className={s.filtersTitle}>Filters</h3>
      <h4 className={s.filtersItemTitle}>Vehicle equipment</h4>
      <div className={s.features}>
        {Object.keys(features).map((key) => {
          const isActive = features[key];
          return (
            <button
              key={key}
              type="button"
              className={`${s.featureBtn} ${isActive ? s.active : ""}`}
              onClick={() =>
                setFeatures((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            >
              <svg className={iconMap[key].className}>
                <use href={`${sprite}#${iconMap[key].icon}`} />
              </svg>
              <span>{key}</span>
            </button>
          );
        })}
      </div>
      <h4 className={s.filtersItemTitle}>Vehicle type</h4>
      <div className={s.formButtons}>
        {Object.keys(formMap).map((key) => (
          <button
            key={key}
            type="button"
            className={`${s.featureBtn} ${form === key ? s.active : ""}`}
            onClick={() => setForm(key)}
          >
            <svg className={s.featureSvg}>
              <use href={`${sprite}#${formMap[key].icon}`} />
            </svg>
            <span>{formMap[key].label}</span>
          </button>
        ))}
      </div>

      <button type="submit" className={s.applyBtn}>
        Search
      </button>
    </form>
  );
};

export default FiltersForm;
