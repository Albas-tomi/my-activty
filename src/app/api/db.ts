import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "my-activity",
};

export const getConnection = async () => {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
};
