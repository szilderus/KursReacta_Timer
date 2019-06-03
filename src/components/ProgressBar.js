import React from "react";

function ProgressBar({ className = "", percent = 7, trackRemaining = false }) {
    var styles = {
      width: `${percent}%`
    };
  
    var progressBarBackwards = {
      display: "flex",
      justifyContent: "flex-end"
    };
  
    var stylesBackwards = {
      width: `${100 - percent}%`
    };
  
    // var trackRemaining
    if (trackRemaining) {
      return (
        <div className={"ProgressBar " + className} style={progressBarBackwards}>
          <div style={stylesBackwards} />
        </div>
      );
    } else {
      return (
        <div className={"ProgressBar " + className}>
          <div style={styles} />
        </div>
      );
    }
  }

export default ProgressBar;