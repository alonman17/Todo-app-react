import React from "react";
import Checked from "../../images/icon-check.svg";
import Delete from "../../images/icon-cross.svg";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
const Task = ({ id, content, done, handleDelete, HandleStatusChange, index, HandleEdit }) => {
  const onDelete = (event) => {
    handleDelete(id);
  };
  const onChange = () => {
    HandleStatusChange(id);
  };

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li className="Task" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          <div className="Left-side">
            {done ? <img src={Checked} className="checked logo" onClick={onChange} /> : <span className="status" onClick={onChange} />}
            <p>{content}</p>
          </div>
          <img src={Delete} className="delete logo" onClick={onDelete}></img>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
