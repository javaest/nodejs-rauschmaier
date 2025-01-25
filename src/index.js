const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

app.use(express.json());

// Default-Route
app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});

// Beispielroute
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1, 
    name: req.body.name
  };
  users.push(newUser); 
  res.status(201).json(newUser);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
