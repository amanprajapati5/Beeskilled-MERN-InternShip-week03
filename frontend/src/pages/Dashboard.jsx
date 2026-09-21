import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { getTasks } from "../services/taskService";
import ImageUpload from "../components/ImageUpload";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <p>Manage your tasks and stay productive.</p>
      </div>

      <TaskForm
        onTaskCreated={(newTask) => {
          setTasks((currentTasks) => [
            newTask,
            ...currentTasks
          ]);
        }}
      />
      <ImageUpload />

      <section className="tasks-section">

        <h2>Your Tasks</h2>

        {error && <p>{error}</p>}

        {tasks.length === 0 ? (
          <p>No tasks found. Create your first task!</p>
        ) : (
          <div className="task-list">

            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}

                onTaskDeleted={(deletedTaskId) => {
                  setTasks((currentTasks) =>
                    currentTasks.filter(
                      (task) =>
                        task._id !== deletedTaskId
                    )
                  );
                }}

                onTaskUpdated={(updatedTask) => {
                  setTasks((currentTasks) =>
                    currentTasks.map((task) =>
                      task._id === updatedTask._id
                        ? updatedTask
                        : task
                    )
                  );
                }}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Dashboard;