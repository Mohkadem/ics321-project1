import React, { useState } from 'react';

const ManageOwners = () => {
  const [ownerID, setOwnerID] = useState('');
  return (
    <div className="flex flex-col justify-center items-center bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Delete Owner</h2>
      <form className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Owner ID"
          value={ownerID}
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
