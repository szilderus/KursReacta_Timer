import React from "react";

class TimeboxCreator extends React.Component{
  
    state={
      title: "",
      totalTimeInMinutes: ""
    }
  
    handleTitleChange = (event) => {
      this.setState({title: event.target.value});
    }
  
    handleTotalTimeInMinutesChange = (event) => {
      this.setState({totalTimeInMinutes: event.target.value});
    }
  
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreate(  
      {
        id: uuid.v4(),
        title: this.state.title, 
        totalTimeInMinutes : this.state.totalTimeInMinutes
      });
  }
  
  render(){
    return (
      <form onSubmit={this.handleSubmit} className='TimeboxCreator'>
        <label>
          Co robisz?
          <input 
            value={this.state.title} 
            onChange={this.handleTitleChange}    
            type="text"
          />
        </label>
        <br />
        <label>
          Ile minut?      
        <input 
          value={this.state.totalTimeInMinutes } 
          onChange={this.handleTotalTimeInMinutesChange}
          type="number"
        />
        </label>
        <br />
  
        <button>Dodaj timebox</button>
      </form>
    )
  }
  
  }

  export default TimeboxCreator;