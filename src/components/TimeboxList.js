import React from "react";
import uuid from 'uuid';

import Timebox from './Timebox';
import TimeboxCreator from "./TimeboxCreator";

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
        const timeboxes = [timebox, ...prevState.timeboxes];
        return { ...prevState, timeboxes };
      })
    }
    
    removeTimebox = (idToRemove) => {
      this.setState(prevState => {
          const timeboxes = prevState.timeboxes.filter((timebox) => timebox.id !== idToRemove);
          return {timeboxes};
      })
    }

    showEditForm = (timebox) => {
      this.updateTimebox({...timebox, title: "Updated timebox"})
    }
  
    updateTimebox = (updatedTimebox) => {
      this.setState(prevState => {
        const timeboxes = prevState.timeboxes.map( (oldTimebox) => 
          oldTimebox.id === updatedTimebox.id ? updatedTimebox : oldTimebox
        )
        return {timeboxes};
      }) 
    }
  
    handleCreate = (newTimeboxModel) => {
      console.log("Tworze nowy timebox"); 
      this.addTimebox(newTimeboxModel)
    }
  
    render(){
      return (
        <>   
          <TimeboxCreator onCreate={this.handleCreate} />                  
          {this.state.timeboxes.map((timebox)=>{
            return <Timebox 
                      key={timebox.id} 
                      title={timebox.title} 
                      totalTimeInMinutes={timebox.totalTimeInMinutes}
                      onDelete={() => this.removeTimebox(timebox.id)}
                      onEdit={() => this.showEditForm(timebox.id, timebox)}
                    />
          })}
          
        </>
      ) 
      
    }
  
}

export default TimeboxList;