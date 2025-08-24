import FeaturesItems from "../FeaturesItems/FeaturesItems";
import s from "./Features.module.css";

const Features = ({ camper }) => {
  const capitalize = (str) =>
    typeof str === "string" ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const details = [
    { label: "Form", value: camper.form },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Consumption", value: camper.consumption },
  ];

  return (
    <section className={s.features}>
      <FeaturesItems camper={camper} />
      <h4 className={s.sectionTitle}>Vehicle details</h4>
      <ul className={s.detailsList}>
        {details.map(({ label, value }) => (
          <li key={label} className={s.listItem}>
            <span className={s.label}>{label}</span>
            <span className={s.value}>{capitalize(value)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
