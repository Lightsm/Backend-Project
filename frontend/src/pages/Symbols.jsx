import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Symbols() {
  const [symbols, setSymbols] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const role = localStorage.getItem("role");

  const fetchSymbols = async () => {
    try {
      setLoading(true);

      let url = "/symbols";
      if (search) url += `?search=${search}`;

      const res = await API.get(url);
      setSymbols(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load symbols");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSymbols();
    // eslint-disable-next-line
  }, []);

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);

      if (file) {
        formData.append("image", file);
      }

      await API.post("/symbols", formData);

      alert("Symbol created");

      setName("");
      setDescription("");
      setFile(null);

      fetchSymbols();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete symbol?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/symbols/${id}`);
      alert("Symbol deleted");
      fetchSymbols();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <p className="eyebrow">Iconography</p>
        <h1>Aboriginal Symbols</h1>
        <p>Explore cultural symbols connected with artifacts.</p>
      </div>

      {role === "admin" && (
        <div className="form-panel small-form">
          <h3>Add Symbol</h3>

          <div className="form-grid">
            <input
              placeholder="Symbol name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="full-width"
            />
          </div>

          <button onClick={handleCreate}>Add Symbol</button>
        </div>
      )}

      <div className="toolbar">
        <input
          placeholder="Search symbols..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={fetchSymbols}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="card-grid">
        {symbols.length === 0 && !loading && <p>No symbols found</p>}

        {symbols.map((s) => (
          <div key={s.id} className="info-card">
            {s.image && (
              <img
                src={`http://localhost:5000${s.image}`}
                alt={s.name}
                className="artifact-img"
              />
            )}

            <h3>{s.name}</h3>
            <p>{s.description || "No description added."}</p>

            {s.Artifacts && (
              <span className="pill">Artifacts: {s.Artifacts.length}</span>
            )}

            {role === "admin" && (
              <button
                className="danger-btn"
                onClick={() => handleDelete(s.id)}
                style={{ marginTop: "15px" }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}