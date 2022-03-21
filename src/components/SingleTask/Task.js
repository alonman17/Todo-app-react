import React from "react";
import Checked from "../../images/icon-check.svg";
import Delete from "../../images/icon-cross.svg";
const Task = () => {
  return (
    <div className="Task">
      <div className="Left-side">
        <img src={Checked} className="checked logo"></img>
        <p>This is a test</p>
      </div>
      <img src={Delete} className="delete logo"></img>
    </div>
  );
};

export default Task;
