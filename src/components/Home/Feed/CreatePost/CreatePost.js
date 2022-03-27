import React from "react";
import "./CreatePost.css";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import YouTubeIcon from "@material-ui/icons/YouTube";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { useSelector } from "react-redux";
import { postsRef } from "../../../../firebase";

const CreatePosts = ({ createRef, setCreateVisible }) => {
  const textAreaRef = useRef();
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    textAreaRef.current.focus();
    window.scrollTo(0, 0);
    document.querySelector("html").style.overflow = "hidden";
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    addDoc(postsRef, {
      userId: user.uid,
      name: user.name,
      jobDesc: user.jobDesc,
      postText: input,
      avatar: "",
      timestamp: serverTimestamp(),
    }).catch((err) => {
      console.log(err);
      alert("error, please refresh");
    });

    setCreateVisible(false);
    document.querySelector("html").style.overflow = "scroll";

    setInput(" ");
  };

  return (
    <div className="create__post">
      <form ref={createRef} onSubmit={handlePostSubmit}>
        <div className="heading">
          <p>Create Post</p>
          <CloseIcon
            onClick={() => {
              setCreateVisible(false);
              document.querySelector("html").style.overflow = "scroll";
            }}
            style={{ fontSize: 32, color: "#6e6e6e", cursor: "pointer" }}
          />
        </div>
        <div className="avatar">
          <Avatar style={{ height: 55, width: 55 }}>
            {!user.avatar && user.name[0]}
          </Avatar>
          <p className="name">{user.name}</p>
        </div>
        <div className="post" onClick={() => textAreaRef.current.focus()}>
          <textarea
            ref={textAreaRef}
            value={input}
            onChange={(e) => {
              e.target.style.height = "0px";
              e.target.style.height = e.target.scrollHeight + "px";
              setInput(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="footer">
          <div className="create__post-icons icons">
            <div className="create__icon">
              <PhotoSizeSelectActualIcon fontSize="large" />
            </div>
            <div className="create__icon">
              <YouTubeIcon fontSize="large" />
            </div>
            <div className="create__icon">
              <NoteAddIcon fontSize="large" />
            </div>
          </div>

          <button
            type="submit"
            style={
              input
                ? {
                    backgroundColor: "#0d68c3",
                    color: "#fff",
                    cursor: "pointer",
                  }
                : null
            }
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePosts;
