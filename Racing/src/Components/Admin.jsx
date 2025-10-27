import { useState } from "react";
import axios from "axios";
const Admin = () => {
  const [raceId, setRaceId] = useState("");
  const [raceName, setRaceName] = useState("");
  const [trackName, setTrackName] = useState("");
  const [raceDate, setRaceDate] = useState("");
  const [raceTime, setRaceTime] = useState("");
  const [horse1, setHorse1] = useState("");
  const [result1, setResult1] = useState("");
  const [prize1, setPrize1] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/add-race", {
        raceId,
        raceName,
        trackName,
        raceDate,
        raceTime,
        horse1,
        result1,
        prize1: parseFloat(prize1),
        horse2: "",
        result2: "",
        prize2: 0,
        horse3: "",
        result3: "",
        prize3: 0,
      });
      alert(res.data.status);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };
  return (
    <section className="w-full h-screen">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Race ID"
          value={raceId}
          onChange={(e) => setRaceId(e.target.value)}
        />
        <input
          placeholder="Race Name"
          value={raceName}
          onChange={(e) => setRaceName(e.target.value)}
        />
        <input
          placeholder="Track Name"
          value={trackName}
          onChange={(e) => setTrackName(e.target.value)}
        />
        <input
          type="date"
          value={raceDate}
          onChange={(e) => setRaceDate(e.target.value)}
        />
        <input
          type="time"
          value={raceTime}
          onChange={(e) => setRaceTime(e.target.value)}
        />
        <input
          placeholder="Horse 1"
          value={horse1}
          onChange={(e) => setHorse1(e.target.value)}
        />
        <input
          placeholder="Result 1"
          value={result1}
          onChange={(e) => setResult1(e.target.value)}
        />
        <input
          placeholder="Prize 1"
          value={prize1}
          onChange={(e) => setPrize1(e.target.value)}
        />
        <button type="submit">Add Race</button>
      </form>
    </section>
  );
};

export default Admin;
