import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
          <h1 className="text-4xl font-bold text-black">
            SBD Final Project 🎉
          </h1>

          <p className="text-gray-800 mt-3 text-sm md:text-base">
            Explore authentication add items and browse all available items for
            sale.
          </p>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <Link to={"/login"}>
              <div className="bg-white rounded-xl px-6 py-3 shadow text-center">
                <p className="text-2xl font-bold text-black">🔐</p>
                <p className="text-sm text-gray-600">Login</p>
              </div>
            </Link>
            <Link to={"/signup"}>
              <div className="bg-white rounded-xl px-6 py-3 shadow text-center">
                <p className="text-2xl font-bold text-black">📝</p>
                <p className="text-sm text-gray-600">SignUp</p>
              </div>
            </Link>

            <Link to={"/add_item"}>
              <div className="bg-white rounded-xl px-6 py-3 shadow text-center">
                <p className="text-2xl font-bold text-black">➕</p>
                <p className="text-sm text-gray-600">Add New Item</p>
              </div>
            </Link>

            <Link to={"/all_items"}>
              <div className="bg-white rounded-xl px-6 py-3 shadow text-center">
                <p className="text-2xl font-bold text-black">🛒</p>
                <p className="text-sm text-gray-600">All Items</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-black">
              🔑 Authentication
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              You can create an account and log in securely using JWT-based
              authentication.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-black">
              🛍️ Items Marketplace
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              All items available for sale will be listed for you.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-black">
              🚀 Deployment Ready
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Our project is pushed to GitHub and deployed to let everyone enjoy
              this last CS.
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12 text-gray-500 text-sm pb-10">
          Database Systems Last CS • Thank you for the experience © 2026
        </div>
      </div>
    </div>
  );
};

export default Home;
