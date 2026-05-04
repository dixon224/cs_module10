//import { Calendar, Bell, Info, Menu, LayoutGrid, Badge } from "lucide-react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllItems from "./pages/AllItems";
import AddItem from "./pages/AddItem";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/all_items" element={<AllItems />} />
      <Route path="/add_item" element={<AddItem />} />
    </Routes>
  );
}

export default App;
