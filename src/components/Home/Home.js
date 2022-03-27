import React from "react";
import "./Home.css";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import Widgets from "./Widgets/Widgets";
import useWindowSize from "../../hooks/useWindowSize";

const Home = () => {
  const { width } = useWindowSize();

  return (
    <main>
      <Sidebar />
      <Feed />
      {width < 991 ? <div>&nbsp;</div> : null}
      <Widgets />
    </main>
  );
};

export default Home;
