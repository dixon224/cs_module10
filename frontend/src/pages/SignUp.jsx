import { useState } from "react";
import http from "../api/http";
import Navbar from "../components/Navbar";

function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await http.post("/user/register", {
        name,
        username,
        email,
        phone,
        password,
      });

      setSuccess("You have successfully registered");
    } catch (err) {
      setError(err.response?.data?.message || "Signup error");
      setSuccess("");
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex items-center justify-center p-4 shadow-2xl">
        <div className="w-full max-w-sm md:max-w-md bg-white rounded-3xl shadow-2xl p-6">
          <h1 className="text-2xl font-bold text-black text-center">
            Create Account
          </h1>
          <p className="text-sm text-black text-center mt-2">
            SignUp and enjoy the last CS
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mt-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-white-600 text-sm rounded-xl px-4 py-3 mt-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSignUp} className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-black placeholder:text-gray-400 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
