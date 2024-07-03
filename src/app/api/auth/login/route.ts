import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  return NextResponse.json({
    status: 200,
    message: "Success",
    data: req,
  });
};
