
export default function Login() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <a className="brand auth-brand" href="/">
          🐾 Doggy<span className="brand-accent">Care</span>Hub
        </a>

        <h1>Welcome back!</h1>
        <p className="auth-description">
          Sign in to continue caring for your best friend.
        </p>

        <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button className="button button-primary auth-submit" type="submit">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </section>
    </main>
  );
}
