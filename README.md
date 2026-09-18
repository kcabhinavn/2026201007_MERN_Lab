A full-stack, decoupled notes management application built with MongoDB, Express, React (Vite), and Node.js. Supports creating, listing, and deleting notes. 

## Tech Stack

- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose ODM)

## Project Structure

```
notes-app/
|-- server/     
|-- client/    
|-- screenshots/
```

## Prerequisites

- Node.js (v18+ recommended)
- npm
- A running local MongoDB instance (`mongod`) listening on the default port `27017`

## Setup & Run Instructions

### 1. Clone and enter the project

```bash
git clone <your-repo-url>
cd notes-app
```

### 2. Start MongoDB

Make sure a local MongoDB daemon is running, e.g.:

```bash
mongod
```

The server connects by default to `mongodb://localhost:27017/notes_db` 

### 3. Backend setup

```bash
cd server
npm install
npm start
```

Because of macos using an application in port 5000 already, The API server starts on **http://localhost:5001**.

You should see in the terminal:
```
[db] Connected to MongoDB at mongodb://localhost:27017/notes_db
[server] Listening on http://localhost:5001
```

### 4. Frontend setup

Open a new terminal window:

```bash
cd client
npm install
npm run dev
```

The React app starts on **http://localhost:5173**.

### 5. Use the app

Open [http://localhost:5173](http://localhost:5173) in your browser. You can:
- Add a note (title + content)
- View all notes, newest first
- Delete a note (updates instantly, no refresh)

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| POST   | `/api/notes`         | Create a new note (201 Created)       |
| GET    | `/api/notes`         | Get all notes, newest first           |
| DELETE | `/api/notes/:id`     | Delete a note by ID (200 OK / 404)    |

### Testing endpoints manually (curl examples)

```bash
# Create a note
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Hello world"}'

# Get all notes
curl http://localhost:5001/api/notes

# Delete a note
curl -X DELETE http://localhost:5001/api/notes/<note_id>
```

## Screenshots

See the `screenshots/` folder:
- `ui-preview.png`
- `delete-action.png` 