import React from "react";
import "./TaskList.css";
import AddTask from "../AddTask/AddTask";
import Task from "../SingleTask/Task.js";
const TaskList = () => {
  return (
    <div className="TaskList">
      <AddTask />
      <Task />
    </div>
  );
};

export default TaskList;
