import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  async function fetchTasks() {
    try {
      const response = await fetch(`${API_URL}/tasks/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        setMessage("Unable to load tasks.");
      }
    } catch {
      setMessage("Unable to connect to the backend API.");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleEditChange(event) {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleCreateTask(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Task created successfully.");
        setFormData({
          title: "",
          description: "",
          status: "todo",
        });
        fetchTasks();
      } else {
        setMessage("Unable to create task.");
      }
    } catch {
      setMessage("Unable to connect to the backend API.");
    }
  }

  function handleViewTask(task) {
    setEditingTaskId(null);
    setSelectedTask(selectedTask?.id === task.id ? null : task);
  }

  function handleStartEdit(task) {
    setSelectedTask(null);
    setEditingTaskId(editingTaskId === task.id ? null : task.id);
    setEditData({
        title: task.title,
        description: task.description,
        status: task.status,
    });
}

  function handleCancelEdit() {
    setEditingTaskId(null);
  }

  async function handleUpdateTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setMessage("Task updated successfully.");
        setEditingTaskId(null);
        fetchTasks();
      } else {
        setMessage("Unable to update task.");
      }
    } catch {
      setMessage("Unable to connect to the backend API.");
    }
  }

  async function handleDeleteTask(taskId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok || response.status === 204) {
        setMessage("Task deleted successfully.");
        fetchTasks();
      } else {
        setMessage("Unable to delete task.");
      }
    } catch {
      setMessage("Unable to connect to the backend API.");
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    }
  }

  return (
    <>
      <Navbar
        isAuthenticated={true}
        username={localStorage.getItem("username") || "User"}
        onLogout={handleLogout}
      />

      <main className="dashboard-page">
        <section className="dashboard-header">
          <div>
            <h1>Task Dashboard</h1>
            <p>View and manage your tasks in one place.</p>
          </div>
        </section>

        <section className="task-list">
          <h2>Create Task</h2>

          {message && <p className="form-message">{message}</p>}

          <form className="task-form" onSubmit={handleCreateTask}>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Task description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button type="submit">Create Task</button>
          </form>
        </section>

        <section className="task-list">
          <h2>My Tasks</h2>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks available yet.</p>
              <span>Create your first task to get started.</span>
            </div>
          ) : (
            <div className="task-grid">
              {tasks.map((task) => (
                <article className="task-card" key={task.id}>
                  {editingTaskId === task.id ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                      />

                      <textarea
                        name="description"
                        value={editData.description}
                        onChange={handleEditChange}
                      />

                      <select
                        name="status"
                        value={editData.status}
                        onChange={handleEditChange}
                      >
                        <option value="todo">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>

                      <div className="task-actions">
                        <button
                          type="button"
                          onClick={() => handleUpdateTask(task.id)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="secondary-action"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3>{task.title}</h3>

                      {selectedTask?.id === task.id && (
                        <div className="task-expanded">
                            <p>
                                <strong>Description:</strong>{" "}
                                {task.description || "No description provided."}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {task.status === "todo"
                                    ? "To Do"
                                    : task.status === "in_progress"
                                    ? "In Progress"
                                    : "Completed"}
                            </p>
                        </div>
                      )}

                      <div className="task-actions">
                        <button type="button" onClick={() => handleViewTask(task)}>
                            {selectedTask?.id === task.id ? "Hide" : "View"}
                        </button>
                        <button
                          type="button"
                          className="secondary-action"
                          onClick={() => handleStartEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="danger-action"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;