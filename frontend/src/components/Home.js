import React from "react";
import Team from "./Team";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header>
        NBA Stats Analyze <i class="fas fa-basketball-ball fa-1x"></i>
      </header>
      <div className="home">
        {" "}
        <h3>
          {" "}
          You can choose team, see the seasone averages and Roster season
          average{" "}
        </h3>{" "}
      </div>
      <Team />
    </div>
  );
};

export default Home;
