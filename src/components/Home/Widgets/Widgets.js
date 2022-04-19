import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="heading">
        <p>Add to Your Feed</p>
        <InfoIcon style={{ fontSize: 20 }} />
      </div>

      <div className="suggested__accounts">
        <div className="account">
          <AccountCircleRoundedIcon
            style={{ fontSize: 48 }}
            className="avatar"
          />
          <div className="info">
            <p className="name">name</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              omnis.
            </p>
            <button
              className="follow__btn no__functionality"
              title="doesn't work"
            >
              {" "}
              <AddRoundedIcon /> Follow
            </button>
          </div>
        </div>
        <div className="account">
          <AccountCircleRoundedIcon
            style={{ fontSize: 48 }}
            className="avatar"
          />
          <div className="info">
            <p className="name">name</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              omnis.
            </p>
            <button
              className="follow__btn no__functionality"
              title="doesn't work"
            >
              {" "}
              <AddRoundedIcon /> Follow
            </button>
          </div>
        </div>
        <div className="account">
          <AccountCircleRoundedIcon
            style={{ fontSize: 48 }}
            className="avatar"
          />
          <div className="info">
            <p className="name">name</p>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo,
              omnis.
            </p>
            <button
              className="follow__btn no__functionality"
              title="doesn't work"
            >
              {" "}
              <AddRoundedIcon /> Follow
            </button>
          </div>
        </div>

        <p className="recommendations">
          View all recommendations <ArrowForwardIcon style={{ fontSize: 18 }} />
        </p>
      </div>
    </div>
  );
};

export default Widgets;
