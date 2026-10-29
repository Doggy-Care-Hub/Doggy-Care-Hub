
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Dog,
  Syringe,
  CalendarDays,
  HeartPulse,
  MessageCircle,
  Settings,
  LogOut,
  PawPrint,
  BookOpen,
} from "lucide-react";

const workspaceLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dogs", label: "My Dogs", icon: Dog },
  { to: "/breeds", label: "Dog Breeds", icon: BookOpen },
  { to: "/vaccinations", label: "Vaccinations", icon: Syringe },
  { to: "/reminders", label: "Reminders", icon: CalendarDays },
  { to: "/care-guidance", label: "Care Guidance", icon: HeartPulse },
  { to: "/assistant", label: "AI Care Assistant", icon: MessageCircle },
];

export default function WorkspaceLayout() {
  const { pathname } = useLocation();

  const currentLink = workspaceLinks.find((item) =>
    item.end
      ? pathname === item.to
      : pathname === item.to || pathname.startsWith(`${item.to}/`)
  );

  const pageTitle =
    pathname === "/profile" ? "Settings" : currentLink?.label ?? "Workspace";

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <Link to="/" className="brand dashboard-brand">
          <span className="brand-mark">
            <PawPrint size={23} />
          </span>
          <span>
            Doggy<span className="brand-accent">Care</span>Hub
          </span>
        </Link>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav" aria-label="Workspace navigation">
          {workspaceLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `sidebar-link${isActive ? " active" : ""}`
              }
            >
              <span className="sidebar-icon">
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `sidebar-link${isActive ? " active" : ""}`
            }
          >
            <span className="sidebar-icon">
              <Settings size={18} />
            </span>
            <span>Settings</span>
          </NavLink>

          <Link className="sidebar-link" to="/">
            <span className="sidebar-icon">
              <LogOut size={18} />
            </span>
            <span>Back to Home</span>
          </Link>

          <div className="sidebar-help">
            <span className="sidebar-help-icon">
              <PawPrint size={20} />
            </span>
            <strong>Every tail matters.</strong>
            <p>Small steps make happier, healthier dogs.</p>
          </div>
        </div>
      </aside>

      <div className="workspace-column">
        <header className="workspace-topbar">

          <div className="workspace-page-heading">
            <span className="dashboard-breadcrumb">
              Doggy Care Hub / {pageTitle}
            </span>
            <h1>{pageTitle}</h1>
          </div>

          <Link
            className="dashboard-avatar"
            to="/profile"
            aria-label="Open profile and settings"
          >
            V
          </Link>
        </header>

        <Outlet />
      </div>
    </div>
  );
}
