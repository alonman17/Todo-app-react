import React from "react";
import Checked from "../../images/icon-check.svg";
import Delete from "../../images/icon-cross.svg";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
const Task = ({ id, content, done, handleDelete, HandleTaskChange, index, HandleEdit }) => {
  const [tContent, settContent] = useState(content);
  const onDelete = () => {
    handleDelete(id);
  };
  const onChange = (statusChange) => {
    if (statusChange) done = !done;
    const newTodo = {
      id: id,
      content: tContent,
      done: done,
    };
    HandleTaskChange(newTodo);
  };
  const [edit, setedit] = useState(false);
  const textChange = (event) => {
    settContent(event.target.value);
  };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <li className="Task" {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
          <div className="Left-side">
            {done ? <img src={Checked} className="checked logo" onClick={onChange} /> : <span className="status" onClick={onChange} />}
            <p>
              {!edit ? (
                tContent
              ) : (
                <div>
                  <input type="text" defaultValue={tContent} className="task-edit" onChange={textChange}></input>
                </div>
              )}
            </p>
          </div>
          <div>
            {!edit ? (
              <AiOutlineEdit className="logo" onClick={() => setedit(!edit)} />
            ) : (
              <MdDone
                className="logo"
                onClick={function () {
                  onChange(false);
                  setedit(!edit);
                }}
              />
            )}
            <img src={Delete} className="delete logo" onClick={onDelete}></img>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
