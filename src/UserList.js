import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => (
    <div>
        <h2>Registered Users</h2>
        <ul>
            {users && users.map((user) => (
                <li key={user.id}>
                    <div className='user-data-container'>
                        <div className='user-data'>
                            <h3 style={{fontFamily:"sans-serif"}}>
                                {user.name}
                            </h3>
                            <ul>
                                <li>
                                    <p> <span style={{fontWeight:"bold"}}>Email</span>  - {user.email}, <span style={{fontWeight:"bold"}}>DOB</span> - [{user.dob}] </p>
                                </li>
                            </ul>

                        </div>
                        <div>
                            <button onClick={() => onEdit(user)}>Edit</button>
                            <button onClick={() => onDelete(user.id)}>Delete</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

export default UserList;
