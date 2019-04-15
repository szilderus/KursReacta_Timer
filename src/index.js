import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function Clock({ className = "", hours = 0, minutes = 20, seconds = 0, miliseconds = 0 }) {
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
      <div className={"ProgressBar " + className}  style={progressBarBackwards}>
        <div style={stylesBackwards} />
      </div>
    );
  } else {
    return (
      <div className={"ProgressBar " + className} >
        <div style={styles} />
      </div>
    );
  }
}

class Timebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0
    };
  }

  handleStart(event) {
    this.setState({
      isRunning: true
    });
  }

  handleStop(event) {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0
    });
  }

  togglePause() {
    this.setState(
      function(prevState){

        var isPaused = !prevState.isPaused;
        return { 
          isPaused : !prevState.isPaused,
          pausesCount: isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
        }
    });
  }

  render() {
    const { isPaused, isRunning, pausesCount } = this.state;
    return (
      <div className="Timebox">
        <h1>Uczę się skrótów klawiszowych</h1>
        <Clock className={isPaused ? "inactive" : "" } hours="-33" minutes="-59" seconds="-59" miliseconds="111" />
        <ProgressBar className={isPaused ? "inactive" : "" }percent="20" trackRemaining="true" />
        <button onClick={this.handleStart.bind(this)} disabled={isRunning}>
          Start
        </button>
        <button onClick={this.handleStop.bind(this)} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={this.togglePause.bind(this)}>Pauzuj</button>Liczba przerw: {pausesCount}
      </div>
    );
  }
}

function TimeboxEditor() {
  return (
    <div className="TimeboxEditor">
      <label>
        Co robisz?
        <input value="Uczę się skrótów klawiszowych" type="text" />
      </label>
      <br />
      <label>
        Ile minut? <input value="25" type="number" />
      </label>
      <br />
      <button>Zacznij</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TimeboxEditor />
      <Timebox />
    </div>
  );
}

const rootElement = document.getElementById("root");

console.log("cos");
ReactDOM.render(
  <div>
    <App />
  </div>,
  rootElement
);
