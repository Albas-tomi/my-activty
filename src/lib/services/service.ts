import { getConnection } from "@/app/api/db";

import bcrypt from "bcrypt";
// MERITRIEVE DATAMysql
export const retrieveDataMysql = async (
  collectionName: string,
  id?: string
) => {
  const connection = await getConnection();
  const query = `SELECT * FROM ${collectionName} ${
    id ? `WHERE id = ${id}` : ""
  }`;
  const data = await connection.query(query);
  return data;
};

// GET DATA BERDASARKAN ID
export const retrieveDataByIdMysql = async (
  collectionName: string,
  id: string
) => {
  const connection = await getConnection();
  const query = `SELECT * FROM ${collectionName} WHERE id = ${id}`;
  const data = await connection.query(query);
  return data;
};

// === TYPE USER ====
type UserLogin = {
  email: string;
  password: string;
};

// LOGIN USER CREDENTIALS
export const LoginUser = async (userData: UserLogin) => {
  const connection = await getConnection();
  const { email } = userData;

  const [rows]: any = await connection.execute(
    "SELECT * FROM db_users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    return rows[0];
  } else {
    return null;
  }
};

export const registrasiMysql = async (userData: {
  email: string;
  fullname: string;
  password: string;
  phone: string;
  role?: string;
}) => {
  const connection = await getConnection();
  const { email } = userData;

  const [rows]: any = await connection.execute(
    "SELECT * FROM db_users WHERE email = ?",
    [email]
  );

  if (rows.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exists",
    };
  } else {
    // ENCRYPT PASSWORD
    userData.password = await bcrypt.hash(userData.password, 10);

    // ROLE DEFAULT
    userData.role = "user";

    // ADD DATA KE FIREBASE
    await connection.execute(
      "INSERT INTO db_users (email, fullname, password, role,phone) VALUES (?, ?, ?, ?, ?)",
      [
        userData.email,
        userData.fullname,
        userData.password,
        userData.role,
        userData.phone,
      ]
    );
    try {
      return {
        status: true,
        statusCode: 200,
        message: "Register Success",
      };
    } catch (error: any) {
      return {
        status: false,
        statusCode: 500,
        message: error.message,
      };
    }
  }
};

// ADD TODO
export const addTodo = async (todo: {
  category: string;
  description: string;
  createAt: Date;
  status: string;
}) => {
  const connection = await getConnection();

  todo.createAt = new Date();
  todo.status = "need start";

  // ADD DATA KE MYSQL
  await connection.execute(
    "INSERT INTO db_todos (category, description, createAt, status) VALUES (?, ?, ?, ?)",
    [todo.category, todo.description, todo.createAt, (todo.status = "waiting")]
  );
  try {
    return {
      status: true,
      statusCode: 200,
      message: "Add todo Success",
    };
  } catch (error: any) {
    return {
      status: false,
      statusCode: 500,
      message: error.message,
    };
  }
};

// UPDATE TODO
export const updateTodo = async (
  id: number,
  todo: {
    id: number; // contoh: asumsi todo memiliki id yang unik
    category: string;
    description: string;
    createAt: Date;
    status: string;
  }
) => {
  const connection = await getConnection();

  // UPDATE DATA DI MYSQL
  await connection.execute(
    "UPDATE db_todos SET category = ?, description = ?, createAt = ?, status = ? WHERE id = ?",
    [todo.category, todo.description, todo.createAt, todo.status, id]
  );
  try {
    return {
      status: true,
      statusCode: 200,
      message: "Update todo Success",
    };
  } catch (error: any) {
    return {
      status: false,
      statusCode: 500,
      message: error.message,
    };
  }
};

// DELETE TODO
export const deleteTodo = async (deleteId: number) => {
  const connection = await getConnection();
  try {
    await connection.execute("DELETE FROM db_todos WHERE id = ?", [deleteId]);
    return {
      status: true,
      statusCode: 200,
      message: "Delete todo Success",
    };
  } catch (error: any) {
    return {
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
    };
  }
};
