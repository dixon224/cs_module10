import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { logoutUser } from "../api/http";

function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logoutUser(); // optional but clean
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    }
  }

  return (
    <nav className="bg-yellow-300 text-white px-8 py-4 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">
          {user ? user.name : "CS_Module10"}
        </h1>
      </Link>

      <div>
        {!user ? (
          <div className="flex gap-6 text-lg">
            <Link to={"/signup"}>SignUp</Link>
            <Link to={"/login"}>Login</Link>
          </div>
        ) : (
          <div className="flex gap-6 text-lg items-center">
            <Link to={"/all_items"}>All Items</Link>
            <Link to={"/add_item"}>Add Item</Link>

            <button
              onClick={handleLogout}
              className="bg-white text-yellow-500 px-4 py-1 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
