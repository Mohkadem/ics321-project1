import { useState } from 'react';
const ManageTrainers = () => {
  const [trainer, setTrainer] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [stable, setStable] = useState('');
  return (
    <div className="flex flex-col justify-center items-center bg-gray-700">
      <h2 className="text-2xl font-bold mb-4">Approve New Trainer</h2>
      <form className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Trainer ID"
          value={trainer}
          onChange={(e) => setTrainer(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Stable"
          value={stable}
          onChange={(e) => setStable(e.target.value)}
          className="p-2 border rounded"
        />

        <button type="submit">Approve</button>
      </form>
    </div>
  );
};

export default ManageTrainers;
