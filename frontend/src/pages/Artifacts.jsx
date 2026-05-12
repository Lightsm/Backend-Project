import { useEffect, useState } from "react";
import API from "../api/axios";

const Artifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [search, setSearch] = useState("");
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [galleryLocation, setGalleryLocation] = useState("");
  const [symbolName, setSymbolName] = useState("");
  const [file, setFile] = useState(null);

  const role = localStorage.getItem("role");

  const fetchArtifacts = async () => {
    try {
      setLoading(true);

      let url = "/artifacts?";
      if (search) url += `search=${search}&`;
      if (symbol) url += `symbol=${symbol}`;

      const res = await API.get(url);
      setArtifacts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load artifacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();

    // eslint-disable-next-line
  }, []);

  const handleCreate = async () => {
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("artistName", artistName);
      formData.append("galleryName", galleryName);
      formData.append("galleryLocation", galleryLocation);
      formData.append("symbolName", symbolName);

      if (file) {
        formData.append("image", file);
      }

      await API.post("/artifacts", formData);

      alert("Artifact created");

      setName("");
      setDescription("");
      setArtistName("");
      setGalleryName("");
      setGalleryLocation("");
      setSymbolName("");
      setFile(null);

      fetchArtifacts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Create failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete artifact?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/artifacts/${id}`);
      alert("Artifact deleted");
      fetchArtifacts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  const handlePin = async (artifactId) => {
    try {
      await API.post("/pins", { artifactId });
      alert("Pinned");
      fetchArtifacts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Pin failed");
    }
  };

  const handleLike = async (artifactId) => {
    try {
      await API.post("/likes", { artifactId });
      fetchArtifacts();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Like failed");
    }
  };

  return (
    <div className="container">
      <h2>Artifacts</h2>

      {role === "admin" && (
        <div
          style={{
            marginBottom: "30px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
            display: "grid",
            gridTemplateColumns: "repeat(2, 250px)",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <h3 style={{ gridColumn: "1 / span 2", marginBottom: "10px" }}>
            Add Artifact
          </h3>

          <input
            placeholder="Artifact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          <input
            placeholder="Gallery Name"
            value={galleryName}
            onChange={(e) => setGalleryName(e.target.value)}
          />

          <input
            placeholder="Gallery Location"
            value={galleryLocation}
            onChange={(e) => setGalleryLocation(e.target.value)}
          />

          <input
            placeholder="Symbol Name"
            value={symbolName}
            onChange={(e) => setSymbolName(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ gridColumn: "1 / span 2" }}
          />

          <button onClick={handleCreate} style={{ width: "150px" }}>
            Add Artifact
          </button>
        </div>
      )}

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search artifacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Filter by symbol..."
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />

        <button onClick={fetchArtifacts}>Apply</button>
      </div>

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: "flex",
          gap: "25px",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        {artifacts.length === 0 && !loading && <p>No artifacts found</p>}

        {artifacts.map((a) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              width: "300px",
              minHeight: "620px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ minHeight: "50px" }}>{a.name}</h3>

            <p style={{ minHeight: "60px" }}>{a.description}</p>

            {a.image ? (
              <img
                src={`http://localhost:5000${a.image}`}
                alt={a.name}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  background: "#d1d5db",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "6px",
                  marginBottom: "10px",
                }}
              >
                No Image
              </div>
            )}

            <div style={{ flexGrow: 1 }}>
              <p>
                <b>Artist:</b> {a.Artist?.name || "Not added"}
              </p>

              <p>
                <b>Gallery:</b> {a.Gallery?.name || "Not added"}
              </p>

              <p>
                <b>Location:</b> {a.Gallery?.location || "Not added"}
              </p>

              {a.Symbols?.length > 0 ? (
                <p>
                  <b>Symbols:</b> {a.Symbols.map((s) => s.name).join(", ")}
                </p>
              ) : (
                <p>
                  <b>Symbols:</b> Not added
                </p>
              )}

              <p>
                <b>Pins:</b> {a.Pins ? a.Pins.length : 0}
              </p>

              <p>
                <b>Likes:</b> {a.Likes ? a.Likes.length : 0}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
                flexWrap: "wrap",
              }}
            >
              <button onClick={() => handlePin(a.id)}>Pin</button>

              <button onClick={() => handleLike(a.id)}>Like</button>

              {role === "admin" && (
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artifacts;