// import , { registrasi } from "@/lib/firebase/service";
import { registrasiMysql } from "@/lib/services/service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const res = await registrasiMysql(req);
  return NextResponse.json(
    {
      status: res.status,
      message: res.message,
    },
    { status: res.statusCode }
  );
};
