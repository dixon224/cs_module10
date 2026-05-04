import { useState } from "react";
import http from "../api/http";
import Navbar from "../components/Navbar";

const AddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await http.post("/items", {
        name,
        price: Number(price),
        stock: Number(stock),
      });

      setSuccess(res.data.message || "Item created successfully");

      // reset form
      setName("");
      setPrice("");
      setStock("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create item");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-4 shadow-2xl">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-2xl p-6">
          <h1 className="text-2xl font-bold text-black text-center">
            Add New Item
          </h1>

          <p className="text-sm text-gray-500 text-center mt-2">
            Create a new item for your marketplace
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm rounded-xl px-4 py-3 mt-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transitsion hover:bg-green-500 active:scale-[0.98] shadow-md"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
