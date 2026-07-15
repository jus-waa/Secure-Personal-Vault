# 🔐 Sky Vault — Secure Personal Vault

A full-stack web application for securely storing personal notes and sensitive information. Built on the **MERN stack** (MongoDB, Express, React, Node.js), Sky Vault combines account-level authentication with per-note encryption and locking, so users can keep private notes safe even within their own vault.

## Features

- **Email/password authentication** with email verification, JWT-based sessions (via HTTP-only cookies), and password reset flow
- **Encrypted notes** — note content is encrypted server-side using **AES-256-CBC** before being stored in MongoDB
- **Per-note locking** — individual notes can be locked behind their own password, separate from the account password, with a credential-based unlock and a "forgot password" recovery path for locked notes
- **Note organization** — pinning and tagging support
- **Password strength meter** on signup for stronger account security
- **Transactional email** for verification and password reset (Gmail via Nodemailer, with Mailtrap support scaffolded in)
- **Hardened API** — Helmet for HTTP security headers, CORS restricted to the frontend origin, and request logging via Morgan

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router
- Zustand (state management)
- Tailwind CSS
- Axios
- Framer Motion, React Hot Toast, React Icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (`jsonwebtoken`) for auth
- `bcryptjs` for password hashing
- Node's built-in `crypto` module for AES-256-CBC note encryption
- Nodemailer for transactional email
- Helmet, CORS, Morgan, cookie-parser

## Project Structure

```
Secure-Personal-Vault/
├── backend/
│   ├── controllers/     # Auth and notes business logic
│   ├── db/               # MongoDB connection
│   ├── emails/           # Email templates and mail transport config
│   ├── middleware/       # Auth/token validation
│   ├── models/           # Mongoose schemas (User, Note)
│   ├── routes/           # Express route definitions
│   ├── utils/            # Encryption, token helpers
│   └── server.js         # App entry point
└── frontend/
    └── src/
        ├── components/   # Reusable UI components
        ├── routes/        # Page-level components (Login, Signup, Notes, Settings...)
        ├── store/         # Zustand stores (auth, notes)
        └── utils/         # Axios instance, helpers
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) for sending emails (or a Mailtrap account for testing)

### 1. Clone the repository
```bash
git clone https://github.com/jus-waa/Secure-Personal-Vault.git
cd Secure-Personal-Vault
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
ENCRYPTION_SECRET_KEY=your_32_byte_encryption_key
CLIENT_URL=http://localhost:5173
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```
> ⚠️ `ENCRYPTION_SECRET_KEY` must be exactly 32 bytes (32 characters) since it's used as an AES-256 key.

Run the backend:
```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and communicate with the backend at `http://localhost:5000`.

## API Overview

All endpoints are prefixed with `/api/v1`.

**Auth** (`/auth`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/signup` | Register a new account |
| POST | `/login` | Log in and receive a session cookie |
| POST | `/logout` | End the session |
| POST | `/verify-email` | Verify account via emailed code |
| POST | `/resend-verification-code` | Resend the verification code |
| POST | `/forgot-password` | Request a password reset email |
| POST | `/reset-password/:token` | Reset password using emailed token |
| GET | `/check-auth` | Check current session validity |
| GET | `/get-user` | Get the logged-in user's profile |

**Notes** (`/notes`, all require authentication)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/get-all-notes` | Fetch all notes for the user |
| GET | `/get-note/:noteId` | Fetch a single note |
| POST | `/add-note` | Create a new note |
| PUT | `/edit-note/:noteId` | Edit an existing note |
| DELETE | `/delete-note/:noteId` | Delete a note |
| PATCH | `/update-pinned-note/:noteId` | Pin/unpin a note |
| POST | `/lock-note/:noteId` | Lock a note with its own password |
| POST | `/unlock-note/:noteId` | Unlock a note |
| POST | `/unlock-note-by-credentials/:noteId` | Unlock using account credentials |
| POST | `/delete-locked/:noteId` | Delete a locked note |
| POST | `/forgot-password-unlock/:noteId` | Recover access to a locked note |

## Security Notes

- Note content is encrypted at rest using AES-256-CBC with a per-note random IV.
- Passwords are hashed with bcrypt before storage.
- Sessions are managed via HTTP-only cookies containing signed JWTs.
- API responses are hardened with Helmet's default security headers.

## Contributing

Contributions are welcome. Please open an issue to discuss significant changes before submitting a pull request.

## License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software for personal or commercial projects, provided that the original copyright and license notice are included. 
