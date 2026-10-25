
const features = [
  {
    symbol: "🐶",
    title: "Dog Profiles",
    description:
      "Manage your dog's profile, breed information, and care history in one place.",
  },
  {
    symbol: "💚",
    title: "Vaccination Care",
    description:
      "Keep vaccination records organized and review recommended schedules.",
  },
  {
    symbol: "📅",
    title: "Care Reminders",
    description:
      "Keep track of upcoming vaccinations and important preventive care activities.",
  },
  {
    symbol: "💬",
    title: "AI Care Assistant",
    description:
      "Explore general dog-care guidance and answers to everyday questions.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            A happier, healthier life for your dog
          </span>

          <h1>
            Every tail deserves
            <br />
            <span>the best care.</span>
          </h1>

          <p>
            Your dog's care journey, all in one place. Manage profiles,
            vaccination records, reminders, and everyday care guidance
            with Doggy Care Hub.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="/register">
              Get Started
            </a>
            <a className="button button-secondary" href="#features">
              Explore Features
            </a>
          </div>

          <div className="trust-note">
            💚 Organized care. Informed decisions. Happier dogs.
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-circle">
            <span className="paw paw-one">🐾</span>
            <span className="paw paw-two">🐾</span>
            <div className="dog-emoji" role="img" aria-label="Happy dog">
              🐕
            </div>

            <div className="floating-card">
              <span className="floating-icon">💚</span>
              <div>
                <strong>Care made simpler</strong>
                <small>One hub for your best friend</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <span className="eyebrow">Everything in one hub</span>
          <h2>Care for every part of their journey.</h2>
          <p>
            Helpful tools to make responsible dog care easier to manage.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.symbol}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bottom-cta">
        <div>
          <h2>Make every day a little better for your dog.</h2>
          <p>Start organizing your dog's care journey today.</p>
        </div>

        <a className="button button-primary" href="/register">
          Create an Account
        </a>
      </section>
    </main>
  );
}
