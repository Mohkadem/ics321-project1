import React, { useState } from 'react';

const ManageHorses = () => {
  const [horseID, setHorseID] = useState('');
  const [toStable, setStable] = useState('');
  const [message, setMessage] = useState('');

  const handleMove = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5001/admin/manageHorses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ horseID, toStable }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        alert(
          `The horse with id ${horseID} has been moved to stable with stable id ${toStable} successfully`
        );
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
      {message && <p className="text-white mt-2">{message}</p>}

      <h2 className="text-2xl font-bold mb-4">Move Horse From Stable to Another</h2>
      <form onSubmit={handleMove} className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
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
          value={toStable}
          onChange={(e) => setStable(e.target.value)}
          className="p-2 border rounded"
        />

        <button type="submit">Move</button>
      </form>
    </div>
  );
};

export default ManageHorses;
