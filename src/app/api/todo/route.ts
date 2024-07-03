// import , { registrasi } from "@/lib/firebase/service";
import {
  addTodo,
  deleteTodo,
  registrasiMysql,
  retrieveDataByIdMysql,
  retrieveDataMysql,
} from "@/lib/services/service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const res = await addTodo(req);
  return NextResponse.json(
    {
      status: res.status,
      message: res.message,
    },
    { status: res.statusCode }
  );
};

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const detailTodo = await retrieveDataByIdMysql("db_todos", id);
    if (detailTodo) {
      return NextResponse.json({
        status: 200,
        message: "Success",
        data: detailTodo,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Not Found!",
        data: {},
      });
    }
  }

  const todos = await retrieveDataMysql("db_todos");
  return NextResponse.json({
    status: 200,
    message: "Success",
    data: todos,
  });
};
