import { useNavigate } from "react-router-dom";

export default function Card({ id, title, desc, artist, symbols = [], type, onPin }) {
  const navigate = useNavigate();

  return (
    <div className="card">
      <div className="img">Image</div>

      <h3>{title}</h3>
      <p>{desc}</p>
      <small>{artist}</small>

      {/* 🔥 SYMBOL TAGS */}
      <div className="tags">
        {symbols.map((s) => (
          <span
            key={s.id}
            className="tag"
            onClick={() => navigate(`/symbols/${s.id}`)}
          >
            {s.name}
          </span>
        ))}
      </div>

      {/*  PIN BUTTON */}
      <button onClick={() => onPin(id, type)}>Pin</button>
    </div>
  );
}