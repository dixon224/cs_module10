import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../api/http";
import useAuth from "../context/useAuth";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await http.post("/user/auth/login", {
        email,
        password,
      });

      const { payload } = res.data;

      const { token, ...user } = payload;

      localStorage.setItem("token", token);
      setUser(user);

      console.log("Logged user:", user);

      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login error");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-4 shadow-2xl">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-2xl p-6">
          <h1 className="text-2xl font-bold text-white text-center">Log in</h1>

          <p className="text-sm text-black text-center mt-2">
            Log in and enjoy the last CS
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transitsion hover:bg-green-500 active:scale-[0.98] shadow-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
