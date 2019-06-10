import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

class CurrentTimebox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
        elapsedTimeInSeconds: 0
      };
  
      this.handleStart = this.handleStart.bind(this);
      this.handleStop = this.handleStop.bind(this);
      this.togglePause = this.togglePause.bind(this);
    }
  
    handleStart(event) {
      this.setState({
        isRunning: true
        //elapsedTimeInSeconds: 15* 60 + 20
      });
  
      this.startTimer();
    }
  
    startTimer() {
      this.intervalId = window.setInterval(
        // this is arrow function equivalent to  // function(){  }.bind(this)
        () => {
          this.setState(prevState => ({
            elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1
          }));
        },
        1000
      );
    }
  
    stopTimer() {
      window.clearInterval(this.intervalId);
    }
  
    handleStop(event) {
      this.setState({
        isRunning: false,
        isPaused: false,
        pausesCount: 0,
        elapsedTimeInSeconds: 0
      });
      this.stopTimer();
    }
  
    togglePause() {
      this.setState(function(prevState) {
        var isPaused = !prevState.isPaused;
  
        if (isPaused) {
          this.stopTimer();
        } else {
          this.startTimer();
        }
  
        return {
          isPaused: !prevState.isPaused,
          pausesCount: isPaused
            ? prevState.pausesCount + 1
            : prevState.pausesCount
        };
      });
    }
  
    render() {
      const { isPaused, isRunning, pausesCount, elapsedTimeInSeconds } = this.state;
      const { title, totalTimeInMinutes, isEditable, onEdit} = this.props;    
      //console.log('totalTimeInMinutes ' + totalTimeInMinutes);
      const totalTimeInSeconds =  totalTimeInMinutes * 60;
      const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
      const minutesLeft = Math.floor(timeLeftInSeconds / 60);
      const secondsLeft = Math.floor(timeLeftInSeconds % 60);
      const progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100;
  
      return (
        <div className= {`Timebox ${isEditable ? "inactive" : ""}`}>
          <h1>{title}</h1>
          <Clock
            className={isPaused ? "inactive" : ""}
            hours="-33"
            minutes={minutesLeft}
            seconds={secondsLeft}
            miliseconds="111"
          />
          <ProgressBar
            className={isPaused ? "inactive" : ""}
            percent={progressInPercent}
            trackRemaining="true"
          />
  
          <button onClick={onEdit} disabled={isEditable}>Edytuj</button> 
          <button onClick={this.handleStart} disabled={isRunning}>Start</button>
          <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
          <button onClick={this.togglePause}>Pauzuj</button>
  
          Liczba przerw: {pausesCount}
        </div>
      );
    }
  }

  export default CurrentTimebox;