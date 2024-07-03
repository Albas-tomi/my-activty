"use client";
import Modal from "@/components/Modal";
import TabsList from "@/components/TabsList";
import { deleteTodo } from "@/lib/services/service";
import { fetcher } from "@/lib/swr/fetcher";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

const NeedStart = () => {
  const [category, setCategory] = useState<string>("all");
  const { data } = useSWR("/api/todo", fetcher);
  const handleDelete = async (idSelected: string) => {
    const res = await fetch(`/api/todo/${idSelected}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idSelected),
    });
    if (res.status === 200) {
      console.log(res.status);
      mutate("/api/todo");
    } else {
      console.log("Delete Failed");
    }
  };

  return (
    <>
      <div>
        {/* Tabs */}
        <TabsList category={category} setCategory={setCategory} />
        <div className=" mt-6 shadow-md">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-orange-500 text-center">
                <th></th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}{" "}
              {data?.data && data?.data.length > 0 ? (
                data.data[0]
                  .filter((item: any) => item.status === "waiting")
                  .map((item: any, idx: number) => (
                    <tr key={idx} className="text-center">
                      <th>{idx + 1}</th>
                      <td>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }).format(new Date(item.createAt))}
                      </td>
                      <td>{item.description}</td>
                      <td>
                        {item.status === "done" ? (
                          <button className="badge px-9 py-3 text-green-700 bg-green-200/65">
                            Done
                          </button>
                        ) : item.status === "inprogress" ? (
                          <button className="badge px-9 py-3 text-blue-700 bg-blue-200/65">
                            In Progress
                          </button>
                        ) : item.status === "waiting" ? (
                          <button className="badge px-9 py-3 text-orange-700 bg-orange-200/65">
                            Waiting Start
                          </button>
                        ) : null}
                      </td>

                      <td className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this item?"
                              )
                            ) {
                              handleDelete(item.id);
                            }
                          }}
                          className="btn  text-red-700 bg-red-200/65"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr className="text-center">
                  <td colSpan={5}>
                    <span>Data kosong</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NeedStart;
