import "./EditPost.css";
import { useRef, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import YouTubeIcon from "@material-ui/icons/YouTube";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import EditIcon from "@material-ui/icons/Edit";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../../../../../firebase";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

const EditPost = ({
  editRef,
  setEditVisible,
  postId,
  text,
  prevImgSrc,
  prevVideoSrc,
  editClickableRef,
}) => {
  const textAreaRef = useRef();
  const photoRef = useRef();
  const srcInputRef = useRef();
  const [enterSrcVisible, setEnterSrcVisible] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [image, setImage] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const [srcInput, setSrcInput] = useState("");
  const [input, setInput] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    setInput(text);
    setImgSrc(prevImgSrc);
    setVideoSrc(prevVideoSrc);
    setSrcInput(prevVideoSrc);
    textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    if (!enterSrcVisible) {
      textAreaRef.current.focus();
      setSrcInput(videoSrc);
    } else srcInputRef.current.focus();
  }, [enterSrcVisible]);

  useEffect(() => {
    if (image) {
      if (image.size >= 1048487) {
        alert(
          "The size of your file is greater than 1mb please choose another"
        );
        setImgSrc("");
      } else {
        const reader = new FileReader();

        reader.addEventListener("load", () => {
          setImgSrc(reader.result);
        });

        reader.readAsDataURL(image);
      }
    } else if (typeof image === "undefined") {
      return;
    }
  }, [image]);

  const handleEdit = (e) => {
    console.log("here");
    e.preventDefault();
    textAreaRef.current.focus();

    if (!!!input.trim() && !imgSrc && !videoSrc) {
      return;
    }

    updateDoc(doc(db, "posts", postId), {
      postText: input || null,
      imgSrc: imgSrc || null,
      videoSrc: videoSrc || null,
    });

    setEditVisible(false);
  };

  const isValidUrl = (str) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    return !!urlPattern.test(str);
  };

  const handleSrcSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(srcInput)) {
      alert("This is not a valid url please review it an try again");
      return;
    }

    setVideoSrc(srcInput);
    setEnterSrcVisible(false);
  };

  return (
    <div className="edit__post" ref={editRef}>
      {enterSrcVisible && (
        <div className="enter__src" ref={editClickableRef}>
          <form action="" onSubmit={handleSrcSubmit}>
            <div className="close" onClick={() => setEnterSrcVisible(false)}>
              <CloseIcon />
            </div>
            <p>Enter the Video URL</p>
            <input
              type="text"
              className="input"
              ref={srcInputRef}
              value={srcInput}
              spellCheck="false"
              style={!isValidUrl(srcInput) ? { color: "#FF0000" } : null}
              onChange={(e) => setSrcInput(e.target.value)}
            />
          </form>
        </div>
      )}
      <div className="post__box">
        <div className="heading">
          <p>Edit Post</p>
          <CloseIcon
            onClick={() => {
              setEditVisible(false);
            }}
            style={{ fontSize: 32, color: "#6e6e6e", cursor: "pointer" }}
          />
        </div>

        <form onSubmit={handleEdit}>
          <div className="avatar">
            <Avatar style={{ textAlign: "center", verticalAlign: "center" }}>
              {user.name[0]}
            </Avatar>
            <p className="name">{user.name}</p>
          </div>
          <div className="post" onClick={() => textAreaRef.current.focus()}>
            <textarea
              className="input"
              ref={textAreaRef}
              value={input}
              onChange={(e) => {
                e.target.style.height = "0px";
                e.target.style.height = e.target.scrollHeight + "px";
                setInput(e.target.value);
              }}
            ></textarea>
          </div>

          {(videoSrc || imgSrc) && (
            <div className="preview">
              <div className="options">
                <div
                  className="option"
                  onClick={() => {
                    imgSrc
                      ? photoRef.current.click()
                      : videoSrc && setEnterSrcVisible(true);
                  }}
                >
                  <EditIcon />
                </div>
                <div
                  className="option"
                  onClick={() => {
                    setImage("");
                    setImgSrc("");
                    setVideoSrc("");
                  }}
                >
                  <CloseIcon />
                </div>
              </div>
              {videoSrc && (
                <ReactPlayer
                  width="480px"
                  url={videoSrc}
                  onError={() => {
                    setVideoSrc("");
                    alert(
                      "The url you entered is invalid please enter another"
                    );
                    setEnterSrcVisible(true);
                  }}
                />
              )}
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="Image Preview"
                  className="image__preview"
                />
              )}
            </div>
          )}
        </form>

        <div className="footer">
          <div className="edit__post-icons icons">
            <div
              className="edit__icon"
              onClick={() => {
                !imgSrc && !videoSrc && photoRef.current.click();
              }}
              className={(imgSrc || videoSrc) && "no__functionality"}
            >
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                name=""
                id=""
                accept="image/*"
                ref={photoRef}
                style={{ display: "none" }}
              />
              <PhotoSizeSelectActualIcon fontSize="large" />
            </div>
            <div
              className="edit__icon"
              className={(imgSrc || videoSrc) && "no__functionality"}
              onClick={() => !videoSrc && !imgSrc && setEnterSrcVisible(true)}
            >
              <YouTubeIcon fontSize="large" />
            </div>
            <div className="edit__icon">
              <NoteAddIcon fontSize="large" />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleEdit}
            style={
              !!input.trim() || imgSrc || videoSrc
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
      </div>
    </div>
  );
};

export default EditPost;
