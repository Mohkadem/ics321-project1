import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="wrapper w-full h-8 mt-4">
        <div className="container w-[90%] flex justify-between items-center mx-auto">
          <h1 className="text-2xl font-bold">Racing</h1>
          {/* <div className="flex">
          {headerLinks.map((e) => (
            <li key={e.id} className="mr-4">
              {e.title}
            </li>
          ))}
        </div> */}
          <div>
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/login" end className="nav-link">
              Login
            </NavLink>
            <NavLink to="/signUp" className="nav-link">
              Sign Up
            </NavLink>

            {/* <button>Login</button>s
            <button>Sign up</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
