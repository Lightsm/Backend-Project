import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">Aboriginal Arts & Culture</p>

          <h1>
            Explore Aboriginal <span>artworks</span>, symbols and stories.
          </h1>

          <p>
            MM Art Gallery is a digital platform where users can explore
            Aboriginal artifacts, learn about cultural symbols, and save their
            favourite artworks.
          </p>

          <div className="hero-actions">
            <Link to={token ? "/artifacts" : "/signup"}>
              <button>Explore Artifacts</button>
            </Link>

            <Link to="/about">
              <button className="secondary-btn">About Project</button>
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-art">Aboriginal Art Gallery</div>
        </div>
      </section>

      <section className="stats-row">
        <div>
          <h3>Artifacts</h3>
          <p>Artwork records with images and cultural details.</p>
        </div>

        <div>
          <h3>Symbols</h3>
          <p>Iconography connected with Aboriginal artwork.</p>
        </div>

        <div>
          <h3>Users</h3>
          <p>Users can like, pin and manage profile details.</p>
        </div>

        <div>
          <h3>Admin</h3>
          <p>Admin can manage artifacts and user roles.</p>
        </div>
      </section>
    </div>
  );
}