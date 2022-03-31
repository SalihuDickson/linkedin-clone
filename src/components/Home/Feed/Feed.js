import "./Feed.css";
import { useState, useEffect, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import YouTubeIcon from "@material-ui/icons/YouTube";
import EventIcon from "@material-ui/icons/Event";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Post from "./Post/Post";
import { postsRef, postsQuery } from "../../../firebase";
import { onSnapshot, addDoc, serverTimestamp } from "@firebase/firestore";
import { useSelector } from "react-redux";
import useClickedOutside from "../../../hooks/useClickedOutside";
import CloseIcon from "@material-ui/icons/Close";
import CreatePost from "./CreatePost/CreatePost";

const Feed = () => {
  const photoRef = useRef();
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [enterSrcVisible, setEnterSrcVisible] = useState(false);
  const [sortVisible, setSortVisible, sortRef] = useClickedOutside(false);
  const [createVisible, setCreateVisible, createRef, createClickable] =
    useClickedOutside(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (!createVisible) {
      setImageSrc("");
      document.querySelector("html").style.overflow = "scroll";
    } else if (createVisible) {
      window.scrollTo(0, 0);
      document.querySelector("html").style.overflow = "hidden";
    }
  }, [createVisible]);

  useEffect(() => {
    let isMounted = true;

    const subSnapshot = onSnapshot(postsQuery, (snapshot) => {
      if (isMounted) {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    });

    return () => {
      isMounted = false;
      subSnapshot();
    };
  }, []);

  return (
    <div className="feed">
      <div className="createPosts">
        {createVisible && (
          <CreatePost
            createRef={createRef}
            setCreateVisible={setCreateVisible}
            createClickable={createClickable}
            setImgSrc={setImageSrc}
            imgSrc={imageSrc}
            enterSrcVisible={enterSrcVisible}
            setEnterSrcVisible={setEnterSrcVisible}
          />
        )}
        <div className="createPosts__text">
          <Avatar
            className="avatar createPosts__avatar"
            style={{ textAlign: "center", fontSize: 20 }}
          >
            {user.name[0]}
          </Avatar>
          <div
            className="input"
            value=""
            onClick={() => {
              setCreateVisible(true);
            }}
          >
            start a post
          </div>
        </div>
        <div className="create__post-icons icons">
          <div className="feed__icon" onClick={() => photoRef.current.click()}>
            <input
              type="file"
              onChange={(e) => {
                setImageSrc(e.target.files[0]);
                setCreateVisible(true);
              }}
              name=""
              id=""
              accept="image/*"
              ref={photoRef}
              style={{ display: "none" }}
            />
            <PhotoSizeSelectActualIcon style={{ color: "#70b5f9" }} />
            <p>Photo</p>
          </div>
          <div
            className="feed__icon"
            onClick={() => {
              setCreateVisible(true);
              setEnterSrcVisible(true);
            }}
          >
            <YouTubeIcon style={{ color: "#7fc15e" }} />
            <p>Video</p>
          </div>
          <div className="feed__icon">
            <EventIcon style={{ color: "#e7a33e" }} />
            <p>Event</p>
          </div>
          <div className="feed__icon">
            <NoteAddIcon style={{ color: "#fc9295" }} />
            <p>Write Article</p>
          </div>
        </div>
      </div>

      <div className="sort__posts">
        <div className="line"></div>
        <div className="sort__text">
          Sort by:{" "}
          <div className="sort">
            <span
              onClick={() => {
                setSortVisible((state) => !state);
              }}
            >
              Top <ArrowDropDownIcon style={{ cursor: "pointer" }} />
            </span>
            {sortVisible && (
              <div className="sort__options container" ref={sortRef}>
                <div className="option">Top</div>
                <div className="option">Recent</div>
              </div>
            )}
          </div>{" "}
        </div>
      </div>

      <div className="posts">
        {posts.map(
          ({
            id,
            data: {
              userId,
              name,
              jobDesc,
              postText,
              imgSrc,
              videoSrc,
              avatar,
              likes,
              comments,
            },
          }) => (
            <Post
              key={id}
              postId={id}
              userId={userId}
              name={name}
              jobDesc={jobDesc}
              imgSrc={imgSrc}
              videoSrc={videoSrc}
              text={postText}
              avatar={avatar}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
