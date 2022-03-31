import React, { useEffect } from "react";
import "./CommentSection.css";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { db } from "../../../../../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "@firebase/firestore";

const CommentSection = ({ commentList, postId }) => {
  const { user } = useSelector((state) => state.user);
  const [input, setInput] = useState("");
  const ref = useRef();
  const postRef = doc(db, "posts", postId);
  const [commentsArr, setCommentsArr] = useState([]);

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    const temp = [];
    commentList.forEach((like) => {
      temp.push(like);
    });
    setCommentsArr(temp.reverse());
  }, [commentList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    ref.current.focus();

    if (!!!input.trim()) return;

    const userInfo = {
      uid: user.uid,
      name: user.name,
      jobDesc: user.jobDesc,
      avatar: user.avatar || null,
      comment: input,
    };

    updateDoc(postRef, {
      comments: arrayUnion(userInfo),
    });

    setInput("");
    ref.current.style.height = "52px";
  };

  const handleDelete = (e) => {
    const textContent =
      e.target.parentElement.previousElementSibling.textContent;

    const userInfo = {
      uid: user.uid,
      name: user.name,
      avatar: user.avatar || null,
      jobDesc: user.jobDesc,
      comment: textContent,
    };

    updateDoc(postRef, {
      comments: arrayRemove(userInfo),
    });
  };

  return (
    <div className="comment__section">
      <div className="add__comment">
        <Avatar>{user.name[0].toUpperCase()}</Avatar>
        <form action="">
          <textarea
            className="input"
            ref={ref}
            value={input}
            placeholder="Add a Comment"
            onChange={(e) => {
              e.target.style.height = "52px";
              e.target.style.height = e.target.scrollHeight + "px";
              e.target.style.paddingBottom = 8 + "px";
              setInput(e.target.value);
            }}
          ></textarea>
          {!!input.trim() && (
            <button
              type="submit"
              style={{
                backgroundColor: "#0d68c3",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              Post
            </button>
          )}
        </form>
      </div>

      <ul>
        {commentsArr.map(({ name, jobDesc, comment, uid }, index) => (
          <li key={`item-${index}`}>
            <Avatar style={{ textAlign: "center" }}>{name[0]}</Avatar>

            <div className="comment__info">
              <div className="user">
                <p className="name">{name}</p>
                <p className="job__desc">{jobDesc}</p>
              </div>
              <div className="comment">{comment}</div>
              {uid === user.uid && (
                <DeleteIcon className="delete" onClick={handleDelete} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
