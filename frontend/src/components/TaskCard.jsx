import { deleteTask, updateTask } from "../services/taskService";

function TaskCard({ task, onTaskDeleted }) {
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);

      onTaskDeleted(task._id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleComplete = async () => {
  try {
    const updatedTask = await updateTask(task._id, {
      completed: !task.completed
    });

    console.log("Task updated:", updatedTask);
  } catch (error) {
    console.error(error.message);
  }
};

  return (
    <div>
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Status: {task.completed ? "Completed" : "Pending"}
      </p>

      <button type="button">Edit</button>

<button type="button" onClick={handleDelete}>
  Delete
</button>

<button type="button" onClick={handleToggleComplete}>
  {task.completed ? "Mark Pending" : "Mark Complete"}
</button>
    </div>
  );
}

export default TaskCard;