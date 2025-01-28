const express = require('express');
const crypto = require('crypto'); // Für die eindeutige ID-Erzeugung
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
  { id: crypto.randomUUID(), name: 'Alice' },
  { id: crypto.randomUUID(), name: 'Bob' }
];

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Willkommen auf der API! Ergänzen Sie die URL um "/api/users" für den Endpunkt.');
});


app.get('/api/users', (req, res) => {
  res.json(users);
});




app.post('/api/users', (req, res) => {
  if (!req.body.name || typeof req.body.name !== 'string') {
    return res.status(400).json({ error: 'Name ist erforderlich und muss ein String sein.' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: req.body.name

  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
