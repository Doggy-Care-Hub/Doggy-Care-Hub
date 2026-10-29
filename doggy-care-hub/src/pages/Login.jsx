
import { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Eye, EyeOff, Heart } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "Demo mode: Login is not connected yet. Firebase Authentication will be added later."
    );
  }

  return (
    <main className="auth-screen">
      <section className="auth-split-layout">
        <aside className="auth-visual-panel">
          <Link to="/" className="auth-panel-brand">
            <span className="auth-brand-icon">
              <PawPrint size={22} />
            </span>
            <span>
              Doggy<span>Care</span>Hub
            </span>
          </Link>

          <div className="auth-visual-copy">
            <span className="auth-mini-label">WELCOME BACK</span>
            <h1>Your best friend's care journey continues here.</h1>
            <p>
              Log in to manage your dogs, vaccination records and
              everyday care reminders.
            </p>
          </div>

          <div className="auth-dog-illustration" aria-label="Dog care illustration">
            <div className="auth-illustration-circle">
              <span className="auth-floating-paw paw-top">🐾</span>
              <span className="auth-big-dog" role="img" aria-label="Happy dog">
                🐕
              </span>
              <span className="auth-floating-paw paw-bottom">🐾</span>
            </div>

            <div className="auth-visual-note">
              <Heart size={17} fill="currentColor" />
              <span>Healthy dogs. Happier days.</span>
            </div>
          </div>

          <p className="auth-panel-footer">
            A little care goes a long way.
          </p>
        </aside>

        <section className="auth-form-panel">
          <div className="auth-form-container">
            <Link to="/" className="auth-mobile-brand">
              <PawPrint size={20} />
              Doggy<span>Care</span>Hub
            </Link>

            <span className="auth-form-eyebrow">DOGGY CARE HUB</span>
            <h2>Welcome back!</h2>
            <p className="auth-form-description">
              Enter your details to access your account.
            </p>

            <form className="auth-modern-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <div className="auth-password-wrap">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="password-toggle"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="auth-forgot-row">
                <button
                  type="button"
                  className="auth-text-button"
                  onClick={() =>
                    setMessage(
                      "Password recovery will be available after Firebase Authentication is connected."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>

              <button className="button auth-modern-submit" type="submit">
                Log in
              </button>

              {message && (
                <p className="auth-demo-message" role="status">
                  {message}
                </p>
              )}
            </form>

            <div className="auth-form-divider">
              <span>New to Doggy Care Hub?</span>
            </div>

            <p className="auth-modern-switch">
              Don't have an account? <Link to="/register">Register</Link>
            </p>

            <p className="auth-safety-note">
              General dog-care information is not a substitute for veterinary advice.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
