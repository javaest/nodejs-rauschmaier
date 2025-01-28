const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];
function isAuthorized(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== 'secretpassword') {
    return res.status(401).send('Unauthorized: Access Denied');
  }

  next();
}

// Default-Route
app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});

// Beispielroute
app.post('/api/addusers', isAuthorized, (req, res) => {
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
// Beispielroute
app.get('/api/users', isAuthorized, (req, res) => {
  res.json(users);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
