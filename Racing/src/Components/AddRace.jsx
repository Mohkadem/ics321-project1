import React, { useState } from 'react';
import axios from 'axios';

const AddRace = () => {
  const [raceId, setRaceId] = useState('');
  const [raceName, setRaceName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [raceDate, setRaceDate] = useState('');
  const [raceTime, setRaceTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/add-race', {
        raceId,
        raceName,
        trackName,
        raceDate,
        raceTime,
      });
      alert(res.data.status || 'Race added successfully!');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Add New Race</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Race ID"
          value={raceId}
          onChange={(e) => setRaceId(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Race Name"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Track Name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={raceDate}
          onChange={(e) => setRaceDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="time"
          value={raceTime}
          onChange={(e) => setRaceTime(e.target.value)}
          className="p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Race
        </button>
      </form>
    </div>
  );
};

export default AddRace;
