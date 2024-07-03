import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";

type ModalProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  idSelected: string;
  setIdSelected: React.Dispatch<React.SetStateAction<string>>;
};

const Modal = ({ setModal, idSelected, setIdSelected }: ModalProps) => {
  const overlay = useRef(null);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    createAt: "",
    status: "",
  });

  const retrieveDataById = async (id: string) => {
    try {
      const response = await fetch(`/api/todo/?id=${parseInt(id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const dataEdit = data?.data[0];
      setFormData({
        category: dataEdit[0].category,
        description: dataEdit[0].description,
        status: dataEdit[0].status,
        createAt: dataEdit[0].createAt,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here
    }
  };

  useEffect(() => {
    if (idSelected) {
      retrieveDataById(idSelected);
    }
  }, [idSelected]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataTodo = {
      category: formData.category,
      description: formData.description,
      status: formData.status,
      createAt: formData.createAt,
    };
    console.log(idSelected);

    const apiUrl = idSelected ? `/api/todo/${idSelected}` : "/api/todo";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      mutate("/api/todo"); // Update SWR cache
      setModal(false);
      setIdSelected("");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <div
      ref={overlay}
      className="fixed z-20 top-0 bottom-0 left-0 right-0 mx-auto bg-black/70"
    >
      <div className="grid  h-screen grid-flow-row justify-items-center items-center gap-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto gap-4 p-8 bg-white rounded-md flex flex-col px-5 md:w-[60%] lg:w-[40%]"
        >
          {/* CATEGORY */}
          <div className="relative mt-2">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
              className="block w-full px-4 py-4 border border-black rounded-md focus:outline-none peer"
            >
              <option value="">Select Category</option>
              <option value="important">Important</option>
              <option value="notes">Notes</option>
              <option value="links">Links</option>
              {/* Tambahkan opsi lain sesuai kebutuhan */}
            </select>
            <label
              htmlFor="category"
              className="absolute left-2 top-4 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-valid:-translate-y-7 peer-valid:scale-75 bg-white px-1"
            >
              Category
            </label>
          </div>
          {/* DESCRIPTION */}
          <div className="relative mt-2">
            <textarea
              typeof="text"
              id="description"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="block w-full px-4 py-4 border border-black rounded-md focus:outline-none peer"
            />
            <label
              htmlFor="description"
              className="absolute left-2 top-4 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-valid:-translate-y-7 peer-valid:scale-75 bg-white px-1"
            >
              Description
            </label>
          </div>

          {/* STATUS */}
          {idSelected && (
            <div className="relative mt-2">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                required
                className="block w-full px-4 py-4 border border-black rounded-md focus:outline-none peer"
              >
                <option value="">Select Status</option>
                <option value="waiting">Waiting Start</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                {/* Tambahkan opsi lain sesuai kebutuhan */}
              </select>
              <label
                htmlFor="status"
                className="absolute left-2 top-4 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-75 peer-valid:-translate-y-7 peer-valid:scale-75 bg-white px-1"
              >
                Status
              </label>
            </div>
          )}

          <div className="grid gap-3">
            <div className="w-full flex flex-col items-end justify-end">
              <button
                type="submit"
                className="btn rounded-full bg-black w-full md:w-1/4 text-white"
              >
                {idSelected ? "Update" : "Add"}
              </button>
            </div>

            <div className="w-full flex flex-col items-end justify-end">
              <button
                onClick={() => {
                  setIdSelected("");
                  setModal(false);
                }}
                type="button"
                className="btn rounded-full bg-black w-full md:w-1/4 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
