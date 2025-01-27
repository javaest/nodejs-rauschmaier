const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


function isAuthorized(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== 'secretpassword') {
    return res.status(401).send('Unauthorized: Access Denied');
  }

  next();
}


app.get('/', isAuthorized, (req, res) => res.send('Hello World!'));

app.get('/users', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'User Userson'
    },
  ]);
});


let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
// Default-Route
app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});

// Beispielroute
app.get('/api/users', (req, res) => {
  res.json(users);
});


app.post('/api/users', isAuthorized, (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Bad Request: Name is required');
  }

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
