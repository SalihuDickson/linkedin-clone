import React from "react";
import "./Post.css";
import PublicIcon from "@material-ui/icons/Public";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUp";
import Avatar from "@material-ui/core/Avatar";
import CommentIcon from "@material-ui/icons/Comment";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import TelegramIcon from "@material-ui/icons/Telegram";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../../../firebase";
import { useSelector } from "react-redux";
import useClickedOutside from "../../../../hooks/useClickedOutside";
import EditPost from "./EditPost/EditPost";
import { useState } from "react";

const Post = ({ postId, userId, name, jobDesc, postText, avatar }) => {
  const { user } = useSelector((state) => state.user);
  const [moreVisible, setMoreVisible, moreRef] = useClickedOutside(false);
  const [editVisible, setEditVisible, editRef] = useClickedOutside(false);

  const handleDelete = () => {
    deleteDoc(doc(db, "posts", postId));
  };

  return (
    <div className="post container">
      {editVisible && (
        <EditPost
          editRef={editRef}
          setEditVisible={setEditVisible}
          postId={postId}
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
              <p>now • </p>
              <PublicIcon style={{ fontSize: 15 }} />
            </div>
          </div>
        </div>
        {userId === user.uid && (
          <div className="more">
            <span>
              <MoreHorizIcon
                style={{ fontSize: 22.5 }}
                onClick={() => setMoreVisible((state) => !state)}
              />
            </span>
            {moreVisible && (
              <div className="more__content container" ref={moreRef}>
                <div
                  className="more__icon icon"
                  onClick={() => {
                    setMoreVisible(false);
                    setEditVisible(true);
                  }}
                >
                  <EditIcon /> <p>Edit Post</p>
                </div>
                <div className="more__icon icon" onClick={handleDelete}>
                  <DeleteIcon /> <p>Delete Post</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="post__content">
        <p className="postText">{postText}</p>
      </div>
      <div className="post__icons icons">
        <div className="feed__icon" style={{ cursor: "pointer" }}>
          <div className="like__count">1</div>
          <ThumbUpAltOutlinedIcon
            style={{
              transform: "scaleX(-1)",
              color: "#0d68c3",
            }}
          />{" "}
          <p>Like</p>
        </div>
        <div className="feed__icon" style={{ cursor: "pointer" }}>
          <div className="comment__count">1</div>
          <CommentIcon
            style={{
              color: "#0d68c3",
            }}
          />{" "}
          <p>Comment</p>
        </div>
        <div title="doesn't work" className="feed__icon no__functionality">
          <ArrowRightAltIcon /> <p>Share</p>
        </div>
        <div className="feed__icon">
          <TelegramIcon /> <p>Send</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
