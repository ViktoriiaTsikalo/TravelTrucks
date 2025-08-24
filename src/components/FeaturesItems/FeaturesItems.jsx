import React from "react";
import s from "./FeaturesItems.module.css";
import sprite from "../../assets/img/sprite.svg";

const FeaturesItems = ({ camper }) => {
  const featuresMap = {
    transmission: {
      label: "Automatic",
      icon: "icon-diagram",
      className: s.badgeSvg,
    },
    engine: { label: "Engine", icon: "icon-petrol", className: s.badgeSvg },
    AC: { label: "AC", icon: "icon-wind", className: s.badgeSvg },
    kitchen: { label: "Kitchen", icon: "icon-kitchen", className: s.badgeSvg },
    bathroom: { label: "Bathroom", icon: "icon-shower", className: s.badgeSvg },
    TV: { label: "TV", icon: "icon-tv", className: s.badgeSvg },
    radio: { label: "Radio", icon: "icon-radio", className: s.badgeSvg },
    refrigerator: {
      label: "Fridge",
      icon: "icon-fridge",
      className: s.badgeSvg,
    },
    microwave: {
      label: "Microwave",
      icon: "icon-microwave",
      className: s.iconSpecial,
    },
    gas: { label: "Gas", icon: "icon-gas", className: s.iconSpecial },
    water: { label: "Water", icon: "icon-water", className: s.iconSpecial },
  };

  const capitalize = (str) =>
    typeof str === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  return (
    <ul className={s.badgesContainer}>
      {Object.entries(featuresMap).map(([key, { label, icon, className }]) => {
        const value = camper[key];
        if (!value) return null;

        return (
          <li key={key} className={s.badge}>
            <svg className={className}>
              <use href={`${sprite}#${icon}`} />
            </svg>
            {typeof value === "boolean" ? label : capitalize(value)}
          </li>
        );
      })}
    </ul>
  );
};

export default FeaturesItems;
