
export default function Register() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="brand auth-brand" href="/">
          🐾 Doggy<span className="brand-accent">Care</span>Hub
        </a>

        <h1>Create your account</h1>
        <p className="auth-description">
          Start organizing your dog's care journey.
        </p>

        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <label htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Create a password"
            minLength={6}
            required
          />

          <label htmlFor="register-confirm-password">Confirm password</label>
          <input
            id="register-confirm-password"
            type="password"
            placeholder="Re-enter your password"
            minLength={6}
            required
          />

          <button className="button button-primary auth-submit" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </section>
    </main>
  );
}
