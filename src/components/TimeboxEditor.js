import React from "react";

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

  export default TimeboxEditor;