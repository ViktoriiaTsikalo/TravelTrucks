import s from "./Hero.module.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalog`);
  };
  return (
    <section className={s.sectionHero}>
      <div className={s.heroContent}>
        <h1 className={s.title}>Campers of your dreams</h1>
        <p className={s.text}>
          You can find everything you want in our catalog
        </p>
        <button onClick={handleClick} className={s.btnViev}>
          View Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
