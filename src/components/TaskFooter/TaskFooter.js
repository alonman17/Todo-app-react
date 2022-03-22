import React from "react";
import "../TaskFooter/TaskFooter.css";
const TaskFooter = ({ Todos, filterFunc, clearCompleted }) => {
  const onClickFilter = (event) => {
    console.log(event.target.value);
    filterFunc(event.target.value);
  };

  return (
    <div className="task-footer">
      <div> {Todos.filter((Todo) => !Todo.done).length} items left</div>
      <div className="footer-middle">
        <input type="radio" value="All" id="All" name="filtering" defaultChecked="checked" onClick={onClickFilter} />
        <label>All</label>
        <input type="radio" value="Completed" id="All" name="filtering" onClick={onClickFilter} />
        <label>Completed</label>
        <input type="radio" value="Active" id="All" name="filtering" onClick={onClickFilter} />
        <label>Active</label>
      </div>
      <div onClick={clearCompleted}>Clear Completed</div>
    </div>
  );
};

export default TaskFooter;
