import React from "react";
import "../TaskFooter/TaskFooter.css";
const TaskFooter = ({ Todos, clearCompleted, handleFilterChange }) => {
  const onClickFilter = (event) => {
    handleFilterChange(event.target.value);
  };

  return (
    <div className="task-footer">
      <div> {Todos.filter((Todo) => !Todo.done).length} items left</div>
      <div className="footer-middle">
        <input type="radio" value="all" id="All" name="filtering" onClick={onClickFilter} defaultChecked="checked" />
        <label>All</label>
        <input type="radio" value="completed" id="All" name="filtering" onClick={onClickFilter} />
        <label>Completed</label>
        <input type="radio" value="active" id="All" name="filtering" onClick={onClickFilter} />
        <label>Active</label>
      </div>
      <div onClick={clearCompleted}>Clear Completed</div>
    </div>
  );
};

export default TaskFooter;
