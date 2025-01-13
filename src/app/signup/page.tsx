"use client";

import { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import { signup } from "@/components/api";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false); // Track signup success

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      setMessage(response.data.message);
      setIsSuccess(true); // Set success to true on successful signup
    } catch (error: any) {
      setMessage(error.response?.data?.message || "An error occurred.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full mb-4 text-gray-700" // Text color set here
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full mb-4 text-gray-700" // Text color set here
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full mb-4 text-gray-700" // Text color set here
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        {message && (
          <p className={`mt-4 text-center ${isSuccess ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
        {isSuccess && (
          <p className="mt-4 text-center">
            Go to{" "}
            <Link href="/signin" className="text-blue-500 hover:underline">
              Sign In
            </Link>{" "}
            page to log in.
          </p>
        )}
      </form>
    </div>
  );
}
