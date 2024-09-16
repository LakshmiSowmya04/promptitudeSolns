import React, { useState } from "react";
import "./Members.css";
import { useEffect } from "react";
import axios from "axios";

// User Class
class User {
  constructor(
    user_id,
    name,
    role,
    phone_number,
    email_id,
    alternate_pho_no,
    status,
    clients,
    reporting_to,
    tasks,
    password
  ) {
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
// const teamMembers = [
//   new User(1, "John Doe", "Admin", "123-456-7890", "john@example.com", "111-222-3333", true, ["Client A"], "Jane Smith", ["Task 1"], "hashed_password_1"),
//   new User(2, "Jane Smith", "Member", "123-456-7891", "jane@example.com", "222-333-4444", true, ["Client B"], "John Doe", ["Task 2"], "hashed_password_2"),
//   new User(3, "Emily Clark", "Member", "123-456-7896", "emily@example.com", "777-888-9999", true, ["Client F"], "John Doe", ["Task 7"], "hashed_password_6"),
//   new User(4, "Michael Brown", "Manager", "123-456-7897", "michael@example.com", "888-999-0000", true, ["Client G"], "Jane Smith", ["Task 8", "Task 9"], "hashed_password_7"),
// ];

const Members = () => {
  const [team, setTeam] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State for Add Modal
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    role: "",
    phone_number: "",
    email_id: "",
    alternate_pho_no: "",
    reporting_to: "",
    tasks: [],
    clients: [],
  });
  const [error, setError] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // doi get call only admin is the on who is calling
  useEffect(() => {
    axios
      .get("http://localhost:5000/users", { params: { role: "Admin" } })
      .then((response) => {
        setTeam(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Filtered team members based on search term
  const filteredTeam = team.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMore = (user) => {
    alert(`User Details:
      User ID: ${user.user_id}
      Name: ${user.name}
      Role: ${user.role}
      Phone Number: ${user.phone_number}
      Email ID: ${user.email_id}
      Alternate Phone Number: ${user.alternate_pho_no}
      Status: ${user.status ? "Active" : "Inactive"}
      Clients: ${user.clients.join(", ")}
      Reporting To: ${user.reporting_to}
      Tasks: ${user.tasks.join(", ")}
      Password: ${user.password}`);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdateModalOpen(true);
  };

  const handlePasswordChange = (user) => {
    setSelectedUser(user);
    setPasswordModalOpen(true);
  };

  const handleUpdateUser = () => {
    console.log("Selected User:", selectedUser); // Log the selected user before making the request
    if (!selectedUser._id) {
      console.error("User ID is missing!");
      return;
    }

    axios
      .put(`http://localhost:5000/users/${selectedUser._id}`, {
        name: selectedUser.name,
        role: selectedUser.role,
        reporting_to: selectedUser.reporting_to,
      })
      .then((response) => {
        const updatedTeam = team.map((u) =>
          u._id === selectedUser._id ? response.data.data : u
        );
        setTeam(updatedTeam);
        setUpdateModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setError("Password fields cannot be blank.");
      return;
    }
    if (newPassword === confirmPassword) {
      axios
        .put(`http://localhost:5000/users/${selectedUser.user_id}/password`, {
          new_password: newPassword,
        })
        .then((response) => {
          setPasswordModalOpen(false);
          setError("");
          alert("Password updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
    } else {
      setError("Passwords do not match.");
    }
  };

  const handleAddMember = () => {
    const memberData = {
      ...newUser,
      status: true,
      password: newUser.password || "default_password", // Provide defaul
    };
    axios
      .post("http://localhost:5000/users", memberData)
      .then((response) => {
        setTeam([...team, response.data.data]);
        setAddModalOpen(false);
        // MUST KEEP ROLE AS "Admin" TO ADD USER
        setNewUser({
          name: "",
          role: "",
          phone_number: "",
          email_id: "",
          alternate_pho_no: "",
          reporting_to: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error);
        console.error("Error adding new member:", error);
      });
    setTeam([...team, memberData]);
    setAddModalOpen(false);
    setNewUser({
      name: "",
      role: "",
      phone_number: "",
      email_id: "",
      alternate_pho_no: "",
      reporting_to: "",
    });
  };

  const handleAddButtonClick = () => {
    setAddModalOpen(true);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleToggleStatus = (user) => {
    axios
      .put(`http://localhost:5000/users/${user.user_id}/status`, {
        status: !user.status,
      })
      .then((response) => {
        const updatedTeam = team.map((u) =>
          u.user_id === user.user_id ? { ...u, status: !u.status } : u
        );
        setTeam(updatedTeam);
      })
      .catch((error) => {
        console.error("Error toggling status:", error);
      });
  };

  return (
    <div className="members-container">
      <h1>Team Members</h1>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-member-btn" onClick={handleAddButtonClick}>
          Add Member
        </button>
      </div>
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
          {filteredTeam.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.status ? "Active" : "Inactive"}</td>
              <td>{member.clients.join(", ")}</td>
              <td>{member.tasks.join(", ")}</td>
              <td>{member.reporting_to}</td>
              <td>
                <div className="dropdown">
                  <button
                    className="kebab-menu"
                    onClick={() => toggleDropdown(index)}
                  >
                    ⋮
                  </button>
                  {openDropdown === index && (
                    <ul className="dropdown-menu">
                      <li onClick={() => handleViewMore(member)}>View More</li>
                      <li onClick={() => handleUpdate(member)}>Update</li>
                      <li onClick={() => handlePasswordChange(member)}>
                        Change Password
                      </li>
                      <li onClick={() => handleToggleStatus(member)}>
                        {member.status ? "Disable" : "Enable"}
                      </li>
                    </ul>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isUpdateModalOpen && (
        <div className="modal">
          <h2>Update User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser(selectedUser);
            }}
          >
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />
            <br />
            <label>Role: </label>
            <input
              type="text"
              name="role"
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            />
            <br />
            <label>Reporting To: </label>
            <input
              type="text"
              name="reporting_to"
              value={selectedUser.reporting_to}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser,
                  reporting_to: e.target.value,
                })
              }
            />
            <br />
            <div className="button-container">
              <button className="update-btn" type="submit">
                Update
              </button>
              <button
                className="close-btn"
                type="button"
                onClick={() => setUpdateModalOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="modal">
          <h2>Change Password</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <label>New Password: </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <br />
            <label>Confirm Password: </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            {error && <p className="error">{error}</p>}
            <div className="button-container">
              <button className="update-btn" type="submit">
                Change Password
              </button>
              <button
                className="close-btn"
                type="button"
                onClick={() => setPasswordModalOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal">
          <h2>Add New Member</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddMember();
            }}
          >
            <label>Name: </label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <br />
            <label>Role: </label>
            <input
              type="text"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
            <br />
            <label>Email ID: </label>
            <input
              type="email"
              value={newUser.email_id}
              onChange={(e) =>
                setNewUser({ ...newUser, email_id: e.target.value })
              }
            />
            <br />
            <label>Phone Number: </label>
            <input
              type="text"
              value={newUser.phone_number}
              onChange={(e) =>
                setNewUser({ ...newUser, phone_number: e.target.value })
              }
            />
            <br />
            <label>Alternate Phone Number: </label>
            <input
              type="text"
              value={newUser.alternate_pho_no}
              onChange={(e) =>
                setNewUser({ ...newUser, alternate_pho_no: e.target.value })
              }
            />
            <br />
            <label>Phone Number: </label>
            <input
              type="text"
              value={newUser.phone_number}
              onChange={(e) =>
                setNewUser({ ...newUser, phone_number: e.target.value })
              }
            />
            <br />
            <label>Alternate Phone Number: </label>
            <input
              type="text"
              value={newUser.alternate_pho_no}
              onChange={(e) =>
                setNewUser({ ...newUser, alternate_pho_no: e.target.value })
              }
            />
            <br />
            <label>Reporting To: </label>
            <input
              type="text"
              value={newUser.reporting_to}
              onChange={(e) =>
                setNewUser({ ...newUser, reporting_to: e.target.value })
              }
            />
            <br />
            <div className="button-container">
              <button className="update-btn" type="submit">
                Add Member
              </button>
              <button
                className="close-btn"
                type="button"
                onClick={() => setAddModalOpen(false)}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Members;
