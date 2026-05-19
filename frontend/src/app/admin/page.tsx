"use client";

import { useState } from "react";
import axios from "axios";

export default function AdminPage() {

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {

    try {

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/feed`,
        {
          message,
        }
      );

      setMessage("");

      alert("Feed Added");

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Admin Page
      </h1>

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 rounded-lg"
        >
          Add
        </button>

      </div>

    </div>
  );
}