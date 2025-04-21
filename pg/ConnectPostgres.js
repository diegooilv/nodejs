import pkg from "pg";
const { Client } = pkg;

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Connection error", err.stack);
  });
