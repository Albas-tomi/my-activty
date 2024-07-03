import { deleteTodo, updateTodo } from "@/lib/services/service";
import { NextRequest, NextResponse } from "next/server";

// Handler untuk metode POST (Update Todo)
export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) {
      throw new Error("ID tidak ditemukan di URL.");
    }

    const res = await updateTodo(parseInt(id), req);
    return NextResponse.json(
      {
        status: res.status,
        message: res.message,
      },
      { status: res.statusCode }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        statusCode: 500,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

// Handler untuk metode DELETE (Delete Todo)
export const DELETE = async (request: NextRequest) => {
  try {
    const id = request.nextUrl.pathname.split("/").pop();
    if (!id) {
      throw new Error("ID tidak ditemukan di URL.");
    }

    const res = await deleteTodo(parseInt(id));
    return NextResponse.json(
      {
        status: res.status,
        message: res.message,
      },
      { status: res.statusCode }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        statusCode: 500,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
