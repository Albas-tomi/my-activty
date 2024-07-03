import {
  retrieveData,
  retrieveDataById,
  retrieveDataByIdMysql,
  retrieveDataMysql,
} from "@/lib/services/service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const detailTodo = await retrieveDataByIdMysql("todos", id);
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

  const todos = await retrieveDataMysql("todos");
  return NextResponse.json({
    status: 200,
    message: "Success",
    data: todos,
  });
};
