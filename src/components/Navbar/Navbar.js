import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isTasksOpen, setTasksOpen] = useState(false);
  const [isVaultsOpen, setVaultsOpen] = useState(false);
  const [isMyAccountOpen, setMyAccountOpen] = useState(false);
  const [isMyTeamsOpen, setMyTeamsOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case 'tasks':
        setTasksOpen(!isTasksOpen);
        break;
      case 'vaults':
        setVaultsOpen(!isVaultsOpen);
        break;
      case 'myAccount':
        setMyAccountOpen(!isMyAccountOpen);
        break;
      case 'myTeams':
        setMyTeamsOpen(!isMyTeamsOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        
        <li onClick={() => toggleDropdown('tasks')}>
          Tasks {isTasksOpen ? '▲' : '▼'}
          {isTasksOpen && (
            <ul className="dropdown">
              <li><Link to="/tasks/today">Today</Link></li>
              <li><Link to="/tasks/assigned">Assigned to Me</Link></li>
              <li><Link to="/tasks/reported">Reported by Me</Link></li>
              <li><Link to="/tasks/all">All Tasks</Link></li>
            </ul>
          )}
        </li>
        
        <li><Link to="/clients">Clients</Link></li>
        
        <li onClick={() => toggleDropdown('vaults')}>
          Vaults {isVaultsOpen ? '▲' : '▼'}
          {isVaultsOpen && (
            <ul className="dropdown">
              <li><Link to="/vaults/password">Password</Link></li>
              <li><Link to="/vaults/docs">Docs</Link></li>
            </ul>
          )}
        </li>
        
        <li><Link to="/reminder">Reminder</Link></li>

        <li onClick={() => toggleDropdown('myAccount')}>
          My Account {isMyAccountOpen ? '▲' : '▼'}
          {isMyAccountOpen && (
            <ul className="dropdown">
              <li><Link to="/my-account/notifications">Notifications</Link></li>
              <li><Link to="/my-account/leaves">Leaves</Link></li>
            </ul>
          )}
        </li>

        <li onClick={() => toggleDropdown('myTeams')}>
          My Teams {isMyTeamsOpen ? '▲' : '▼'}
          {isMyTeamsOpen && (
            <ul className="dropdown">
              <li><Link to="/my-teams/members">Members</Link></li>
              <li><Link to="/my-teams/leaves">Leaves</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
