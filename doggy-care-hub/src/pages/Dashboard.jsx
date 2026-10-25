
const dogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    emoji: "🐕",
    status: "Healthy care routine",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Shih Tzu",
    age: "8 months",
    emoji: "🐩",
    status: "Growing puppy",
  },
];

const reminders = [
  {
    id: 1,
    icon: "💉",
    title: "Vaccination review",
    dog: "Buddy",
    date: "Oct 28, 2026",
    type: "Vaccination",
  },
  {
    id: 2,
    icon: "🥣",
    title: "Review feeding routine",
    dog: "Luna",
    date: "Oct 30, 2026",
    type: "Nutrition",
  },
  {
    id: 3,
    icon: "🩺",
    title: "Preventive care check",
    dog: "Buddy",
    date: "Nov 02, 2026",
    type: "Preventive care",
  },
];

export default function Dashboard() {
  return (
    <main className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <a href="/" className="brand dashboard-brand">
          <span className="brand-mark">🐾</span>
          <span>
            Doggy<span className="brand-accent">Care</span>Hub
          </span>
        </a>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <a className="sidebar-link active" href="/dashboard">
            <span>▦</span> Dashboard
          </a>
          <a className="sidebar-link" href="/dogs">
            <span>🐕</span> My Dogs
          </a>
          <a className="sidebar-link" href="/vaccinations">
            <span>💉</span> Vaccinations
          </a>
          <a className="sidebar-link" href="/reminders">
            <span>◷</span> Reminders
          </a>
          <a className="sidebar-link" href="/care-guidance">
            <span>♡</span> Care Guidance
          </a>
          <a className="sidebar-link" href="/assistant">
            <span>💬</span> AI Care Assistant
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="sidebar-link" href="/profile">
            <span>⚙</span> Settings
          </a>
          <a className="sidebar-link" href="/">
            <span>↪</span> Log out
          </a>
          <div className="sidebar-help">
            <span>💚</span>
            <strong>Every tail matters.</strong>
            <p>Small steps make happier, healthier dogs.</p>
          </div>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="dashboard-breadcrumb">
              Doggy Care Hub / Dashboard
            </span>
            <h1>Dashboard</h1>
          </div>

          <a className="dashboard-avatar" href="/profile" aria-label="My profile">
            V
          </a>
        </header>

        <div className="dashboard-content">
          <section className="welcome-banner">
            <div>
              <span className="welcome-eyebrow">YOUR DOG CARE SPACE</span>
              <h2>Welcome back, John! 🐾</h2>
              <p>
                Every little step counts towards a happier, healthier life
                for your best friend.
              </p>
              <a className="button button-primary" href="/dogs">
                View My Dogs
              </a>
            </div>
            <div className="welcome-art" aria-hidden="true">
              🐕
            </div>
          </section>

          <section className="dashboard-stats">
            <article className="stat-card">
              <span className="stat-icon">🐶</span>
              <div>
                <p>Registered Dogs</p>
                <strong>02</strong>
                <small>Your furry family</small>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon">💉</span>
              <div>
                <p>Vaccination Records</p>
                <strong>08</strong>
                <small>Sample records</small>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon">📅</span>
              <div>
                <p>Upcoming Reminders</p>
                <strong>03</strong>
                <small>Next 7 days</small>
              </div>
            </article>
          </section>

          <section className="dashboard-section">
            <div className="section-title-row">
              <div>
                <span className="dashboard-section-label">YOUR COMPANIONS</span>
                <h2>My Dogs</h2>
              </div>
              <a className="text-link" href="/dogs">View all →</a>
            </div>

            <div className="dog-grid">
              {dogs.map((dog) => (
                <article className="dog-card" key={dog.id}>
                  <div className="dog-card-art">
                    <span>{dog.emoji}</span>
                    <span className="dog-status">● Active</span>
                  </div>
                  <div className="dog-card-body">
                    <h3>{dog.name}</h3>
                    <p>{dog.breed}</p>
                    <div className="dog-card-footer">
                      <span>{dog.age}</span>
                      <a href="/dogs">View profile →</a>
                    </div>
                  </div>
                </article>
              ))}

              <a href="/dogs" className="add-dog-card">
                <span className="add-dog-icon">+</span>
                <strong>Add a new dog</strong>
                <small>Keep all their care details together</small>
              </a>
            </div>
          </section>

          <section className="dashboard-section reminder-section">
            <div className="section-title-row">
              <div>
                <span className="dashboard-section-label">STAY ON TRACK</span>
                <h2>Upcoming Reminders</h2>
              </div>
              <a className="text-link" href="/reminders">View all →</a>
            </div>

            <div className="reminder-list">
              {reminders.map((reminder) => (
                <article className="reminder-row" key={reminder.id}>
                  <div className="reminder-icon">{reminder.icon}</div>
                  <div className="reminder-details">
                    <strong>{reminder.title}</strong>
                    <span>{reminder.dog} · {reminder.type}</span>
                  </div>
                  <time>{reminder.date}</time>
                </article>
              ))}
            </div>
          </section>

          <section className="assistant-banner">
            <span className="assistant-banner-icon">💬</span>
            <div>
              <h3>Have a dog-care question?</h3>
              <p>
                Explore general care guidance with your AI Care Assistant.
                For medical concerns, consult a veterinarian.
              </p>
            </div>
            <a className="button button-primary" href="/assistant">
              Explore Assistant
            </a>
          </section>

          <p className="demo-notice">
            Demo dashboard — all dog details and reminders shown here are
            sample data, not real vaccination or medical records.
          </p>
        </div>
      </section>
    </main>
  );
}
