const { sequelize } = require("../config/db");

const User = require("./User");
const Artist = require("./Artist");
const Gallery = require("./Gallery");
const Artifact = require("./Artifact");
const Symbol = require("./Symbol");
const Pin = require("./Pin");
const ArtifactSymbol = require("./ArtifactSymbol");
const Like = require("./Like");

// Artist → Artifact (1:M)
Artist.hasMany(Artifact, { foreignKey: "ArtistId" });
Artifact.belongsTo(Artist, { foreignKey: "ArtistId" });

// Gallery → Artifact (1:M)
Gallery.hasMany(Artifact, { foreignKey: "GalleryId" });
Artifact.belongsTo(Gallery, { foreignKey: "GalleryId" });

// Artifact ↔ Symbol (M:N)
Artifact.belongsToMany(Symbol, {
  through: ArtifactSymbol,
  foreignKey: "ArtifactId",
  otherKey: "SymbolId",
});

Symbol.belongsToMany(Artifact, {
  through: ArtifactSymbol,
  foreignKey: "SymbolId",
  otherKey: "ArtifactId",
});

// User ↔ Artifact via Pins (M:N)
User.belongsToMany(Artifact, {
  through: Pin,
  foreignKey: "UserId",
  otherKey: "ArtifactId",
});

Artifact.belongsToMany(User, {
  through: Pin,
  foreignKey: "ArtifactId",
  otherKey: "UserId",
});

// Direct Pin relationships
User.hasMany(Pin, { foreignKey: "UserId" });
Pin.belongsTo(User, { foreignKey: "UserId" });

Artifact.hasMany(Pin, { foreignKey: "ArtifactId" });
Pin.belongsTo(Artifact, { foreignKey: "ArtifactId" });

User.hasMany(Like, { foreignKey: "UserId" });
Like.belongsTo(User, { foreignKey: "UserId" });

Artifact.hasMany(Like, { foreignKey: "ArtifactId" });
Like.belongsTo(Artifact, { foreignKey: "ArtifactId" });


module.exports = {
  sequelize,
  User,
  Artist,
  Gallery,
  Artifact,
  Symbol,
  Pin,
  Like,
  ArtifactSymbol,
};