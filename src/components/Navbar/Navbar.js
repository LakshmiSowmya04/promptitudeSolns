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
        {/* Dashboard Link */}
        <li className="heading"><Link to="/">Dashboard</Link></li>

        {/* Tasks Section */}
        <li className="heading" onClick={() => toggleDropdown('tasks')}>
          Tasks {isTasksOpen ? '▲' : '▼'}
          {isTasksOpen && (
            <ul className="dropdown">
              <li className="subheading"><Link to="/tasks/today">Today</Link></li>
              <li className="subheading"><Link to="/tasks/assigned">Assigned to Me</Link></li>
              <li className="subheading"><Link to="/tasks/reported">Reported by Me</Link></li>
              <li className="subheading"><Link to="/tasks/all">All Tasks</Link></li>
            </ul>
          )}
        </li>

        {/* Clients Link */}
        <li className="heading"><Link to="/clients">Clients</Link></li>

        {/* Vaults Section */}
        <li className="heading" onClick={() => toggleDropdown('vaults')}>
          Vaults {isVaultsOpen ? '▲' : '▼'}
          {isVaultsOpen && (
            <ul className="dropdown">
              <li className="subheading"><Link to="/vaults/password">Password</Link></li>
              <li className="subheading"><Link to="/vaults/docs">Docs</Link></li>
            </ul>
          )}
        </li>

        {/* Reminder Link */}
        <li className="heading"><Link to="/reminder">Reminder</Link></li>

        {/* My Account Section */}
        <li className="heading" onClick={() => toggleDropdown('myAccount')}>
          My Account {isMyAccountOpen ? '▲' : '▼'}
          {isMyAccountOpen && (
            <ul className="dropdown">
              <li className="subheading"><Link to="/my-account/notifications">Notifications</Link></li>
              <li className="subheading"><Link to="/my-account/leaves">Leaves</Link></li>
            </ul>
          )}
        </li>

        {/* My Teams Section */}
        <li className="heading" onClick={() => toggleDropdown('myTeams')}>
          My Teams {isMyTeamsOpen ? '▲' : '▼'}
          {isMyTeamsOpen && (
            <ul className="dropdown">
              <li className="subheading"><Link to="/my-teams/members">Members</Link></li>
              <li className="subheading"><Link to="/my-teams/leaves">Leaves</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
