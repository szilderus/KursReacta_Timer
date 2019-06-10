import React from "react";
import TimeboxList from './TimeboxList';
import EditableTimebox from './EditableTimebox';

export default class App extends React.Component    
{
//   constructor(props) {
//     super(props);
//   }

  render() {
    return (
      <div className="App">
        <TimeboxList />		
        <EditableTimebox />
      </div>
    );
  }
}
