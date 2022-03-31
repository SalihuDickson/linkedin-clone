import React, { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import useClickedOutside from "../../../../../hooks/useClickedOutside";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "../../../../../firebase";

const MoreBtn = ({ setEditVisible, postId }) => {
  const [moreVisible, setMoreVisible, moreRef] = useClickedOutside(false);
  // const [moreClicked, setMoreClicked] = useState(false);

  const handleDelete = () => {
    deleteDoc(doc(db, "posts", postId));
  };

  return (
    <div className="more">
      <span>
        <MoreHorizIcon
          style={{ fontSize: 22.5 }}
          onClick={() => {
            setMoreVisible((state) => !state);
          }}
        />
      </span>
      {moreVisible && (
        <div className="more__content container" ref={moreRef}>
          <div
            className="more__icon icon"
            onClick={() => {
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
  );
};

export default MoreBtn;
