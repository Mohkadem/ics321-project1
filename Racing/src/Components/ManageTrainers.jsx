import { useState } from 'react';
const ManageTrainers = () => {
  const [trainerId, setTrainerId] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [stable, setStable] = useState('');
  const [message, setMessage] = useState('');
  const handleAddTrainer = async (e) => {
    e.preventDefault();

    try {
      // The fetch just means that we are sending request to the server (python file which is the backend)
      // The purpose of await is just to tell the method stop until we get the result and store it in response
      const response = await fetch('http://127.0.0.1:5001/admin/manageTrainers', {
        method: 'POST',
        // Telling the server that the file will be sent is in json format
        headers: { 'Content-Type': 'application/json' },
        //
        body: JSON.stringify({ trainerId, lName, fName, stable }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        alert(
          `${fName} ${lName} with ${trainerId} in ${stable}  has been added as trainer successfully`
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
      <h2 className="text-2xl font-bold mb-4">Approve New Trainer</h2>
      <form onSubmit={handleAddTrainer} className="flex flex-col gap-3 p-4 rounded shadow-md w-96">
        <input
          type="text"
          placeholder="Trainer ID"
          value={trainerId}
          onChange={(e) => setTrainerId(e.target.value)}
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
