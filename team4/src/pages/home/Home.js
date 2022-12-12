import React, { useEffect } from "react";
import "./Home.css";
import TodayMovie from "../../components/todayMovie/TodayMovie";
import Slider from "../../pages/Netflix/Netflix";

const Home = (props) => {
  useEffect(() => {
    document.title = "Página de inicio - Team4";
  });

  return (
    <>
      <div className="movie-container overflow-hidden">
        <TodayMovie />

        <div className="movie-slider">
          <Slider type="movie" />
        </div>
      </div>
    </>
  );
};

export default Home;
