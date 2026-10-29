
const dogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    emoji: "🐕",
    status: "Active",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Shih Tzu",
    age: "8 months",
    emoji: "🐩",
    status: "Active",
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
    <main className="dashboard-content">
      {/* Welcome Banner */}
      <section className="welcome-banner">
        <div>
          <span className="welcome-eyebrow">
            YOUR DOG CARE SPACE
          </span>

          <h2>Welcome back! 🐾</h2>

          <p>
            Every little step counts towards a happier,
            healthier life for your best friend.
          </p>

          <a className="button button-primary" href="/dogs">
            View My Dogs
          </a>
        </div>

        <div className="welcome-art" aria-hidden="true">
          🐕
        </div>
      </section>

      {/* Dashboard Statistics */}
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

      {/* My Dogs */}
      <section className="dashboard-section">
        <div className="section-title-row">
          <div>
            <span className="dashboard-section-label">
              YOUR COMPANIONS
            </span>

            <h2>My Dogs</h2>
          </div>

          <a className="text-link" href="/dogs">
            View all →
          </a>
        </div>

        <div className="dog-grid">
          {dogs.map((dog) => (
            <article className="dog-card" key={dog.id}>
              <div className="dog-card-art">
                <span>{dog.emoji}</span>

                <span className="dog-status">
                  ● {dog.status}
                </span>
              </div>

              <div className="dog-card-body">
                <h3>{dog.name}</h3>

                <p>{dog.breed}</p>

                <div className="dog-card-footer">
                  <span>{dog.age}</span>

                  <a href="/dogs">
                    View profile →
                  </a>
                </div>
              </div>
            </article>
          ))}

          <a href="/dogs" className="add-dog-card">
            <span className="add-dog-icon">+</span>

            <strong>Add a new dog</strong>

            <small>
              Keep all their care details together
            </small>
          </a>
        </div>
      </section>

      {/* Upcoming Reminders */}
      <section className="dashboard-section reminder-section">
        <div className="section-title-row">
          <div>
            <span className="dashboard-section-label">
              STAY ON TRACK
            </span>

            <h2>Upcoming Reminders</h2>
          </div>

          <a className="text-link" href="/reminders">
            View all →
          </a>
        </div>

        <div className="reminder-list">
          {reminders.map((reminder) => (
            <article
              className="reminder-row"
              key={reminder.id}
            >
              <div className="reminder-icon">
                {reminder.icon}
              </div>

              <div className="reminder-details">
                <strong>{reminder.title}</strong>

                <span>
                  {reminder.dog} · {reminder.type}
                </span>
              </div>

              <time>{reminder.date}</time>
            </article>
          ))}
        </div>
      </section>

      {/* AI Care Assistant */}
      <section className="assistant-banner">
        <span className="assistant-banner-icon">💬</span>

        <div>
          <h3>Have a dog-care question?</h3>

          <p>
            Explore general dog-care guidance with your AI
            Care Assistant. For medical concerns, consult
            a veterinarian.
          </p>
        </div>

        <a
          className="button button-primary"
          href="/assistant"
        >
          Explore Assistant
        </a>
      </section>

      {/* Demo Notice */}
      <p className="demo-notice">
        Demo dashboard — all dog details and reminders shown
        here are sample data, not actual vaccination or
        medical records.
      </p>
    </main>
  );
}
