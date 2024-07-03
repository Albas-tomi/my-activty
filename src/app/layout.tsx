"use client";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const disableNav = ["/login", "/registrasi"];
  const Navbar = dynamic(() => import("../components/Navbar"), {});
  const pathName = usePathname();
  return (
    // META DATA UNTUK SEO
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <div className="relative bg-white">
            {/* SIDEBAR */}
            <div className="grid grid-flow-col">
              {!disableNav.includes(pathName) && <Sidebar />}
              {/* NAVBAR DAN CONTENT */}
              <div className="col-span-11  z-10 ">
                {/* JIKA TIDAK ADA DISABLE NAV PADA PATHNAME MAKA TAMPILAN NAVBAR */}
                {!disableNav.includes(pathName) && <Navbar />}
                {/* CONTENT */}
                {children}
              </div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
