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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <main className="dashboard">

      {/* HERO */}

      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">WORKSPACE</span>

          <h1>Stay organized. Get things done.</h1>

          <p>
            Manage your daily tasks, track your progress,
            and keep everything in one place.
          </p>
        </div>

        <div className="hero-decoration">
          <span>✓</span>
        </div>
      </section>

      {/* STATISTICS */}

      <section className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon total-icon">◎</div>

          <div>
            <span className="stat-label">Total Tasks</span>
            <strong>{totalTasks}</strong>
          </div>

          <span className="stat-description">
            All tasks
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed-icon">✓</div>

          <div>
            <span className="stat-label">Completed</span>
            <strong>{completedTasks}</strong>
          </div>

          <span className="stat-description">
            {completionPercentage}% completed
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon">◷</div>

          <div>
            <span className="stat-label">Pending</span>
            <strong>{pendingTasks}</strong>
          </div>

          <span className="stat-description">
            Need attention
          </span>
        </div>

      </section>

      {/* MAIN CONTENT */}

      <section className="dashboard-content">

        <div className="main-column">

          <TaskForm
            onTaskCreated={(newTask) => {
              setTasks((currentTasks) => [
                newTask,
                ...currentTasks
              ]);
            }}
          />

          <section className="tasks-section">

            <div className="section-heading">
              <div>
                <span className="section-eyebrow">
                  YOUR WORK
                </span>

                <h2>Your Tasks</h2>
              </div>

              <span className="task-count">
                {totalTasks} {totalTasks === 1 ? "task" : "tasks"}
              </span>
            </div>

            {error && (
              <div className="alert error-alert">
                {error}
              </div>
            )}

            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✓</div>

                <h3>No tasks yet</h3>

                <p>
                  Create your first task above and start
                  organizing your day.
                </p>
              </div>
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

        </div>

        <aside className="side-column">

          <div className="progress-card">

            <div className="section-heading compact">
              <div>
                <span className="section-eyebrow">
                  PROGRESS
                </span>

                <h2>Overview</h2>
              </div>

              <strong className="progress-number">
                {completionPercentage}%
              </strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${completionPercentage}%`
                }}
              ></div>
            </div>

            <p>
              {completedTasks === totalTasks && totalTasks > 0
                ? "Great work! All your tasks are complete."
                : `${pendingTasks} ${
                    pendingTasks === 1 ? "task remains" : "tasks remain"
                  } to be completed.`}
            </p>

          </div>

          <ImageUpload />

        </aside>

      </section>

    </main>
  );
}

export default Dashboard;