// MIDDLEWARE INI AKAN BERJALAN TERLEBIH DAHULU SEBELUM RENDEDRING  SETIAP PAGE

import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "./middlewares/withAuth";

export const mainMiddleware = (req: NextRequest) => {
  const res = NextResponse.next();
  return res;
};
//  === LINK YANG TIDAK BISA DI AKSES KETIKA BELUM LOGIN DAN HALAMAN YANG INGIN DIBATASI ===
export default withAuth(mainMiddleware, [
  "/product",
  "/profile",
  "/profile/setting",
  "/login",
  "/registrasi",
  "/",
]);
