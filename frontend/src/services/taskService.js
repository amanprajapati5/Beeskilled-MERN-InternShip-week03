const API_URL = "http://localhost:5000/api/tasks";

const getToken = () => {
  return localStorage.getItem("token");
};

// GET ALL TASKS
export const getTasks = async () => {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch tasks");
  }

  return data;
};

// CREATE TASK
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create task");
  }

  return data;
};

// UPDATE TASK
export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(taskData)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update task");
  }

  return data;
};

// DELETE TASK
export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete task");
  }

  return data;
};