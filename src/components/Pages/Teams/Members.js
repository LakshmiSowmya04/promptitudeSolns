

import React, { useState } from 'react';
import './Members.css';

// User Class
class User {
  constructor(user_id, name, role, phone_number, email_id, alternate_pho_no, status, clients, reporting_to, tasks, password) {
    this.user_id = user_id;
    this.name = name;
    this.role = role;
    this.phone_number = phone_number;
    this.email_id = email_id;
    this.alternate_pho_no = alternate_pho_no;
    this.status = status;
    this.clients = clients;
    this.reporting_to = reporting_to;
    this.tasks = tasks;
    this.password = password;
  }
}

// Sample Data
const teamMembers = [
  new User(1, "John Doe", "Admin", "123-456-7890", "john@example.com", "111-222-3333", true, ["Client A"], "Jane Smith", ["Task 1"], "hashed_password_1"),
  new User(2, "Jane Smith", "Member", "123-456-7891", "jane@example.com", "222-333-4444", true, ["Client B"], "John Doe", ["Task 2"], "hashed_password_2"),
];

const Members = () => {
  const [team, setTeam] = useState(teamMembers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleViewMore = (user) => {
    alert(`Viewing more details for ${user.name}`);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handlePasswordChange = (user) => {
    alert(`Password change for ${user.name}`);
  };

  const handleToggleStatus = (user) => {
    const updatedTeam = team.map((u) => (u.user_id === user.user_id ? { ...u, status: !u.status } : u));
    setTeam(updatedTeam);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedTeam = team.map((u) => (u.user_id === updatedUser.user_id ? updatedUser : u));
    setTeam(updatedTeam);
    setUpdateModalOpen(false);
  };

  return (
    <div className="members-container">
      <h1>Team Members</h1>
      <table className="team-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Clients</th>
            <th>Tasks</th>
            <th>Reporting To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.status ? 'Active' : 'Inactive'}</td>
              <td>{member.clients.join(', ')}</td>
              <td>{member.tasks.join(', ')}</td>
              <td>{member.reporting_to}</td>
              <td>
                <button onClick={() => handleViewMore(member)}>View More</button>
                <button onClick={() => handleUpdate(member)}>Update</button>
                <button onClick={() => handlePasswordChange(member)}>Change Password</button>
                <button onClick={() => handleToggleStatus(member)}>
                  {member.status ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && (
        <div className="modal">
          <h2>Update User</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(selectedUser); }}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            />
            <label>Role: </label>
            <input
              type="text"
              name="role"
              value={selectedUser.role}
              onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
            />
            <label>Clients: </label>
            <input
              type="text"
              name="clients"
              value={selectedUser.clients.join(', ')}
              onChange={(e) => setSelectedUser({ ...selectedUser, clients: e.target.value.split(', ') })}
            />
            <button type="submit">Update</button>
            <button type="button" onClick={() => setUpdateModalOpen(false)}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Members;

