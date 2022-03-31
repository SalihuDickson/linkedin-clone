import React from "react";
import { useRef, useState, useEffect } from "react";

const useClickedOutside = (initialValue) => {
  const ref = useRef(null);
  const clickable = useRef(null);
  const [visible, setVisible] = useState(initialValue);

  const handleClickedOutside = (e) => {
    if (clickable.current && clickable.current.contains(e.target)) return;
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickedOutside, true);

    return () => {
      document.removeEventListener("click", handleClickedOutside, true);
    };
  }, [ref]);

  return [visible, setVisible, ref, clickable];
};

export default useClickedOutside;
