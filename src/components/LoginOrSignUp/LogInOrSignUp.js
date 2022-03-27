import React from "react";
import "./LogInOrSignUp.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";

const LogInOrSignUp = () => {
  return (
    <div className="loginorsignup">
      <header className="liosu__header">
        <div className="header__left">
          <div className="main__logo">
            <Link to="/">
              <img src="./images/linkedin-logo.png" alt="Linkedin Logo" />
            </Link>
          </div>
        </div>
        <div className="header__right">
          <div className="liosu__buttons">
            <Link to="/sign-up" style={{ textDecoration: "none" }}>
              <div className="signup__btn">Join now</div>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div className="login__btn">sign-in</div>
            </Link>
          </div>
        </div>
      </header>

      <div className="liosu__body">
        <div className="content">
          <div className="welcome">Welcome to your professional community</div>
          <div className="buttons">
            <div className="job__search button">
              <p>Search for a job</p>
              <ArrowForwardIosIcon style={{ color: "#6e6e6e" }} />
            </div>
            <div className="person__search button">
              <p>Find a person you know</p>
              <ArrowForwardIosIcon style={{ color: "#6e6e6e" }} />
            </div>
            <div className="skill__search button">
              <p>Learn a new skill</p>
              <ArrowForwardIosIcon style={{ color: "#6e6e6e" }} />
            </div>
          </div>
        </div>
        <div className="illustration">
          <img
            src="./images/undraw_positive_attitude_re_wu7d.svg"
            alt="Linkedin Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default LogInOrSignUp;
