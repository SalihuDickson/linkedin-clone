import React from "react";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import FolderRoundedIcon from "@material-ui/icons/FolderRounded";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import backgroundplaceholder from "./backgroundplaceholder.jpeg";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <div className="main__section">
        <section className="personal">
          <div
            className="banner__img"
            style={{ backgroundImage: `url(${backgroundplaceholder})` }}
          ></div>
          <div className="avatar sidebar__avatar">
            <Avatar
              className="avatar__img"
              style={{
                textAlign: "center",
                verticalAlign: "center",
                width: 60,
                height: 60,
                fontSize: 25,
                marginTop: -38,
              }}
            >
              {user.avatar ? null : user.name[0]}
            </Avatar>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="job__desc">{user.jobDesc}</div>
            </div>
          </div>
        </section>
        <section className="connection">
          <div className="content">
            <div className="text">
              <p>connections</p>
              <p>Grow Your Network</p>
            </div>
            <PersonAddRoundedIcon className="sidebar__icon" />
          </div>
        </section>
        <section className="premium">
          <div className="content">
            <div className="text">
              <p>Access exclusive tools & insights</p>
              <p>
                <FolderRoundedIcon
                  style={{ fontSize: 17 }}
                  className="sidebar__icon"
                />{" "}
                Try Premium for free
              </p>
            </div>
          </div>
        </section>
        <section className="items">
          <div className="content">
            <div className="text">
              <p>
                {" "}
                <BookmarkRoundedIcon
                  style={{ fontSize: 17 }}
                  className="sidebar__icon"
                />{" "}
                My Items
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="secondary__section">
        <section className="misc">
          <div className="content">
            <div className="text">
              <ul>
                <li>
                  <a href="#">Groups</a>
                </li>
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">Followed Hashtags</a>
                </li>
              </ul>
            </div>
            <AddRoundedIcon className="grey__icon" />
          </div>
        </section>
        <section className="more">
          <div className="content">
            <div className="text">Discover more</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
