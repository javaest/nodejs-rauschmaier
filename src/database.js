const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();

// MySQL-Datenbankverbindung
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Passe dies an
    password: 'root',      // Dein MySQL-Passwort
    database: 'test'
});

db.connect(err => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err);
    } else {
        console.log('Mit MySQL verbunden');
    }
});

// Middleware für JSON-Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session-Middleware
app.use(session({
    secret: 'mein-geheimer-schluessel',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
function authenticateSession(req, res, next) {
  if (!req.session.user) {
      return res.status(401).json({ error: 'Nicht authentifiziert' });
  }
  next();
}
// **Login-Seite**
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// **Login-Logik**
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).send('Datenbankfehler');

        if (results.length === 0) return res.status(401).send('Benutzername oder Passwort falsch');

        const user = results[0];

        // Passwort mit BCrypt überprüfen
        const match = bcrypt.compare(password, user.password_hash);
        if (!match) return res.status(401).send('Benutzername oder Passwort falsch');

        req.session.user = username;
        res.redirect('/content');
    });
});

// **Registrierung (Sign-in)**
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signin.html'));
});

app.post('/signin', (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) return res.status(400).send('Fehlender Name oder Passwort');

    // Passwort hashen
    const hashedPassword = bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [name, hashedPassword], (err) => {
        if (err) return res.status(500).send('Fehler bei der Registrierung');

        res.redirect('/login');
    });
});

// **Content-Seite nach dem Login**
app.get('/content', (req, res) => {
    if (!req.session.user) return res.status(403).send('Zugriff verweigert');

    res.sendFile(path.join(__dirname, 'views', 'content.html'));
});
app.get('/get-username', (req, res) => {
    if (req.session.user) {
      res.json({ username: req.session.user });  // Sendet den Benutzernamen an den Client
    } else {
      res.status(401).json({ error: 'Nicht angemeldet' });
    }
  });

// **Logout**
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Fehler beim Abmelden');
        res.status(200).send('Erfolgreich abgemeldet');
    });
});
app.get('/profile', (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
      return res.status(400).json({ error: 'user_id ist erforderlich' });
  }

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
          return res.status(500).json({ error: 'Fehler beim Abrufen' });
      }
      if (results.length === 0) {
          return res.status(404).json({ error: 'Kein Profil gefunden' });
      }
      res.json(results[0]);
  });
});

// **Server starten**
app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
