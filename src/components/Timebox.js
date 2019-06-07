import React from "react";
import LocalEditor from "./LocalEditor";

class Timebox extends React.Component {
  
    state = {
      title: this.props.title,
      totalTimeInMinutes: this.props.totalTimeInMinutes,
      showForm: false
    }
  
    handleValuesInParent = (title, totalTimeInMinutes) =>{
      this.setState({title, totalTimeInMinutes});
    }
    
    render() {
      return(
        <>
          <div className="Timebox">
            <h3>{this.state.title} - {this.state.totalTimeInMinutes} min.</h3>
  
            <button onClick={this.props.onDelete}>Usuń</button>
            <button onClick={this.props.onEdit}>Zmien</button>
  
            <LocalEditor 
              handleValues={this.handleValuesInParent} 
              isFormVisible={this.state.isFormVisible} 
              title={this.props.title} 
              totalTimeInMinutes={this.props.totalTimeInMinutes} />
  
          </div> 
        
        </>
      )
    }
  }
  
  export default Timebox;