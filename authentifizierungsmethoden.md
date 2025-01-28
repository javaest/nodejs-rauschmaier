# Vergleich: Basic Authentication, Session-basierte Authentifizierung, JWT

| **Kriterium**            | **Basic Authentication**                                   | **Session-basierte Authentifizierung**                        | **JWT (JSON Web Token)**                                     |
|---------------------------|----------------------------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------|
| **Definition**            | Sende Benutzername und Passwort mit jeder Anfrage.        | Authentifizierung durch serverseitige Sitzungen.             | Token-basierte Authentifizierung mit selbst-enthaltenen Daten. |
| **Mechanismus**           | Login-Daten (Base64-codiert) im Header jeder Anfrage.     | Sitzungs-ID wird im Cookie gespeichert und serverseitig validiert. | JWT wird vom Server ausgestellt und bei jeder Anfrage gesendet. |
| **Sicherheitslevel**      | Weniger sicher (sensible Daten werden in jeder Anfrage gesendet). | Sicherer (Daten bleiben serverseitig; Cookie-Übertragung).   | Sicher, da Tokens signiert sind und keine Benutzer-Passwörter enthalten. |
| **Statefulness**          | Stateless (keine serverseitige Speicherung).              | Stateful (Server speichert die Sitzungsdaten).               | Stateless (alle Informationen im Token enthalten).          |
| **Token/Speicherort**     | Benutzername/Passwort im Header (Base64).                 | Sitzungs-ID im Cookie, Sitzungsdaten auf dem Server.         | JWT im Header (`Authorization: Bearer <token>`) oder als Cookie. |
| **Server-Last**           | Niedrig (kein Zustand wird auf dem Server gespeichert).   | Hoch (Server speichert Sitzungsdaten für jeden Benutzer).    | Niedrig (kein Zustand auf dem Server).                      |
| **Skalierbarkeit**        | Gut (keine Speicherung von Zuständen).                    | Weniger gut (erfordert zentralisierten oder geteilten Speicher). | Sehr gut (stateless und unabhängig vom Server).             |
| **Dateninhalt**           | Nur Authentifizierungsdaten (Benutzername/Passwort).      | Sitzungsdaten werden auf dem Server gespeichert.             | Enthält Benutzerinformationen (z. B. ID, Rolle, Ablaufzeit). |
| **Speicheranforderung**   | Keine, da keine Zustände gespeichert werden.              | Erfordert serverseitigen Speicher für Sitzungsverwaltung.    | Keine (Token speichert alle Informationen).                 |
| **Expiration (Ablaufzeit)** | Keine integrierte Ablaufzeit.                           | Sitzungen laufen oft manuell oder nach Timeout aus.          | Token hat Ablaufzeit (`exp` im Payload).                    |
| **Datenintegrität**       | Keine (leicht manipulierbar, keine Signatur).             | Sicher (Daten bleiben serverseitig).                        | Signiert und oft verschlüsselt (z. B. mit HMAC oder RSA).   |
| **Nutzung**               | Einfach und schnell für kleine, weniger sichere Anwendungen. | Weit verbreitet in klassischen Webanwendungen.              | Für moderne, skalierbare APIs und Microservices geeignet.   |

---

## **Vorteile und Nachteile**

### **Basic Authentication**
#### Vorteile:
- Einfach zu implementieren.
- Kein Speicherbedarf auf dem Server.

#### Nachteile:
- Nicht sicher (sensible Daten werden in jeder Anfrage übertragen).
- Keine Ablaufzeit.

---

### **Session-basierte Authentifizierung**
#### Vorteile:
- Sicherer als Basic Auth.
- Einfache Sitzungsverwaltung.

#### Nachteile:
- Erfordert serverseitige Verwaltung.
- Weniger skalierbar.

---

### **JWT**
#### Vorteile:
- Stateless.
- Skalierbar.
- Token kann offline validiert werden.

#### Nachteile:
- Token können nach Diebstahl missbraucht werden (falls nicht invalidiert).
- Längere Datenübertragung.
