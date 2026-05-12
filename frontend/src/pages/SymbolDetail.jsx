import { useParams } from "react-router-dom";

export default function SymbolDetail() {
  const { id } = useParams();

  return (
    <div className="container">
      <div className="card">
        <h2>Symbol Details</h2>
        <p>Symbol ID: {id}</p>
      </div>
    </div>
  );
}