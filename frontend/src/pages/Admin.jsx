import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const role = localStorage.getItem("role");

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchUsers();
    }
  }, [role]);

  if (role !== "admin") {
    return <h2 className="container">Access Denied</h2>;
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(`/auth/users/${userId}/role`, {
        role: newRole,
      });

      alert("Role updated");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <p className="eyebrow">Admin Panel</p>
        <h1>Manage Users</h1>
        <p>Update user roles for system access control.</p>
      </div>

      <div className="admin-list">
        {users.map((u) => (
          <div key={u.id} className="user-row">
            <div>
              <h3>{u.name}</h3>
              <p>{u.email}</p>
            </div>

            <select
              value={u.role}
              onChange={(e) => handleRoleChange(u.id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}