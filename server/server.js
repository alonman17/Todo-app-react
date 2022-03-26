const path = require("path");
const fastify = require("fastify")({ logger: true });
const fastifySwagger = require("fastify-swagger");
const swaggerOptions = require("../swagger.config.json");
const autoload = require("fastify-autoload");
const cors = require("fastify-cors");

const PORT = process.env.PORT || 8080;

fastify.register(fastifySwagger, swaggerOptions);
fastify.register(autoload, { dir: path.join(__dirname, "routes"), autoHooks: true, cascadeHooks: true });
//fastify.decorateRequest("fastify", fastify);
fastify.register(cors, { origin: true, methods: "POST,GET,DELETE,PATCH" });
const startServer = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

startServer();
