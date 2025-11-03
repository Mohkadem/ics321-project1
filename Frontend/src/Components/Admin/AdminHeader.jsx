import React from 'react';
import Menu from './Menu';
const AdminHeader = () => {
  return (
    <header className="bg-gray-500 flex justify-between items-center">
      <div className="flex">
        <Menu />
        <h1 className="text-2xl font-bold ml-2">Racing</h1>
      </div>
      <div className="flex w-[25%] justify-between">
        <p>Dashboard</p>
        <p>Sign out</p>
      </div>
    </header>
  );
};

export default AdminHeader;
