import React, { useState } from "react";

const App = () => {
  const [stableId, setStableId] = useState("");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async () => {
    const data = {
      stableId,
      owner,
      location,
      color,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/add-stable/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      alert(result.message);
    } catch (err) {
      console.error(err);
      alert("Error adding stable");
    }
  };

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="Stable ID"
        value={stableId}
        onChange={(e) => setStableId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default App;
