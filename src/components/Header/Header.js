import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import BusinessCenterRoundedIcon from "@material-ui/icons/BusinessCenterRounded";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import NotificationsRoundedIcon from "@material-ui/icons/NotificationsRounded";
import Avatar from "@material-ui/core/Avatar";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";
import "./Header.css";
import useWindowSize from "../../hooks/useWindowSize";
import { getAuth, signOut } from "@firebase/auth";
import { logout } from "../../features/User/userSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const { width } = useWindowSize();
  const { user } = useSelector((state) => state.user);
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };

  return (
    <header>
      {width < 1030 ? (
        <div className="header__right">
          <div className="main__logo">
            <img src="./images/linkedin.png" alt="Linkedin Logo" />
          </div>
          <div className="nav__icon" style={{ gap: 0 }}>
            <SearchIcon />
            <p>Search</p>
          </div>
          <div className="nav__icon active">
            <HomeRoundedIcon className="icon" />
            <p>Home</p>
          </div>
          <div className="nav__icon">
            <PeopleRoundedIcon className="icon" />
            <p>My Network</p>
          </div>
          <div className="nav__icon">
            <BusinessCenterRoundedIcon className="icon" />
            <p>Jobs</p>
          </div>
          <div className="nav__icon">
            <ChatRoundedIcon className="icon" />
            <p>Messages</p>
          </div>
          <div className="nav__icon">
            <NotificationsRoundedIcon className="icon" />
            <p>Notifications</p>
          </div>
          <div className="nav__icon">
            <Avatar
              className="icon"
              style={{
                textAlign: "center",
                verticalAlign: "center",
                fontSize: 16,
                height: 27,
                width: 27,
              }}
            >
              {user.avatar ? null : user.name[0]}
            </Avatar>
            <p>Me</p>
          </div>
          <div className="nav__icon pointer__cursor" onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <p>Logout</p>
          </div>
        </div>
      ) : (
        <>
          <div className="header__left">
            <div className="main__logo">
              <img src="./images/linkedin.png" alt="Linkedin Logo" />
            </div>
            <form className="header__search">
              <SearchIcon className="header__search-icon" />
              <input type="text" placeholder="Search" name="" id="" />
            </form>
          </div>
          <div className="header__right">
            <div className="nav__icon active">
              <HomeRoundedIcon className="icon" />
              <p>Home</p>
            </div>
            <div className="nav__icon">
              <PeopleRoundedIcon className="icon" />
              <p>My Network</p>
            </div>
            <div className="nav__icon">
              <BusinessCenterRoundedIcon className="icon" />
              <p>Jobs</p>
            </div>
            <div className="nav__icon">
              <ChatRoundedIcon className="icon" />
              <p>Messages</p>
            </div>
            <div className="nav__icon">
              <NotificationsRoundedIcon className="icon" />
              <p>Notifications</p>
            </div>
            <div className="nav__icon">
              <Avatar
                className="icon"
                style={{
                  textAlign: "center",
                  verticalAlign: "center",
                  fontSize: 16,
                  height: 27,
                  width: 27,
                }}
              >
                {user.avatar ? null : user.name[0]}
              </Avatar>
              <p>Me</p>
            </div>
            <div className="nav__icon pointer__cursor" onClick={handleLogout}>
              <ExitToAppIcon className="icon" />
              <p>Logout</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
