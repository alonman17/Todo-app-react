import React from "react";
import "./TaskList.css";
import AddTask from "../AddTask/AddTask";
import Task from "../SingleTask/Task.js";
import { useState, useEffect } from "react";
import TaskFooter from "../TaskFooter/TaskFooter";
import { nanoid } from "nanoid";
const TaskList = () => {
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("react-task-app-data"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-task-app-data", JSON.stringify(Todos));
  }, [Todos]);

  const addTodo = (content) => {
    const todo = {
      id: nanoid(),
      content: content,
      done: false,
    };
    const newTodos = [...Todos, todo];
    setTodos(newTodos);
  };
  const deleteTodo = (id) => {
    const newTodos = Todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const changeTodoStatus = (id) => {
    const i = Todos.findIndex((Todo) => Todo.id === id);
    const newTodos = [...Todos];
    newTodos[i].done = !Todos[i].done;
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    const newTodos = Todos.filter((Todo) => !Todo.done);
    setTodos(newTodos);
  };
  const filterFunc = (filter) => {};
  return (
    <div className="TaskList">
      <AddTask addTodo={addTodo} />
      {Todos.map((Todo) => (
        <Task id={Todo.id} content={Todo.content} done={Todo.done} handleDelete={deleteTodo} HandleStatusChange={changeTodoStatus} />
      ))}
      ;
      <TaskFooter Todos={Todos} filterFunc={filterFunc} clearCompleted={clearCompleted} />
    </div>
  );
};

export default TaskList;
