import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const API_URL = "http://localhost:5001/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(API_URL);
      setNotes(res.data);
      setError("");
      console.log(`[client] GET /api/notes -> 200 (${res.data.length} note(s))`, res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Could not load notes. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await axios.post(API_URL, { title, content });
      console.log("[client] POST /api/notes -> 201", res.data);
      setNotes((prevNotes) => [res.data, ...prevNotes]);
      setTitle("");
      setContent("");
      setError("");
    } catch (err) {
      console.error("Error creating note:", err);
      setError("Could not save the note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log(`[client] DELETE /api/notes/${id} -> 200`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setError("");
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Could not delete the note. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="app-container">
      <header>
        <h1>Notability</h1>
        <p className="subtitle">Notes from the future.</p>
      </header>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Note"}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <section className="notes-list">
        {isLoading ? (
          <p className="status-message">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="status-message">No notes yet — add one above!</p>
        ) : (
          notes.map((note) => (
            <div className="note-card" key={note._id}>
              <div className="note-card-header">
                <h3>{note.title}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note._id)}
                  aria-label={`Delete note titled ${note.title}`}
                >
                  Delete
                </button>
              </div>
              <p className="note-content">{note.content}</p>
              <span className="note-date">{formatDate(note.createdAt)}</span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default App;
