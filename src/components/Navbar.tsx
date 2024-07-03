"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const { status, data } = useSession();
  return (
    <>
      <div className="navbar bg-base-100 h-20">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Note Your Activies</a>
          <span className="text-xl font-semibold">({data?.user?.name})</span>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="">
              <div className="text-xl btn btn-circle rounded-full flex justify-center items-center border">
                {data?.user?.name?.charAt(0)}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                {data ? (
                  <button onClick={() => signOut()}>Sign Out</button>
                ) : (
                  <button onClick={() => signIn()}>Sign In</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
