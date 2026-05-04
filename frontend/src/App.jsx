//import { Calendar, Bell, Info, Menu, LayoutGrid, Badge } from "lucide-react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllItems from "./pages/AllItems";
import AddItem from "./pages/AddItem";
import useAuth from "./context/useAuth";
function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/signup" element={!user ? <SignUp /> : <Home />} />
      <Route path="/login" element={!user ? <Login /> : <Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/all_items" element={user ? <AllItems /> : <Login />} />
      <Route path="/add_item" element={user ? <AddItem /> : <Login />} />
    </Routes>
  );
}

export default App;
