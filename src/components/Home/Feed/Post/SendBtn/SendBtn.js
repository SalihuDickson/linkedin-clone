import React from "react";
import TelegramIcon from "@material-ui/icons/Telegram";
import useWindowSize from "../../../../../hooks/useWindowSize";

const SendBtn = () => {
  const { width } = useWindowSize();

  return (
    <div className="feed__icon no__functionality" title="doesn't work">
      <TelegramIcon />
      {width > 440 && <p>Send</p>}
    </div>
  );
};

export default SendBtn;
