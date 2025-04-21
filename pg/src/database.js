import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "postgres",
  password: process.env.DB_PASSWORD || "1",
  port: Number(process.env.DB_PORT) || 5432,
});

export default client;
