import React, { useState } from 'react';

const ManageHorses = () => {
  const [horseID, setHorseID] = useState('');
  const [stable, setStable] = useState('');
  return (
    <div className="flex flex-col justify-center items-center bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Move Horse From Stable to Another</h2>
      <form className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Horse ID"
          value={horseID}
          onChange={(e) => setHorseID(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Move to stable ..."
          value={stable}
          onChange={(e) => setStable(e.target.value)}
          className="p-2 border rounded"
        />

        <button type="submit">Move</button>
      </form>
    </div>
  );
};

export default ManageHorses;
