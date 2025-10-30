import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

// Components
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminLayout from './Layout/AdminLayout';
import HomeLayout from './Layout/HomeLayout';
import Dashboard from './Components/Dashboard';
import AddRace from './Components/AddRace';
import ManageOwners from './Components/ManageOwners';
import ManageHorses from './Components/ManageHorses';
import ManageTrainers from './Components/ManageTrainers';
import AdminHeader from './Components/AdminHeader';
import BrowseHorse from './Components/BrowseHorse';
// Styling
import './index.css';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="addRace" element={<AddRace />} />
          <Route path="ManageOwners" element={<ManageOwners />} />
          <Route path="ManageHorses" element={<ManageHorses />} />
          <Route path="ManageTrainers" element={<ManageTrainers />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};
export default App;
