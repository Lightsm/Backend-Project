import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Pins() {
  const [pins, setPins] = useState([]);

  const fetchPins = async () => {
    try {
      const res = await API.get("/pins");
      setPins(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load pins");
    }
  };

  useEffect(() => {
    fetchPins();
  }, []);

  const handleUnpin = async (artifactId) => {
    try {
      await API.delete(`/pins/${artifactId}`);
      alert("Unpinned");
      setPins(pins.filter((p) => p.Artifact.id !== artifactId));
    } catch (err) {
      console.error(err);
      alert("Unpin failed");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <p className="eyebrow">Saved Collection</p>
        <h1>My Pins</h1>
        <p>Your saved Aboriginal artifacts.</p>
      </div>

      {pins.length === 0 && <p>No pinned artifacts</p>}

      <div className="card-grid">
        {pins.map((p) => (
          <div key={p.id} className="artifact-card">
            {p.Artifact.image && (
              <img
                src={`http://localhost:5000${p.Artifact.image}`}
                alt={p.Artifact.name}
                className="artifact-img"
              />
            )}

            <div className="artifact-body">
              <h3>{p.Artifact.name}</h3>
              <p className="desc">{p.Artifact.description}</p>

              <p>
                <b>Artist:</b> {p.Artifact.Artist?.name || "Not added"}
              </p>

              <p>
                <b>Gallery:</b> {p.Artifact.Gallery?.name || "Not added"}
              </p>
            </div>

            <div className="card-actions">
              <button onClick={() => handleUnpin(p.Artifact.id)}>Unpin</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}