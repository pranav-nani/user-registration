import React, { useState, useEffect } from 'react';

function UserForm({ user = {}, onSubmit }) {
    // Initialize the state for user fields (name, email, dob)
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [dob, setDob] = useState(user?.dob || '');

    // Update the form fields whenever the `user` prop changes
    useEffect(() => {
        if (user && user.id) {
            setName(user.name || '');
            setEmail(user.email || '');
            setDob(user.dob || '');
        } else {
            // Reset form when `user` is undefined or `id` is not present (i.e., adding a new user)
            setName('');
            setEmail('');
            setDob('');
        }
    }, [user]); // Runs when the `user` prop changes

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the updated user object, ensuring `id` is set only if available
        const updatedUser = {
            name,
            email,
            dob,
            id: user?.id || null, // If `user.id` exists, use it, otherwise set it to null (for adding a new user)
        };

        // Call the onSubmit function (which handles adding or updating user)
        onSubmit(updatedUser);

        // Reset form fields after submit if adding a new user
        if (!user?.id) {
            setName('');
            setEmail('');
            setDob('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
            />
            <button type="submit">{user?.id ? 'Update User' : 'Add User'}</button>
        </form>
    );
}

export default UserForm;
