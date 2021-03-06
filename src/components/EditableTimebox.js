import React from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

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
          <div className="editableTimebox">
            <span>EditableTimebox</span>
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
            </div>
        </React.Fragment>
      )
    }
  }
  
  export default EditableTimebox;