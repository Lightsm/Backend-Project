import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChangePassword = async () => {
    try {
      await API.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password changed");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Password change failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container">
      <div className="profile-card">
        <h2>My Profile</h2>

        {user ? (
          <>
            <p>
              <b>Name:</b> {user.name}
            </p>

            <p>
              <b>Email:</b> {user.email}
            </p>

            <p>
              <b>Role:</b> {user.role}
            </p>
          </>
        ) : (
          <p>Loading profile...</p>
        )}

        <hr />

        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button onClick={handleChangePassword}>Change Password</button>

        <button className="secondary-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}