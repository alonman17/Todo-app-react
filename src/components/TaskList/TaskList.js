import React from "react";
import "./TaskList.css";
import AddTask from "../AddTask/AddTask";
import Task from "../SingleTask/Task.js";
import { useState, useEffect } from "react";
import TaskFooter from "../TaskFooter/TaskFooter";
import { nanoid } from "nanoid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { deleteTodoDb, addTodoDb, updateTodoDb, clearCompletedDB } from "../../DBHandlers";
const TaskList = () => {
  const [Todos, setTodos] = useState([]);
  const [Filter, setFilter] = useState("all");

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/Task/all");
    const data = await response.json();
    setTodos(data.Tasks);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = (content) => {
    const todo = {
      id: nanoid(),
      content: content,
      done: false,
    };
    const newTodos = [...Todos, todo];
    setTodos(newTodos);
    addTodoDb(todo);
  };
  const deleteTodo = (id) => {
    const newTodos = Todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    deleteTodoDb(id);
  };
  const changeTodoStatus = (id) => {
    const i = Todos.findIndex((Todo) => Todo.id === id);
    const newTodos = [...Todos];
    newTodos[i].done = !Todos[i].done;
    setTodos(newTodos);
    updateTodoDb(newTodos[i]);
  };

  const clearCompleted = () => {
    clearCompletedDB(Todos.filter((Todo) => Todo.done));
    const newTodos = Todos.filter((Todo) => !Todo.done);
    setTodos(newTodos);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const newTodos = Array.from(Todos);
    const [reorderdTodos] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, reorderdTodos);

    setTodos(newTodos);
  }

  const changeFilterHandle = (filter) => {
    setFilter(filter);
    if (filter === "all") return Todos;
    if (filter === "active") return Todos.filter((todo) => todo.done === false);
    if (filter === "completed") return Todos.filter((todo) => todo.done === true);
  };
  return (
    <div className="MainApp">
      <AddTask addTodo={addTodo} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dropableTasks">
          {(provided) => (
            <ul className="List" {...provided.droppableProps} ref={provided.innerRef}>
              {changeFilterHandle(Filter).map((Todo, index) => (
                <Task id={Todo.id} content={Todo.content} done={Todo.done} handleDelete={deleteTodo} HandleStatusChange={changeTodoStatus} index={index} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <TaskFooter Todos={Todos} clearCompleted={clearCompleted} handleFilterChange={changeFilterHandle} />
    </div>
  );
};

export default TaskList;
