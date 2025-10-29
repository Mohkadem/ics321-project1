import React from 'react';
import { Outlet } from 'react-router-dom';
// import Menu from './Menu';
import Home from './Home';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* <Menu /> */}
      <main className="flex-1 p-8">
        <Outlet /> {/* 👈 where child routes (dashboard, addRace, etc.) render */}
      </main>
    </div>
  );
};

export default AdminLayout;
