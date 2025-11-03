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
import Header from './Components/Guest/Header';
import Home from './Components/Guest/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminLayout from './Layout/AdminLayout';
import HomeLayout from './Layout/HomeLayout';
import Dashboard from './Components/Admin/Dashboard';
import AddRace from './Components/Admin/AddRace';
import ManageOwners from './Components/Admin/ManageOwners';
import ManageHorses from './Components/Admin/ManageHorses';
import ManageTrainers from './Components/Admin/ManageTrainers';
import AdminHeader from './Components/Admin/AdminHeader';
import BrowseHorse from './Components/Guest/BrowseHorse';
import WiningTrainers from './Components/Guest/WiningTrainers';
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
          <Route path="browseHorses" element={<BrowseHorse />} />
          <Route path="browseTrainer" element={<WiningTrainers />} />
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
