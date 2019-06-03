import React from "react";
import uuid from 'uuid';

import Timebox from 'Timebox';
import TimeboxCreator from "TimeboxCreator";

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
  
  
  
    showEditForm = (index, timebox) => {
      // show edit form?
  
      this.updateTimebox(index, {...timebox, title: "Updated timebox"})
    }
    
  
    updateTimebox = (indexToUpdate, updatedTimebox) => {
      this.setState(prevState => {
        const timeboxes = prevState.timeboxes.map( (timebox, index) => 
          index === indexToUpdate ? updatedTimebox : timebox
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
          {this.state.timeboxes.map((timebox, index)=>{
            return <Timebox 
                      key={index} 
                      title={timebox.title} 
                      totalTimeInMinutes={timebox.totalTimeInMinutes}
                      onDelete={() => this.removeTimebox(index)}
                      onEdit={() => this.showEditForm(index, timebox)}
                    />
          })}
          
        </>
      ) 
      
    }
  
}

export default TimeboxList;