import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./components/chats/Dashboard";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element = {user ? <Home /> : <Login />} />
        <Route path="/login/" element = {user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register/" element = {user ? <Navigate to="/" /> : <Register />} />
        <Route path="/chat/" element = { <Dashboard />} />
        <Route path="/chat/u/:id/" element = { <Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;