import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // New state to store user being edited

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (user) => {
    try {
      await axios.post('/api/users', user);
      fetchUsers();
      setEditingUser(null); // Reset the editing user state after adding a new user
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const updateUser = async (user) => {
    try {
      await axios.put(`/api/users/${user.id}`, user); // Make sure `user.id` is available
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
      await axios.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <UserForm user={editingUser} onSubmit={editingUser ? updateUser : addUser} />
      <h2>Users List</h2>
      <ul>
        {users && users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
