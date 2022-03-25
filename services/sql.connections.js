const env = require("dotenv");
env.config();
const { Pool } = require("pg");
const pool = new Pool({
  // host: process.env.REACT_APP_DB_HOST,
  // port: process.env.REACT_APP_DB_PORT,
  // user: process.env.REACT_APP_DB_USERNAME,
  // password: process.env.REACT_APP_DB_PASSWORD,
  // database: process.env.REACT_APP_DB_NAME,
  host: "balarama.db.elephantsql.com",
  port: 5432,
  user: "nrsregvr",
  password: "96cmFCU4Pn4bq46mcUCf2PxvsXd29NVc",
  database: "nrsregvr",
});
exports.pool = pool;
