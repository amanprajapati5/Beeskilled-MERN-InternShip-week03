import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setLoading(true);

      const newTask = await createTask({
        title: title.trim(),
        description: description.trim()
      });

      onTaskCreated(newTask);

      setTitle("");
      setDescription("");
      setMessage("Task created successfully!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      {/* FORM HEADER */}

      <div className="form-heading">

        <div className="form-icon">
          +
        </div>

        <div>
          <span className="section-eyebrow">
            NEW TASK
          </span>

          <h2>Create a task</h2>

          <p>
            Add something you want to accomplish.
          </p>
        </div>

      </div>

      {/* FORM FIELDS */}

      <div className="form-fields">

        <div className="form-field">

          <label htmlFor="task-title">
            Task title
          </label>

          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="e.g. Finish MERN project"
            required
          />

        </div>

        <div className="form-field">

          <label htmlFor="task-description">
            Description
          </label>

          <textarea
            id="task-description"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Add some details about this task..."
          />

        </div>

      </div>

      {/* FORM FOOTER */}

      <div className="form-footer">

        <span className="form-hint">
          Keep your tasks clear and actionable.
        </span>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}

          {!loading && (
            <span>→</span>
          )}
        </button>

      </div>

      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="alert success-alert">
          ✓ {message}
        </div>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <div className="alert error-alert">
          {error}
        </div>
      )}

    </form>
  );
}

export default TaskForm;