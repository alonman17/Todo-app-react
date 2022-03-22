import React from "react";
import Checked from "../../images/icon-check.svg";
import Delete from "../../images/icon-cross.svg";
import { useState } from "react";
const Task = ({ id, content, done, handleDelete, HandleStatusChange }) => {
  const [Status, setStatus] = useState(done);
  const onDelete = (event) => {
    handleDelete(id);
  };
  const onChange = () => {
    setStatus(!Status);
    HandleStatusChange(id);
  };

  return (
    <div className="Task">
      <div className="Left-side">
        {Status ? <img src={Checked} className="checked logo" onClick={onChange} /> : <span className="status" onClick={onChange} />}
        <p>{content}</p>
      </div>
      <img src={Delete} className="delete logo" onClick={onDelete}></img>
    </div>
  );
};

export default Task;
