import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-header">
          <div>
            <h1>Task Dashboard</h1>
            <p>View and manage your tasks in one place.</p>
          </div>

          <button type="button">Create Task</button>
        </section>

        <section className="task-list">
          <h2>My Tasks</h2>

          <div className="empty-state">
            <p>No tasks available yet.</p>
            <span>Create your first task to get started.</span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;