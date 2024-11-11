import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import './styles.css';
import UserList from './UserList';
function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // New state to store user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://user-registration-4tvn.vercel.app/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (user) => {
    try {
      await axios.post('https://user-registration-4tvn.vercel.app/api/users', user);
      fetchUsers();
      setEditingUser(null); // Reset the editing user state after adding a new user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (user) => {
    try {
      await axios.put(`https://user-registration-4tvn.vercel.app/api/users/${user.id}`, user); // Make sure `user.id` is available
      fetchUsers();
      setEditingUser(null); // Reset the editing user state after updating
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://user-registration-4tvn.vercel.app/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="user-form-container">
          <h1>User Registration</h1>
          <UserForm user={editingUser} onSubmit={editingUser ? updateUser : addUser} />
        </div>
        <div className="user-list-container">
          <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
  
}

export default App;
