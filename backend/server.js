const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', dob: '1990-01-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', dob: '1985-02-15' }
];

app.get('/',(req,res)=>{
    res.send("223");
})

// Fetch all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length + 1; // Simple ID generation
    users.push(newUser);
    res.json(newUser);
});

// Update a user
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    let userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((user) => user.id !== userId);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
