import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Guest/Header';
import AdminHeader from '../Components/Admin/AdminHeader';
const HomeLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;
