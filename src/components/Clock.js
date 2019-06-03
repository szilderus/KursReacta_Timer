import React from "react";

function Clock({
    className = "",
    hours = 0,
    minutes = 20,
    seconds = 0,
    miliseconds = 0
  }) {
    hours = 0 > hours || hours > 59 ? 0 : hours;
    minutes = 0 > minutes || minutes > 59 ? 0 : minutes;
    seconds = 0 > seconds || seconds > 59 ? 0 : seconds;
    miliseconds = 0 > miliseconds || miliseconds > 999 ? 0 : miliseconds;
  
    return (
      <h2 className={"Clock" + className}>
        Pozostało {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}:
        {miliseconds < 10
          ? "00" + miliseconds
          : miliseconds < 100
          ? "0" + miliseconds
          : miliseconds}
      </h2>
    );
  }

  export default Clock