import "./EditPost.css";
import { useRef, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import YouTubeIcon from "@material-ui/icons/YouTube";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { updateDoc, doc, getDoc } from "@firebase/firestore";
import { db } from "../../../../../firebase";
import { useSelector } from "react-redux";

const EditPost = ({ editRef, setEditVisible, postId }) => {
  const ref = useRef();
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    ref.current.focus();
    window.scrollTo(0, 0);
    document.querySelector("html").style.overflow = "hidden";

    getDoc(doc(db, "posts", postId))
      .then((post) => {
        setInput(post.data().postText);
        ref.current.style.height = "0px";
        ref.current.style.height = ref.current.scrollHeight + "px";
      })
      .catch((err) => {
        console.log(err);
        alert("error, please refresh");
      });
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!input) {
      ref.current.focus();
      return;
    }

    updateDoc(doc(db, "posts", postId), {
      postText: input,
    }).then(() => {
      setEditVisible(false);
    });
  };

  return (
    <div className="edit__post">
      <form ref={editRef} onSubmit={handleEdit}>
        <div className="heading">
          <p>Edit Post</p>
          <CloseIcon
            onClick={() => {
              setEditVisible(false);
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
        <div className="post" onClick={() => ref.current.focus()}>
          <textarea
            className="input"
            ref={ref}
            value={input}
            onChange={(e) => {
              e.target.style.height = "0px";
              e.target.style.height = e.target.scrollHeight + "px";
              setInput(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="footer">
          <div className="editPosts__icons icons">
            <div className="edit__icon">
              <PhotoSizeSelectActualIcon fontSize="large" />
            </div>
            <div className="edit__icon">
              <YouTubeIcon fontSize="large" />
            </div>
            <div className="edit__icon">
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
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
