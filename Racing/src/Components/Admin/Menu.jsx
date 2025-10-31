import React, { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <HiMenu className="text-3xl text-gray-700 cursor-pointer  z-50" onClick={toggleMenu} />

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={toggleMenu} />}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Admin Menu</h2>
        <nav className="flex flex-col gap-2">
          <Link
            to="/admin"
            onClick={toggleMenu}
            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/addRace"
            onClick={toggleMenu}
            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            Add Race
          </Link>
          <Link
            to="/admin/manageOwners"
            onClick={toggleMenu}
            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            Manage Owners
          </Link>
          <Link
            to="/admin/manageHorses"
            onClick={toggleMenu}
            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            Manage Horses
          </Link>
          <Link
            to="/admin/manageTrainers"
            onClick={toggleMenu}
            className="bg-gray-700 p-2 rounded hover:bg-gray-600"
          >
            Manage Trainers
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Menu;
