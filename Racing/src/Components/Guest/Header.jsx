import { NavLink } from 'react-router-dom';
import { headerLinks } from '../../../Constants/index';
const Header = () => {
  return (
    <>
      <div className="wrapper w-full h-8 mt-4">
        <div className="container w-[90%] flex justify-between items-center mx-auto">
          <h1 className="text-2xl font-bold">Racing</h1>
          <div>
            {headerLinks.map((e) => (
              <NavLink key={e.id} to={e.to} end className="nav-link">
                {e.title}
              </NavLink>
            ))}
            {/* <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/login" end className="nav-link">
              Login
            </NavLink>
            <NavLink to="/signUp" className="nav-link">
              Sign Up
            </NavLink> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
