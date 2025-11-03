import React, { useState } from 'react';

const ManageOwners = () => {
  const [ownerId, setOwnerID] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5001/admin/manageOwners', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ownerId }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        alert(`The owner with id ${ownerId} has been deleted successfully`);
      } else {
        setMessage(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error occurred.');
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Delete Owner</h2>
      <form onSubmit={handleDelete} className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Owner ID"
          value={ownerId}
          onChange={(e) => setOwnerID(e.target.value)}
          className="p-2 border rounded"
        />

        <button type="submit" className="text-white py-2 rounded hover:bg-green-700 transition">
          Delete
        </button>
      </form>
    </div>
  );
};

export default ManageOwners;
