import React from "react";
import { useRef, useState, useEffect } from "react";

const useClickedOutside = (initialValue) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(initialValue);

  const handleClickedOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setVisible(false);

      // just for some special cases
      document.querySelector("html").style.overflow = "scroll";
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickedOutside, true);

    return () => {
      document.removeEventListener("click", handleClickedOutside, true);
    };
  }, [ref]);

  return [visible, setVisible, ref];
};

export default useClickedOutside;
