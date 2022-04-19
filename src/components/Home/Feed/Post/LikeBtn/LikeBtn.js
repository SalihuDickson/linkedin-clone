import React from "react";
import "./LikeBtn.css";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "@firebase/firestore";
import { useSelector } from "react-redux";
import useWindowSize from "../../../../../hooks/useWindowSize";

const LikeBtn = ({ likesList, postId }) => {
  const { user } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);
  const postRef = doc(db, "posts", postId);
  const { width } = useWindowSize();

  useEffect(() => {
    for (let i = 0; i < likesList.length; i++) {
      if (likesList[i].uid === user.uid) {
        setLiked(true);
        break;
      }
    }
  }, []);

  const userInfo = {
    uid: user.uid,
    name: user.name,
    avatar: user.avatar || null,
    jobDesc: user.jobDesc,
  };

  const handleClickedLike = () => {
    if (!liked) {
      setLiked(true);
      updateDoc(postRef, {
        likes: arrayUnion(userInfo),
      });
    } else {
      setLiked(false);
      updateDoc(postRef, {
        likes: arrayRemove(userInfo),
      });
    }
  };

  return (
    <div
      className="feed__icon"
      style={{ cursor: "pointer" }}
      onClick={handleClickedLike}
    >
      {liked ? (
        <ThumbUpIcon
          style={{
            transform: "scaleX(-1)",
            color: "#0d68c3",
          }}
        />
      ) : (
        <ThumbUpAltOutlinedIcon style={{ transform: "scaleX(-1)" }} />
      )}{" "}
      {width > 440 && <p>Like</p>}
    </div>
  );
};

export default LikeBtn;
