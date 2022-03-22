import React from "react";
import "../TaskList/TaskList.css";
import "../AddTask/AddTask.css";
import { useState } from "react";
const AddTask = ({ addTodo }) => {
  const [TaskText, setTaskText] = useState("");

  const textChange = (event) => {
    setTaskText(event.target.value);
  };
  const onAdd = (event) => {
    if (!TaskText) {
      alert("Task cannot be empty");
      return;
    }
    addTodo(TaskText);
    setTaskText("");
  };
  return (
    <div className="Task">
      <input type="text" placeholder="Enter your task..." className="userTask" onChange={textChange} value={TaskText}></input>
      <button onClick={onAdd} className="addButton">
        Add
      </button>
    </div>
  );
};

export default AddTask;
