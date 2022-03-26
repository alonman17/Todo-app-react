const addTodoDb = (object) => {
  console.log(JSON.stringify(object));
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  };
  fetch("http://localhost:8080/api/Task/add", requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
const deleteTodoDb = (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(id),
  };
  fetch(`http://localhost:8080/api/Task/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
};
const updateTodoDb = (object) => {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(object),
  };
  fetch(`http://localhost:8080/api/Task/edit/${object.id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const clearCompletedDB = (toDelete) => {
  toDelete.forEach((todo) => {
    deleteTodoDb(todo.id);
  });
};
export { addTodoDb, deleteTodoDb, updateTodoDb, clearCompletedDB };
