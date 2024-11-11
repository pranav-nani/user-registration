import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => (
    <div>
        <h2>Registered Users</h2>
        <ul>
            {users && users.map((user) => (
                <li key={user.id}>
                    {user.name} ({user.email}, {user.dob})
                    <button onClick={() => onEdit(user)}>Edit</button>
                    <button onClick={() => onDelete(user.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
);

export default UserList;
