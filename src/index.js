import React from "react";
import ReactDOM from "react-dom";
import uuid from 'uuid';

import "./styles.css";

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

function TimeboxEditor(props){
    const {
      title, 
      totalTimeInMinutes, 
      onTitleChange, 
      onTotalTimeInMinutesChange,
      onConfirm,
      isEditable,
    } = props;
    return (
      <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
        <label>
          Co robisz?
          <input 
            disabled={!isEditable} 
            value={title} 
            type="text" 
            onChange = {onTitleChange} />
        </label>
        <br />
        <label>
          Ile minut?
          <input 
            disabled={!isEditable} 
            value={totalTimeInMinutes} 
            type="number" 
            onChange = {onTotalTimeInMinutesChange} />
        </label>
        <br />
        <button disabled={!isEditable} onClick={onConfirm} >Zatwierdź zmiany</button>
      </div>
    );
  }


class EditableTimebox extends React.Component{

  state={
    title: "ucze sie wyciagac stan w gore",
    totalTimeInMinutes: 15,
    isEditable: true 
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value})
  }

  handleTotalTimeInMinutes = (event) => {
    this.setState({ totalTimeInMinutes: event.target.value})
  }
 
  handleConfirm = () => {
    this.setState({isEditable: false})
  }

  handleEdit = () => {
    this.setState({ isEditable: true });
  }

  clamp(num, minNum, maxNum){
    return Math.min(
        Math.max(minNum, num),
        maxNum
    )
  }

  render(){
    const {title, totalTimeInMinutes, isEditable } = this.state;
  
    return (
      <React.Fragment>
        
        <TimeboxEditor 
          title={title} 
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable = {isEditable}
          onConfirm = {this.handleConfirm}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange ={this.handleTotalTimeInMinutes}   
         
          />          
        <CurrentTimebox
          isEditable={isEditable}  
          title={title} 
          totalTimeInMinutes={totalTimeInMinutes}
          onEdit={this.handleEdit}          
          />
      </React.Fragment>
    )
  }
}



function TimeboxCreator({onCreate}){
  
  return (
    <div className='TimeboxCreator'>
      <label>
        Co robisz?
        <input />
      </label>
      <br />
      <label>
        Ile minut?      
      <input />
      </label>
      <br />

      <button onClick={onCreate}>Dodaj timebox</button>
    </div>
  );
}

class TimeboxList extends React.Component{
  state = {
    timeboxes : [
       {id: uuid.v4(),title: "ucze sie 1", totalTimeInMinutes : 2},
       {id: uuid.v4(),title: "jajko na miekko", totalTimeInMinutes : 5},
       {id: uuid.v4(),title: "jajko na twardo", totalTimeInMinutes : 8},       
    ],
    cokowiek : 123
  }

  addTimebox = (timebox) => {
    this.setState( prevState => {
      
      // this should not be done as react might not recognize changes to the state
      //prevstat.timeboxes.push(timebox); 
      
      // use that instead:
      const timeboxes = [timebox, ...prevState.timeboxes];
      console.log(timeboxes);
      
      // here return whole state object otherwise it won't work
      console.log(`prevState ${prevState.toString()}`);
      console.log(prevState);
      return { ...prevState, timeboxes };
    })
  }
  
  removeTimebox = (indexToRemove) => {
    this.setState(prevState => {
        const timeboxes = prevState.timeboxes.filter((timebox, index) => index !== indexToRemove);
        return {timeboxes};
    })
  }

  updateTimebox = (indexToUpdate, updatedTimebox) => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.map( (timebox, index) => 
        index === indexToUpdate ? updatedTimebox : timebox
      )
      return {timeboxes};
    }) 
  }

  

  handleCreate = () => {
    console.log("Tworze nowy timebox"); 
    this.addTimebox( { id: uuid.v4(), title: "tytul", totalTimeInMinutes: 12 })
  }

  render(){
    return (
      <>   
        <TimeboxCreator onCreate={this.handleCreate} />        
        {this.state.timeboxes.map(function(timebox, index) {
          return <Timebox 
                    key={index} 
                    title={timebox.title} 
                    totalTimeInMinutes={timebox.totalTimeInMinutes}
                    onDelete={() => this.removeTimebox(index)}
                    onEdit={() => this.updateTimebox(index, {...timebox, title: "Updated timebox"})}
                  />
        }.bind(this))}
        
      </>
    ) 
    
  }

}


function Timebox({title, totalTimeInMinutes, onDelete, onEdit }){
    return(
      <>
        <div className="Timebox">
          <h3>{title} - {totalTimeInMinutes} min.</h3>
          
          <button onClick={onDelete}>Usuń</button>
          <button onClick={onEdit}>Zmien</button>
        </div> 
      
      </>
    )
}


function App() {
  return (
    <div className="App">
     <TimeboxList />
    </div>
  );
}

const rootElement = document.getElementById("root");

ReactDOM.render(
  <div>
    <App />
  </div>,
  rootElement
);
