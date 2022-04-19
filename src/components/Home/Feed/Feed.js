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
import CreatePost from "./CreatePost/CreatePost";
import useWindowSize from "../../../hooks/useWindowSize";

const Feed = () => {
  const photoRef = useRef();
  const topRef = useRef();
  const recentRef = useRef();
  const { width } = useWindowSize();

  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(0);
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

  useEffect(() => {
    handleSort();
  }, [posts]);

  const handleSort = (e) => {
    if (e) {
      if (topRef.current === e.target) {
        topRef.current.classList.add("sorted");
        recentRef.current.classList.remove("sorted");
      } else if (recentRef.current === e.target) {
        topRef.current.classList.remove("sorted");
        recentRef.current.classList.add("sorted");
      }
    }

    if (topRef.current.classList.contains("sorted")) {
      setPosts(
        posts.sort((b, a) => {
          const aRank = a.data.comments.length + a.data.likes.length;
          const bRank = b.data.comments.length + b.data.likes.length;

          return aRank - bRank;
        })
      );
    } else if (recentRef.current.classList.contains("sorted")) {
      setPosts((posts) =>
        posts.sort((b, a) => {
          if (!a.data.timestamp) return;

          return a.data.timestamp.toDate() - b.data.timestamp.toDate();
        })
      );
    }

    setValue(value + 1);
  };

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
            {width > 440 && <p>Photo</p>}
          </div>
          <div
            className="feed__icon"
            onClick={() => {
              setCreateVisible(true);
              setEnterSrcVisible(true);
            }}
          >
            <YouTubeIcon style={{ color: "#7fc15e" }} />
            {width > 440 && <p>Video</p>}
          </div>
          <div className="feed__icon no__functionality" title="doesn't work">
            <EventIcon />
            {width > 440 && <p>Event</p>}
          </div>
          <div className="feed__icon no__functionality">
            <NoteAddIcon title="doesn't work" />
            {width > 440 && <p>Write Article</p>}
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
            <div
              className="sort__options container"
              style={sortVisible ? { display: "block" } : { display: "none" }}
              ref={sortRef}
            >
              <div className="option" ref={topRef} onClick={handleSort}>
                Top
              </div>
              <div
                className="option sorted"
                ref={recentRef}
                onClick={handleSort}
              >
                Recent
              </div>
            </div>
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
              timestamp,
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
              timestamp={timestamp}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
