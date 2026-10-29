
import {BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Dogs from "./pages/Dogs.jsx";
import Breeds from "./pages/Breeds.jsx";
import Vaccinations from "./pages/Vaccinations.jsx";
import WorkspaceLayout from "./components/WorkspaceLayout.jsx";

import { PawPrint } from "lucide-react";
import "./index.css";


function PublicNavigation() {
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
        <a className="login-link" href="/login">
          Log in
        </a>
        <a className="button button-small button-primary" href="/register">
          Get Started
        </a>
      </div>
    </header>
  );
}



function PublicFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand-section">
          <a className="brand footer-brand" href="/">
            <span className="brand-mark">🐾</span>
            <span>
              Doggy<span className="brand-accent">Care</span>Hub
            </span>
          </a>

          <p>
            Helping dog owners make everyday care simpler,
            healthier, and more organized.
          </p>
        </div>

        <div className="footer-links-section">
          <h3>Explore</h3>
          <a href="/">Home</a>
          <a href="/#features">Features</a>
          <a href="/login">Log in</a>
          <a href="/register">Create an account</a>
        </div>

        <div className="footer-links-section">
          <h3>Your Dog's Care</h3>
          <a href="/dogs">My Dogs</a>
          <a href="/breeds">Dog Breeds</a>
          <a href="/vaccinations">Vaccinations</a>
          <a href="/dashboard">Dashboard</a>
        </div>

        <div className="footer-note-section">
          <h3>Our Purpose</h3>
          <p>
            One convenient place to organize your dog's profiles,
            vaccination records, reminders, and general care guidance.
          </p>
          <small>
            General information does not replace professional veterinary advice.
          </small>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Doggy Care Hub. All rights reserved.</p>
        <span>Made with care for every furry friend.</span>
      </div>
    </footer>
  );
}


function WorkspacePlaceholder({ title, description }) {
  return (
    <main className="dashboard-content workspace-placeholder">
      <span className="dashboard-section-label">
        DOGGY CARE HUB
      </span>

      <h2>{title}</h2>

      <p>{description}</p>

      <p className="demo-notice">
        This page is a temporary frontend placeholder.
        Its full interface and functionality will be added
        in a later stage. Firebase is not connected yet.
      </p>
    </main>
  );
}

function AppContent() {
  const { pathname } = useLocation();

  const workspacePaths = [
    "/dashboard",
    "/dogs",
    "/breeds",
    "/vaccinations",
    "/reminders",
    "/care-guidance",
    "/assistant",
    "/profile",
  ];

  const isWorkspace = workspacePaths.some(
    (path) =>
      pathname === path || pathname.startsWith(`${path}/`)
  );

  return (
    <>
      {!isWorkspace && <PublicNavigation />}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Shared workspace layout */}
        <Route element={<WorkspaceLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route path="/dogs" element={<Dogs />} />

          <Route path="/breeds" element={<Breeds />} />

          <Route
            path="/vaccinations"
            element={<Vaccinations />}
          />

          <Route
            path="/reminders"
            element={
              <WorkspacePlaceholder
                title="Reminders"
                description="Manage upcoming vaccination and dog-care reminders in one place."
              />
            }
          />

          <Route
            path="/care-guidance"
            element={
              <WorkspacePlaceholder
                title="Care Guidance"
                description="Explore general guidance on nutrition, grooming, hygiene, and preventive dog care."
              />
            }
          />

          <Route
            path="/assistant"
            element={
              <WorkspacePlaceholder
                title="AI Care Assistant"
                description="Get general dog-care information. This assistant is not a veterinary diagnosis service."
              />
            }
          />

          <Route
            path="/profile"
            element={
              <WorkspacePlaceholder
                title="Settings"
                description="Profile and account settings will be implemented in a later stage."
              />
            }
          />
        </Route>

        {/* Page not found */}
        <Route
          path="*"
          element={
            <main className="auth-page">
              <section className="auth-card">
                <h1>Page not found</h1>

                <p className="auth-description">
                  The page you requested does not exist.
                </p>

                <Link
                  className="button button-primary"
                  to="/"
                >
                  Return Home
                </Link>
              </section>
            </main>
          }
        />
      </Routes>

      {!isWorkspace && <PublicFooter />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
