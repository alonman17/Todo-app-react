import React from "react";
import "../TaskList/TaskList.css";
import "../AddTask/AddTask.css";
import { useState } from "react";
const AddTask = () => {
  const [TaskText, setTaskText] = useState("");
  return (
    <div className="Task">
      <input type="text" placeholder="Enter your task..." className="userTask"></input>
    </div>
  );
};

export default AddTask;
