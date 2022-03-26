import React from "react";
import "../TaskList/TaskList.css";
import "../AddTask/AddTask.css";
import { useState } from "react";
const AddTask = ({ addTodo }) => {
  const [TaskText, setTaskText] = useState("");

  const textChange = (event) => {
    if (event.key === "Enter") onAdd(event);
    else setTaskText(event.target.value);
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
      <input type="text" placeholder="Enter your task..." className="userTask" onKeyDown={textChange} onChange={textChange} value={TaskText}></input>
    </div>
  );
};

export default AddTask;
