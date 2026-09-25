import { useState } from "react";
import { deleteTask, updateTask } from "../services/taskService";

function TaskCard({
  task,
  onTaskDeleted,
  onTaskUpdated
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(task.title);

  const [description, setDescription] = useState(
    task.description || ""
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setLoading(true);

      await deleteTask(task._id);

      onTaskDeleted(task._id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async () => {
    try {
      setError("");
      setLoading(true);

      const updatedTask = await updateTask(
        task._id,
        {
          completed: !task.completed
        }
      );

      onTaskUpdated(updatedTask);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setError("");
      setLoading(true);

      const updatedTask = await updateTask(
        task._id,
        {
          title: title.trim(),
          description: description.trim()
        }
      );

      onTaskUpdated(updatedTask);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description || "");
    setError("");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="task-card editing-card">

        <div className="edit-header">
          <div>
            <span className="section-eyebrow">
              EDIT TASK
            </span>

            <h3>Update your task</h3>
          </div>
        </div>

        <form onSubmit={handleEditSubmit}>

          <div className="form-field">
            <label htmlFor={`edit-title-${task._id}`}>
              Task title
            </label>

            <input
              id={`edit-title-${task._id}`}
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Task title"
              required
            />
          </div>

          <div className="form-field">
            <label
              htmlFor={`edit-description-${task._id}`}
            >
              Description
            </label>

            <textarea
              id={`edit-description-${task._id}`}
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Task description"
            />
          </div>

          <div className="task-actions edit-actions">

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              className="secondary-button"
              onClick={handleCancelEdit}
              disabled={loading}
            >
              Cancel
            </button>

          </div>

          {error && (
            <div className="alert error-alert">
              {error}
            </div>
          )}

        </form>

      </article>
    );
  }

  return (
    <article
      className={`task-card ${
        task.completed ? "completed-card" : ""
      }`}
    >

      <div className="task-card-top">

        <span
          className={`status-badge ${
            task.completed
              ? "status-completed"
              : "status-pending"
          }`}
        >
          <span className="status-dot"></span>

          {task.completed
            ? "Completed"
            : "Pending"}
        </span>

        <button
          type="button"
          className="icon-button"
          onClick={() => {
            setError("");
            setIsEditing(true);
          }}
          disabled={loading}
          aria-label="Edit task"
        >
          ✎
        </button>

      </div>

      <div className="task-content">

        <h3>{task.title}</h3>

        {task.description ? (
          <p>{task.description}</p>
        ) : (
          <p className="no-description">
            No description added.
          </p>
        )}

      </div>

      <div className="task-card-footer">

        <span className="task-status-text">
          {task.completed
            ? "Task completed"
            : "Waiting to be completed"}
        </span>

        <div className="task-actions">

          <button
            type="button"
            className={
              task.completed
                ? "secondary-button"
                : "complete-button"
            }
            onClick={handleToggleComplete}
            disabled={loading}
          >
            {task.completed
              ? "Mark pending"
              : "Complete"}
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "..." : "Delete"}
          </button>

        </div>

      </div>

      {error && (
        <div className="alert error-alert">
          {error}
        </div>
      )}

    </article>
  );
}

export default TaskCard;