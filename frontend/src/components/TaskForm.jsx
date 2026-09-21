import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    try {
      const newTask = await createTask({
        title,
        description
      });

      onTaskCreated(newTask);

      setMessage("Task created successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <label>Task Title</label>

      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What do you need to do?"
        required
      />

      <br />
      <br />

      <label>Description</label>

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Add some details..."
      />

      <br />

      <button type="submit">+ Add Task</button>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </form>
  );
}

export default TaskForm;