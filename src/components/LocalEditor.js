import React from "react";

class LocalEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
      username : ''
    }

    handleSave = (event) => {     
      this.props.handleValues(this.state.title, this.state.totalTimeInMinutes);  
    }
  
    handleCancel = (event) => {
      // ?
    }

    updateInput = (event) => { 
      this.setState({title : event.target.value})
    }

    updateTotalTimeInMinutes = (event) => {
      this.setState({totalTimeInMinutes: event.target.value})
    }
      
    render() {
      return(
        <React.Fragment>
          <div className={`hiddenTimeboxEditor ${this.props.showForm ? "" : "hidden"}`}>
          <label>Change title</label>
              <input defaultValue={this.props.title} onChange={this.updateInput} type="text" />
          <br />
          <label>minutes</label>
              <input defaultValue={this.props.totalTimeInMinutes} onChange={this.updateTotalTimeInMinutes} type="number" />
          <br />
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.handleCancel}>Cancel</button>

        </div>
      </React.Fragment>
      )

    }
}

export default LocalEditor;