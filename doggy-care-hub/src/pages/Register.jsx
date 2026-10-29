
import { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Eye, EyeOff, Heart } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please check both fields.");
      return;
    }

    setMessage(
      "Your form is valid. Account creation will be enabled after Firebase Authentication is connected."
    );
  }

  return (
    <main className="auth-screen">
      <section className="auth-split-layout auth-register-layout">
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
            <span className="auth-mini-label">JOIN OUR COMMUNITY</span>
            <h1>Better care begins with a little organization.</h1>
            <p>
              Create your free account to manage your dogs, track
              vaccinations and explore personalized general care guidance.
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
              <span>Every tail deserves the best care.</span>
            </div>
          </div>

          <p className="auth-panel-footer">
            One hub for your dog's wellbeing.
          </p>
        </aside>

        <section className="auth-form-panel auth-register-form-panel">
          <div className="auth-form-container">
            <Link to="/" className="auth-mobile-brand">
              <PawPrint size={20} />
              Doggy<span>Care</span>Hub
            </Link>

            <span className="auth-form-eyebrow">GET STARTED</span>
            <h2>Create Account</h2>
            <p className="auth-form-description">
              Fill in your details to join Doggy Care Hub.
            </p>

            <form className="auth-modern-form" onSubmit={handleSubmit}>
              <div className="auth-register-grid">
                <div className="auth-field">
                  <label htmlFor="register-name">Full name</label>
                  <input
                    id="register-name"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="register-email">Email address</label>
                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="auth-field auth-field-full">
                  <label htmlFor="register-phone">Phone number</label>
                  <input
                    id="register-phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="register-password">Password</label>
                  <div className="auth-password-wrap">
                    <input
                      id="register-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      minLength={6}
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

                <div className="auth-field">
                  <label htmlFor="register-confirm-password">
                    Confirm password
                  </label>
                  <div className="auth-password-wrap">
                    <input
                      id="register-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                    <button
                      className="password-toggle"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((value) => !value)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {message && (
                <p className="auth-demo-message" role="status">
                  {message}
                </p>
              )}

              <button className="button auth-modern-submit" type="submit">
                Create Account
              </button>

              <p className="auth-terms-note">
                Your account will be created when backend authentication is connected.
              </p>
            </form>

            <div className="auth-form-divider">
              <span>Already part of the community?</span>
            </div>

            <p className="auth-modern-switch">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
