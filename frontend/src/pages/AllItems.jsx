import { useEffect, useState } from "react";
import http from "../api/http";
import Navbar from "../components/Navbar";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await http.get("/items");
        setItems(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-4 shadow-2xl">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-2xl p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            All Items
          </h1>

          <p className="text-sm text-black text-center mt-2">
            Browse all available items
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center text-gray-500 mt-6">
              Loading items...
            </div>
          )}

          {/* Items list */}
          {!loading && !error && (
            <div className="mt-6 space-y-3">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">No items available</p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:bg-white transition"
                  >
                    <h2 className="text-lg font-semibold text-black">
                      {item.name}
                    </h2>

                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    )}

                    {item.price !== undefined && (
                      <p className="text-sm text-sky-600 mt-2 font-medium">
                        ${item.price}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllItems;
