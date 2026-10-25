
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import Dogs from "./pages/Dogs.jsx";
import Breeds from "./pages/Breeds.jsx";
import Vaccinations from "./pages/Vaccinations.jsx";

function Navigation() {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        <span className="brand-mark">🐾</span>
        <span>
          Doggy<span className="brand-accent">Care</span>Hub
        </span>
      </a>

      <nav className="main-nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/#features">Features</a>
        <a href="/#about">About</a>
      </nav>

      <div className="header-actions">
        <a className="login-link" href="/login">Log in</a>
        <a className="button button-small button-primary" href="/register">
          Get Started
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="about">
      <a className="brand footer-brand" href="/">
        🐾 Doggy<span className="brand-accent">Care</span>Hub
      </a>
      <p>Helping dog owners make everyday care simpler.</p>
      <small>© {new Date().getFullYear()} Doggy Care Hub</small>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/breeds" element={<Breeds />} />
        <Route path="/vaccinations" element={<Vaccinations />} />
        <Route
          path="*"
          element={
            <main className="auth-page">
              <section className="auth-card">
                <h1>Page not found</h1>
                <p className="auth-description">
                  The page you requested does not exist.
                </p>
                <a className="button button-primary" href="/">
                  Return Home
                </a>
              </section>
            </main>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
