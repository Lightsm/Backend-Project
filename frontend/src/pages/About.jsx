export default function About() {
  return (
    <div className="container">
      <div className="page-header">
        <p className="eyebrow">About</p>
        <h1>About MM Art Gallery</h1>
        <p>
          This platform showcases Aboriginal artworks and symbols. Users can
          explore and save artworks, while admins manage content and user roles.
        </p>
      </div>

      <div className="info-card wide">
        <h3>Project Purpose</h3>
        <p>
          The system demonstrates a full-stack backend-driven application using
          React, Express, PostgreSQL, Sequelize, JWT authentication, role-based
          access control, image upload, pins and likes.
        </p>
      </div>
    </div>
  );
}