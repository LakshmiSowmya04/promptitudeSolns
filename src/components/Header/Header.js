// import React from 'react';
// import './Header.css';

// function Header() {
//   return (
//     <div className="header">
//       <h1>Promptitude</h1>
//     </div>
//   );
// }

// export default Header;

import React from 'react';
import { FaUser, FaBell } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom'; // Import Link for routing
import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1>Promptitude</h1>
      <div className="header-icons">
        <Link to="/notifications">
          <FaBell className="icon" />
        </Link>
        <Link to="/profile">
          <FaUser className="icon" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
