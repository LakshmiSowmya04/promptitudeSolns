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
  new User(3, "Emily Clark", "Member", "123-456-7896", "emily@example.com", "777-888-9999", true, ["Client F"], "John Doe", ["Task 7"], "hashed_password_6"),
  new User(4, "Michael Brown", "Manager", "123-456-7897", "michael@example.com", "888-999-0000", true, ["Client G"], "Jane Smith", ["Task 8", "Task 9"], "hashed_password_7"),
];

const Members = () => {
  const [team, setTeam] = useState(teamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    role: '',
    phone_number: '',
    email_id: '',
    alternate_pho_no: '',
    reporting_to: '',
    tasks: [],
    clients: [],
  });

  const handleAddButtonClick = () => {
    setAddModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMember = () => {
    const memberData = {
      ...newUser,
      user_id: team.length + 1, // Incremental ID
      status: true, // Default to active
      password: 'default_password', // Placeholder password
    };
    setTeam([...team, memberData]);
    setAddModalOpen(false);
    setNewUser({
      name: '',
      role: '',
      email_id: '',
      reporting_to: '',
    });
  };

  // Filtered team based on search term
  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members-container">
      <h1>Team Members</h1>
      <div className="members-header">
        <button className="add-member-btn" onClick={handleAddButtonClick}>Add Member</button>
        <input
          type="text"
          className="search-bar"
          placeholder="Search members..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="team-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Clients</th>
            <th>Tasks</th>
            <th>Reporting To</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeam.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.status ? 'Active' : 'Inactive'}</td>
              <td>{member.clients.join(', ')}</td>
              <td>{member.tasks.join(', ')}</td>
              <td>{member.reporting_to}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAddModalOpen && (
        <div className="modal">
          <h2>Add New Member</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddMember(); }}>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
            />
            <label>Role: </label>
            <input
              type="text"
              name="role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              required
            />
            <label>Email ID: </label>
            <input
              type="email"
              name="email_id"
              value={newUser.email_id}
              onChange={(e) => setNewUser({ ...newUser, email_id: e.target.value })}
              required
            />
            <label>Reporting To: </label>
            <input
              type="text"
              name="reporting_to"
              value={newUser.reporting_to}
              onChange={(e) => setNewUser({ ...newUser, reporting_to: e.target.value })}
            />
            <br></br>
            <div className="button-container">
              <button className="add-btn" type="submit">Add Member</button>
              <button className="close-btn" type="button" onClick={() => setAddModalOpen(false)}>Close</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Members;
