
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Bell,
  ShieldCheck,
  Settings,
  PawPrint,
  CheckCircle,
} from "lucide-react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Dog Owner",
    email: "owner@example.com",
    phone: "",
    location: "",
  });

  const [notifications, setNotifications] = useState({
    vaccination: true,
    reminders: true,
    careTips: false,
  });

  const [saved, setSaved] = useState(false);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
  };

  const handleNotificationChange = (name) => {
    setNotifications((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="profile-page">
      <div className="profile-page-heading">
        <div>
          <span className="profile-eyebrow">
            <PawPrint size={15} /> DOGGY CARE HUB
          </span>
          <h1>Profile & Settings</h1>
          <p>Manage your personal information and application preferences.</p>
        </div>
      </div>

      <div className="profile-layout">
        {/* Profile summary */}
        <aside className="profile-summary-card">
          <div className="profile-avatar">
            <User size={42} />
            <button
              type="button"
              className="profile-camera-button"
              aria-label="Change profile picture"
              title="Profile picture upload will be available later"
            >
              <Camera size={15} />
            </button>
          </div>

          <h2>{profile.name || "Dog Owner"}</h2>
          <p>{profile.email}</p>

          <div className="profile-member-label">
            <PawPrint size={15} />
            Dog Owner Account
          </div>

          <div className="profile-summary-divider" />

          <div className="profile-summary-info">
            <span>Account type</span>
            <strong>Standard User</strong>
          </div>

          <div className="profile-summary-info">
            <span>Profile status</span>
            <strong className="profile-status">
              <CheckCircle size={14} /> Demo Profile
            </strong>
          </div>
        </aside>

        {/* Profile information */}
        <div className="profile-main-content">
          <form className="profile-section-card" onSubmit={handleSave}>
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <User size={20} />
              </div>
              <div>
                <h2>Personal Information</h2>
                <p>Update your basic account information.</p>
              </div>
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label htmlFor="profile-name">Full Name</label>
                <div className="profile-input-wrapper">
                  <User size={17} />
                  <input
                    id="profile-name"
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="profile-email">Email Address</label>
                <div className="profile-input-wrapper">
                  <Mail size={17} />
                  <input
                    id="profile-email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="profile-phone">Phone Number</label>
                <div className="profile-input-wrapper">
                  <Phone size={17} />
                  <input
                    id="profile-phone"
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="profile-field">
                <label htmlFor="profile-location">Location</label>
                <div className="profile-input-wrapper">
                  <MapPin size={17} />
                  <input
                    id="profile-location"
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleProfileChange}
                    placeholder="Enter your location"
                  />
                </div>
              </div>
            </div>

            <div className="profile-form-footer">
              {saved && (
                <span className="profile-saved-message">
                  <CheckCircle size={16} />
                  Changes saved in this demo session.
                </span>
              )}

              <button type="submit" className="profile-save-button">
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </form>

          {/* Notification preferences */}
          <section className="profile-section-card">
            <div className="profile-section-heading">
              <div className="profile-section-icon">
                <Bell size={20} />
              </div>
              <div>
                <h2>Notification Preferences</h2>
                <p>Choose which notifications you want to receive.</p>
              </div>
            </div>

            <div className="profile-preference-list">
              <div className="profile-preference-item">
                <div>
                  <h3>Vaccination Notifications</h3>
                  <p>Receive updates about upcoming vaccination dates.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.vaccination}
                  aria-label="Vaccination notifications"
                  className={`profile-toggle ${
                    notifications.vaccination ? "enabled" : ""
                  }`}
                  onClick={() => handleNotificationChange("vaccination")}
                >
                  <span />
                </button>
              </div>

              <div className="profile-preference-item">
                <div>
                  <h3>Care Reminders</h3>
                  <p>Receive reminders for scheduled dog-care activities.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.reminders}
                  aria-label="Care reminders"
                  className={`profile-toggle ${
                    notifications.reminders ? "enabled" : ""
                  }`}
                  onClick={() => handleNotificationChange("reminders")}
                >
                  <span />
                </button>
              </div>

              <div className="profile-preference-item">
                <div>
                  <h3>General Care Tips</h3>
                  <p>Receive useful information about everyday dog care.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.careTips}
                  aria-label="General care tips"
                  className={`profile-toggle ${
                    notifications.careTips ? "enabled" : ""
                  }`}
                  onClick={() => handleNotificationChange("careTips")}
                >
                  <span />
                </button>
              </div>
            </div>
          </section>

          {/* Security information */}
          <section className="profile-security-card">
            <div className="profile-security-icon">
              <ShieldCheck size={23} />
            </div>
            <div>
              <h3>Account Security</h3>
              <p>
                Your account authentication and password management will be
                handled through Firebase Authentication when backend
                integration is completed.
              </p>
            </div>
          </section>

          <div className="profile-demo-notice">
            <Settings size={17} />
            <p>
              This is a frontend demonstration. Profile changes and
              notification preferences are stored temporarily in React
              state and will reset when the page is refreshed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
