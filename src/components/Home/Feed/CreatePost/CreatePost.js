import React from "react";
import "./CreatePost.css";
import { addDoc, serverTimestamp } from "@firebase/firestore";
import { useEffect, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import YouTubeIcon from "@material-ui/icons/YouTube";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import { postsRef } from "../../../../firebase";
import ReactPlayer from "react-player";
const CreatePosts = ({
  createRef,
  setCreateVisible,
  createClickable,
  imgSrc,
  setImgSrc,
  enterSrcVisible,
  setEnterSrcVisible,
}) => {
  const textAreaRef = useRef();
  const photoRef = useRef();
  const srcInputRef = useRef();
  const [input, setInput] = useState("");
  const [srcInput, setSrcInput] = useState("");

  const [image, setImage] = useState("");
  const [videoSrc, setVideoSrc] = useState("");
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  useEffect(() => {
    if (!enterSrcVisible) {
      textAreaRef.current.focus();
      setSrcInput("");
    } else srcInputRef.current.focus();
  }, [enterSrcVisible]);

  useEffect(() => {
    if (imgSrc.size >= 1048487) {
      alert("The size of your file is greater than 1mb please choose another");
      setImgSrc(videoSrc);
    } else if (imgSrc) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImage(reader.result);
      });

      reader.readAsDataURL(imgSrc);
    } else if (!imgSrc) {
      setImage("");
    }
  }, [imgSrc]);

  const handlePostSubmit = (e) => {
    console.log("there");
    e.preventDefault();
    textAreaRef.current.focus();

    if (!!!input.trim() && !image && !videoSrc) {
      console.log("leaving");
      return;
    }

    addDoc(postsRef, {
      userId: user.uid,
      name: user.name,
      jobDesc: user.jobDesc,
      postText: input || null,
      imgSrc: imgSrc ? image : null,
      videoSrc: videoSrc || null,
      avatar: "",
      likes: [],
      comments: [],
      timestamp: serverTimestamp(),
    }).catch((err) => {
      console.log(err);
      alert("error, please refresh");
    });

    setCreateVisible(false);
    setInput(" ");
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
    <div className="create__post">
      {enterSrcVisible && (
        <div className="enter__src" ref={createClickable}>
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
      <div className="post__box" ref={createRef}>
        <div className="heading">
          <p>Create Post</p>
          <CloseIcon
            onClick={() => {
              setCreateVisible(false);
            }}
            style={{ fontSize: 32, color: "#6e6e6e", cursor: "pointer" }}
          />
        </div>

        <form onSubmit={handlePostSubmit}>
          <div className="avatar">
            <Avatar style={{ textAlign: "center", verticalAlign: "center" }}>
              {user.name[0]}
            </Avatar>
            <p className="name">{user.name}</p>
          </div>
          <div className="post" onClick={() => textAreaRef.current.focus()}>
            <textarea
              placeholder="what do you want to talk about"
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
                  src={image}
                  alt="Image Preview"
                  className="image__preview"
                />
              )}
            </div>
          )}
        </form>

        <div className="footer">
          <div className="create__post-icons icons">
            <div
              className={`${
                (imgSrc || videoSrc) && "no__functionality"
              } create__icon`}
              onClick={() => {
                !imgSrc && !videoSrc && photoRef.current.click();
              }}
            >
              <input
                type="file"
                onChange={(e) => {
                  setImgSrc(e.target.files[0]);
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
              className={`${
                (imgSrc || videoSrc) && "no__functionality"
              } create__icon`}
              onClick={() => !videoSrc && !imgSrc && setEnterSrcVisible(true)}
            >
              <YouTubeIcon fontSize="large" />
            </div>
            <div
              className={`${
                (imgSrc || videoSrc) && "no__functionality"
              } create__icon`}
            >
              <NoteAddIcon fontSize="large" />
            </div>
          </div>

          <button
            style={
              !!input.trim() || imgSrc || videoSrc
                ? {
                    backgroundColor: "#0d68c3",
                    color: "#fff",
                    cursor: "pointer",
                  }
                : null
            }
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePosts;
