const { getReasonPhrase, StatusCodes, ReasonPhrases } = require("http-status-codes");
const service = require("./Task.service.js");

const Task = {
  id: { type: "string" },
  content: { type: "string" },
  done: { type: "boolean" },
};

const defaultSchema = {
  tags: ["API Task"],
  body: {
    type: "object",
    properties: {
      ...Task,
    },
  },
  response: {
    200: {
      description: "Success response",
      type: "object",
      properties: { responseTitle: { type: "string" } },
    },
    400: {
      description: "Bad request",
      type: "object",
      properties: { responseTitle: { type: "string" }, error: {} },
    },
  },
};

const getTasks = {
  schema: {
    tags: defaultSchema.tags,
    description: "",
    response: {
      200: {
        description: "Success response",
        type: "object",
        properties: {
          responseTitle: { type: "string" },
          Tasks: {
            type: "array",
            items: { type: "object", properties: { ...Task } },
          },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: { responseTitle: { type: "string" }, error: {} },
      },
    },
  },
  handler: async (req, reply) => {
    try {
      const { Tasks, status, error } = await service.getTasks();
      reply.code(status).send({
        responseTitle: getReasonPhrase(status),
        Tasks,
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { Task: err },
      });
    }
  },
};

const getTask = {
  schema: {
    tags: defaultSchema.tags,
    description: "",
    params: {
      id: { type: "string" },
    },
    response: {
      200: {
        description: "Success response",
        type: "object",
        properties: {
          responseTitle: { type: "string" },
          Task: { type: "object", properties: { ...Task } },
        },
      },
      400: {
        description: "Bad request",
        type: "object",
        properties: { responseTitle: { type: "string" }, error: {} },
      },
    },
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { Task, status, error } = await service.getTask(id);
      reply.code(status).send({
        responseTitle: getReasonPhrase(status),
        Task,
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { Task: err },
      });
    }
  },
};

const addTask = {
  schema: {
    tags: defaultSchema.tags,
    body: {
      type: "object",
      required: ["id", "content", "done"],
      properties: {
        ...Task,
      },
    },
    response: defaultSchema.response,
    description: "",
  },
  handler: async (req, reply) => {
    try {
      const { status, error } = await service.addTask(req.body);
      reply.code(status).send({
        responseTitle: status === 200 ? "The Task was created successfully" : getReasonPhrase(status),
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { Task: err },
      });
    }
  },
};

const updateTask = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      id: { type: "string" },
    },
    body: defaultSchema.body,
    response: defaultSchema.response,
    description: "",
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { status, error } = await service.updateTask(id, req.body);
      reply.code(status).send({
        responseTitle: status === 200 ? "The Task was updated successfully" : getReasonPhrase(status),
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { Task: err },
      });
    }
  },
};

const deleteTask = {
  schema: {
    tags: defaultSchema.tags,
    params: {
      id: { type: "string" },
    },
    response: defaultSchema.response,
  },
  handler: async (req, reply) => {
    const { id } = req.params;
    try {
      const { status, error } = await service.deleteTask(id);
      reply.code(status).send({
        responseTitle: status === 200 ? "The Task was deleted successfully" : getReasonPhrase(status),
        ...(error ? { error } : {}),
      });
    } catch (err) {
      reply.code(StatusCodes.BAD_REQUEST).send({
        responseTitle: getReasonPhrase(StatusCodes.BAD_REQUEST),
        error: { Task: err },
      });
    }
  },
};
module.exports = { getTasks, getTask, addTask, updateTask, deleteTask };
