# Liebe FTIT,

In der folgenden Aufgabe soll eine Webseite mit den folgenden Seiten erstellt werden:

1. **Startseite**: Diese Seite zeigt an, ob der Benutzer angemeldet ist oder nicht. Ist der Benutzer angemeldet, wird ein Link zum Inhalt angezeigt. Ist der Benutzer nicht angemeldet, sollen Links zur **Registrierungsseite** und zur **Login-Seite** eingeblendet werden. Ändern Sie hierzu mittels DOM-Manipulation das `innerHTML`-Attribut, um HTML-Tags mit Verlinkungen zu den jeweiligen Seiten einzufügen (siehe JS-Logig der content.html Seite).

2. **Registrierungsseite**: Auf dieser Seite hat der Benutzer die Möglichkeit, sich mit einem neuen Benutzernamen und Passwort zu registrieren.

3. **Login-Seite**: Auf dieser Seite kann sich der Benutzer mit seinem Benutzernamen und Passwort anmelden. Nach einer erfolgreichen Anmeldung erfolgt eine Weiterleitung zur **Content-Seite**.

4. **Content-Seite**: Zeigt den Inhalt sowie den Benutzernamen an, wenn eine Session existiert.

## Bereits vorhandene Inhalte:
- **views/content.html**: Content-Seite
- **views/login.html**: Login-Formular zur Prüfung der Anmeldedaten.
- **session.js**: Enthält bereits Routen für die vorhandenen Seiten, einen GET-Endpunkt zum Abrufen des Benutzernamens, einen Login-Endpunkt zur Überprüfung der Anmeldedaten (aktuell statisch) und eine Weiterleitung bei erfolgreicher Anmeldung.

Die gesamte Benutzerverwaltung soll über **Sessions** implementiert werden, um den Anmelde- und Registrierungsstatus des Benutzers zu verwalten. Nach erfolgreicher Anmeldung wird eine Session erstellt, die den Benutzer als angemeldet kennzeichnet. 

**Hinweis**: Die Registrierungsseite wurde bereits im letzten Präsenzunterricht gemeinsam erarbeitet.

