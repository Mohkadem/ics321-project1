import React, { useState } from 'react';
import axios from 'axios';

const AddRace = () => {
  const [raceId, setRaceId] = useState('');
  const [raceName, setRaceName] = useState('');
  const [trackName, setTrackName] = useState('');
  const [raceDate, setRaceDate] = useState('');
  const [raceTime, setRaceTime] = useState('');

  // Horses state
  const [horses, setHorses] = useState([
    { horse: '', result: '', prize: '' },
    { horse: '', result: '', prize: '' },
    { horse: '', result: '', prize: '' },
  ]);

  const handleHorseChange = (index, field, value) => {
    const updated = [...horses];
    updated[index][field] = value;
    setHorses(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        raceId,
        raceName,
        trackName,
        raceDate,
        raceTime,
        horse1: horses[0].horse,
        result1: horses[0].result,
        prize1: parseFloat(horses[0].prize) || 0,
        horse2: horses[1].horse,
        result2: horses[1].result,
        prize2: parseFloat(horses[1].prize) || 0,
        horse3: horses[2].horse,
        result3: horses[2].result,
        prize3: parseFloat(horses[2].prize) || 0,
      };

      const res = await axios.post('http://127.0.0.1:5001/add-race', payload);
      alert(res.data.status || 'Race added successfully!');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-700 p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Race</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-4 rounded shadow-md w-96 bg-gray-800"
      >
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

        <h3 className="font-semibold mt-4">Horses & Results</h3>
        {horses.map((h, i) => (
          <div key={i} className="flex flex-col gap-2 border p-2 rounded">
            <input
              type="text"
              placeholder={`Horse ${i + 1} Name`}
              value={h.horse}
              onChange={(e) => handleHorseChange(i, 'horse', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder={`Result ${i + 1}`}
              value={h.result}
              onChange={(e) => handleHorseChange(i, 'result', e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder={`Prize ${i + 1}`}
              value={h.prize}
              onChange={(e) => handleHorseChange(i, 'prize', e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mt-4"
        >
          Add Race
        </button>
      </form>
    </div>
  );
};

export default AddRace;
