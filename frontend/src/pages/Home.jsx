import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Manage your tasks efficiently.</h1>

            <p>
              TaskSphere helps small teams and freelancers organize, track,
              and manage daily tasks in one simple workspace.
            </p>
          </div>
        </section>

        <section className="features">
          <h2>Core Features</h2>

          <div className="feature-grid">
            <article>
              <h3>Create Tasks</h3>
              <p>Add task titles and descriptions to organise daily work.</p>
            </article>

            <article>
              <h3>Track Status</h3>
              <p>Update tasks as To Do, In Progress, or Completed.</p>
            </article>

            <article>
              <h3>Manage Tasks</h3>
              <p>Edit or delete tasks when priorities change.</p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;