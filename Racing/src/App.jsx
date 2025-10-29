import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import AdminLayout from './Components/AdminLayout';
import Dashboard from './Components/Dashboard';
import AddRace from './Components/AddRace';
import ManageOwners from './Components/ManageOwners';
import ManageHorses from './Components/ManageHorses';
import ManageTrainers from './Components/ManageTrainers';
import AdminHeader from './Components/AdminHeader';
// Styling
import './index.css';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {isAdmin ? <AdminHeader /> : <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> {/* /admin */}
          <Route path="addRace" element={<AddRace />} /> {/* /admin/addRace */}
          <Route path="manageOwners" element={<ManageOwners />} />
          <Route path="manageHorses" element={<ManageHorses />} />
          <Route path="manageTrainers" element={<ManageTrainers />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h2>404 — Not Found</h2>} />
      </Routes>
    </>
  );
};
export default App;
