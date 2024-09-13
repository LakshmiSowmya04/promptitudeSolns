import React from 'react';
import './Members.css';

function Members() {
  return (
    <div className="members-container">
      <h1>Team Members</h1>

      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="add-button">Add</button>
      </div>

      <table className="members-table">
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
          {/* Placeholder rows */}
          <tr>
            <td>John Doe</td>
            <td>Developer</td>
            <td>Active</td>
            <td>Client A</td>
            <td>Task 1, Task 2</td>
            <td>Manager A</td>
            <td>
              <button className="action-button">Update</button>
              <button className="action-button">Change Password</button>
              <button className="action-button">Disable</button>
            </td>
          </tr>
          {/* More rows */}
        </tbody>
      </table>
    </div>
  );
}

export default Members;
