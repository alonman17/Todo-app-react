const { StatusCodes } = require("http-status-codes");
const genericQueries = require("../../../../services/genericCrudQueries");

const TABLE_NAME = "Tasks";

/**
 * Used to get all existing Tasks.
 *
 * @returns relevant status code and array of all the Task objects.
 */
async function getTasks() {
  try {
    let res;
    await genericQueries.getItems(TABLE_NAME).then((queryResult) => {
      res = queryResult;
    });
    return { Tasks: res, status: StatusCodes.OK };
  } catch (err) {
    return { status: StatusCodes.BAD_REQUEST, error: err.Task };
  }
}

/**
 * Used to get a Task by id.
 *
 * @param {number} id (number representing the Task's id)
 *
 * @returns relevant status code and the wanted Task object.
 */
async function getTask(id) {
  try {
    let isExist;
    await genericQueries.isExist(TABLE_NAME, "id", id).then((queryResult) => {
      isExist = queryResult;
    });
    if (!isExist) throw new Error(`Task with this id does not exist`);

    let res;
    await genericQueries.getItem(TABLE_NAME, "id", id).then((queryResult) => {
      res = queryResult;
    });
    return { Task: res[0], status: StatusCodes.OK };
  } catch (err) {
    return { status: StatusCodes.BAD_REQUEST, error: err.Task };
  }
}

/**
 * Used to add a Task.
 *
 * @param {object} newTask (object representing the new Task object to add)}
 *
 * @returns relevant status code.
 */
async function addTask(newTask) {
  try {
    await genericQueries.insertItem(TABLE_NAME, newTask);
    return { status: StatusCodes.OK };
  } catch (err) {
    return { status: StatusCodes.BAD_REQUEST, error: err.Task };
  }
}

/**
 * Used to update a Task.
 *
 * @param {object} id (string representing the Task's id)
 * @param {object} change (object representing the properties to change)
 *
 * @returns relevant status code.
 */
async function updateTask(id, change) {
  try {
    if (Object.keys(change).length === 0) throw new Error(`The changed object was sent empty`);
    let isExist;
    await genericQueries.isExist(TABLE_NAME, "id", id).then((queryResult) => {
      isExist = queryResult;
    });
    if (!isExist) throw new Error(`Task with the id- ${id} does not exist`);
    await genericQueries.updateSpecificItem("id", id, TABLE_NAME, change);
    return { status: StatusCodes.OK };
  } catch (error) {
    return { status: StatusCodes.BAD_REQUEST, error: error.Task };
  }
}

/**
 * Used to delete a Task.
 *
 * @param {number} id (number representing the Task's id)
 *
 * @returns relevant status code.
 */
async function deleteTask(id) {
  try {
    const isExist = await genericQueries.isExist(TABLE_NAME, "id", id);
    if (!isExist) throw new Error(`Task with the id- ${id} does not exist`);
    await genericQueries.deleteItem(TABLE_NAME, "id", id);
    return { status: StatusCodes.OK };
  } catch (error) {
    return { status: StatusCodes.BAD_REQUEST, error: error.Task };
  }
}

module.exports = {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
};
