import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Components
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Admin from "./Components/Admin";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<h2>404 — Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
