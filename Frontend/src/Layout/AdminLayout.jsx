import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../Components/Admin/AdminHeader';
// import Menu from './Menu';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-1">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
