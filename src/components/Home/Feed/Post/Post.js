import React, { useEffect, useState } from "react";
import "./Post.css";
import PublicIcon from "@material-ui/icons/Public";
import Avatar from "@material-ui/core/Avatar";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import CommentIcon from "@material-ui/icons/Comment";
import { useSelector } from "react-redux";
import useClickedOutside from "../../../../hooks/useClickedOutside";
import EditPost from "./EditPost/EditPost";
import LikeBtn from "./LikeBtn/LikeBtn";
import SendBtn from "./SendBtn/SendBtn";
import MoreBtn from "./MoreBtn/MoreBtn";
import CommentSection from "./CommentSection/CommentSection";
import AvatarGroup from "@mui/material/AvatarGroup";
import ReactPlayer from "react-player";
import useWindowSize from "../../../../hooks/useWindowSize";
import { formatRelative } from "date-fns";

const Post = ({
  postId,
  userId,
  name,
  jobDesc,
  text,
  imgSrc,
  videoSrc,
  avatar,
  likes,
  comments,
  timestamp,
}) => {
  const { user } = useSelector((state) => state.user);
  const [editVisible, setEditVisible, editRef, editClickableRef] =
    useClickedOutside(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [timeDiff, setTimeDiff] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0,
  });

  const { width } = useWindowSize();

  useEffect(() => {
    if (timestamp) {
      const timePosted = timestamp.toDate();
      const currentTime = new Date();

      setTimeDiff(() => ({
        seconds: getDifferenceInSeconds(currentTime, timePosted),
        minutes: getDifferenceInMinutes(currentTime, timePosted),
        hours: getDifferenceInHours(currentTime, timePosted),
        days: getDifferenceInDays(currentTime, timePosted),
      }));
    }
  }, [new Date().getSeconds()]);

  useEffect(() => {
    if (!editVisible) {
      document.querySelector("html").style.overflow = "scroll";
    } else if (editVisible) {
      window.scrollTo(0, 0);
      document.querySelector("html").style.overflow = "hidden";
    }
  }, [editVisible]);

  const { seconds, minutes, hours, days } = timeDiff;

  return (
    <div className="post container">
      {editVisible && (
        <EditPost
          editRef={editRef}
          setEditVisible={setEditVisible}
          postId={postId}
          text={text}
          prevImgSrc={imgSrc}
          prevVideoSrc={videoSrc}
          editClickableRef={editClickableRef}
        />
      )}
      <div className="post__top">
        <div className="post__account">
          <Avatar style={{ textAlign: "center", verticalAlign: "center" }}>
            {name[0]}
          </Avatar>
          <div className="info">
            <p className="name">{name}</p>
            <p className="job__desc">{jobDesc}</p>
            <div className="time__posted">
              <p>
                {seconds < 4
                  ? "now•"
                  : seconds < 60
                  ? `${seconds}s ago•`
                  : minutes < 60
                  ? `${minutes}m ago•`
                  : hours < 24
                  ? `${hours}h ago•`
                  : days < 4
                  ? `${days}d ago•`
                  : timestamp &&
                    formatRelative(timestamp.toDate(), new Date()).replace(
                      /\//g,
                      "-"
                    )}{" "}
              </p>
            </div>
          </div>
        </div>
        {userId === user.uid && (
          <MoreBtn setEditVisible={setEditVisible} postId={postId} />
        )}
      </div>
      <div className="post__content">
        {text && <p className="post__text">{text}</p>}
        {(imgSrc || videoSrc) && (
          <div className="post__media">
            {imgSrc ? (
              <img src={imgSrc} alt="image here" />
            ) : (
              videoSrc && <ReactPlayer controls width="100%" url={videoSrc} />
            )}
          </div>
        )}
      </div>
      {likes.length > 0 && (
        <div className="avatar__group">
          <p>Liked by</p>{" "}
          <AvatarGroup total={likes.length}>
            {likes[0] && (
              <Avatar
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[0].name[0]}
              </Avatar>
            )}

            {likes[1] && (
              <Avatar
                src="/static/images/avatar/2.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[1].name[0]}
              </Avatar>
            )}

            {likes[2] && (
              <Avatar
                src="/static/images/avatar/3.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[2].name[0]}
              </Avatar>
            )}

            {likes[3] && (
              <Avatar
                src="/static/images/avatar/3.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[3].name[0]}
              </Avatar>
            )}

            {likes[3] && (
              <Avatar
                src="/static/images/avatar/3.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[3].name[0]}
              </Avatar>
            )}

            {likes[4] && (
              <Avatar
                src="/static/images/avatar/3.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[4].name[0]}
              </Avatar>
            )}

            {likes[5] && (
              <Avatar
                src="/static/images/avatar/3.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[5].name[0]}
              </Avatar>
            )}

            {likes[6] && (
              <Avatar
                src="/static/images/avatar/3.jpg"
                style={{
                  width: 15,
                  height: 15,
                  fontSize: 10,
                  textAlign: "center",
                  verticalAlign: "center",
                }}
              >
                {likes[6].name[0]}
              </Avatar>
            )}
          </AvatarGroup>
        </div>
      )}
      <div className="post__icons icons">
        <LikeBtn likesList={likes} postId={postId} />
        <div
          className="feed__icon"
          onClick={() => setCommentsVisible((state) => !state)}
        >
          <CommentIcon />
          {width > 440 && <p>comment</p>}
        </div>
        <div title="doesn't work" className="feed__icon no__functionality">
          <ArrowRightAltIcon />
          {width > 440 && <p>share</p>}
        </div>
        <SendBtn />
      </div>
      {commentsVisible && (
        <CommentSection
          commentList={comments}
          postId={postId}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Post;

function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
}

function getDifferenceInHours(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return Math.floor(diffInMs / (1000 * 60 * 60));
}

function getDifferenceInMinutes(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return Math.floor(diffInMs / (1000 * 60));
}

function getDifferenceInSeconds(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return Math.floor(diffInMs / 1000);
}
