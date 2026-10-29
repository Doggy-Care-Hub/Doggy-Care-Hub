
import { useState } from "react";
import {
  Bell,
  Plus,
  CalendarDays,
  Clock,
  CheckCircle2,
  Trash2,
  PawPrint,
} from "lucide-react";

const initialReminders = [
  {
    id: 1,
    dog: "Buddy",
    title: "Rabies vaccination",
    date: "2026-11-10",
    time: "09:00",
    type: "Vaccination",
    completed: false,
  },
  {
    id: 2,
    dog: "Luna",
    title: "Routine health check",
    date: "2026-11-12",
    time: "10:30",
    type: "Health Check",
    completed: false,
  },
  {
    id: 3,
    dog: "Buddy",
    title: "Monthly grooming",
    date: "2026-11-15",
    time: "14:00",
    type: "Grooming",
    completed: true,
  },
];

const emptyForm = {
  dog: "Buddy",
  title: "",
  date: "",
  time: "09:00",
  type: "General Care",
};

function formatDate(value) {
  if (!value) return "No date";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Reminders() {
  const [reminders, setReminders] = useState(initialReminders);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const pendingCount = reminders.filter(
    (reminder) => !reminder.completed
  ).length;

  const completedCount = reminders.filter(
    (reminder) => reminder.completed
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = reminders.filter((reminder) => {
    return (
      !reminder.completed &&
      new Date(`${reminder.date}T00:00:00`).getTime() === today.getTime()
    );
  }).length;

  const visibleReminders = reminders
    .filter((reminder) => {
      if (filter === "Pending") return !reminder.completed;
      if (filter === "Completed") return reminder.completed;
      return true;
    })
    .sort((a, b) => {
      return (
        new Date(`${a.date}T${a.time}:00`) -
        new Date(`${b.date}T${b.time}:00`)
      );
    });

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.date < new Date().toLocaleDateString("en-CA")) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      if (new Date(`${form.date}T00:00:00`) < now) {
        setError("Please select today or a future date.");
        return;
      }
    }

    setReminders((current) => [
      ...current,
      { ...form, id: Date.now(), completed: false },
    ]);

    setForm({ ...emptyForm });
    setShowForm(false);
  }

  function toggleCompleted(id) {
    setReminders((current) =>
      current.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  }

  function deleteReminder(id) {
    if (!window.confirm("Delete this reminder?")) return;

    setReminders((current) =>
      current.filter((reminder) => reminder.id !== id)
    );
  }

  return (
    <main className="reminders-page">
      <header className="reminders-heading">
        <div>
          <span className="reminders-eyebrow">CARE PLANNER</span>
          <h1>Reminders</h1>
          <p>
            Stay organized with your dogs' vaccination, grooming,
            and everyday care schedules.
          </p>
        </div>

        <button
          className="reminders-primary-button"
          onClick={() => {
            setShowForm((current) => !current);
            setError("");
          }}
        >
          <Plus size={18} />
          Add Reminder
        </button>
      </header>

      <section className="reminders-summary">
        <article className="reminders-stat">
          <span className="reminders-stat-icon total">
            <Bell size={21} />
          </span>
          <div>
            <p>Total Reminders</p>
            <h2>{reminders.length}</h2>
          </div>
        </article>

        <article className="reminders-stat">
          <span className="reminders-stat-icon pending">
            <Clock size={21} />
          </span>
          <div>
            <p>Pending</p>
            <h2>{pendingCount}</h2>
          </div>
        </article>

        <article className="reminders-stat">
          <span className="reminders-stat-icon today">
            <CalendarDays size={21} />
          </span>
          <div>
            <p>Due Today</p>
            <h2>{todayCount}</h2>
          </div>
        </article>

        <article className="reminders-stat">
          <span className="reminders-stat-icon completed">
            <CheckCircle2 size={21} />
          </span>
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
        </article>
      </section>

      {showForm && (
        <section className="reminders-form-card">
          <h2>Create a Reminder</h2>
          <p>Add an activity you want to remember for your dog.</p>

          <form onSubmit={handleSubmit} className="reminders-form">
            <label>
              Dog
              <select
                value={form.dog}
                onChange={(event) =>
                  setForm({ ...form, dog: event.target.value })
                }
                required
              >
                <option value="Buddy">Buddy</option>
                <option value="Luna">Luna</option>
              </select>
            </label>

            <label>
              Reminder title
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder="e.g. Give flea prevention"
                required
              />
            </label>

            <label>
              Date
              <input
                type="date"
                min={new Date().toLocaleDateString("en-CA")}
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
                required
              />
            </label>

            <label>
              Time
              <input
                type="time"
                value={form.time}
                onChange={(event) =>
                  setForm({ ...form, time: event.target.value })
                }
                required
              />
            </label>

            <label>
              Reminder type
              <select
                value={form.type}
                onChange={(event) =>
                  setForm({ ...form, type: event.target.value })
                }
              >
                <option value="Vaccination">Vaccination</option>
                <option value="Health Check">Health Check</option>
                <option value="Grooming">Grooming</option>
                <option value="Feeding">Feeding</option>
                <option value="Medication">Medication</option>
                <option value="General Care">General Care</option>
              </select>
            </label>

            {error && (
              <p className="reminders-error" role="alert">
                {error}
              </p>
            )}

            <div className="reminders-form-actions">
              <button
                type="button"
                className="reminders-secondary-button"
                onClick={() => {
                  setShowForm(false);
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="reminders-primary-button"
              >
                Save Reminder
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="reminders-list-section">
        <div className="reminders-list-heading">
          <div>
            <h2>Your Reminders</h2>
            <p>Track upcoming activities and completed tasks.</p>
          </div>

          <select
            className="reminders-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter reminders"
          >
            <option value="All">All reminders</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {visibleReminders.length > 0 ? (
          <div className="reminders-list">
            {visibleReminders.map((reminder) => (
              <article
                className={`reminder-card ${
                  reminder.completed ? "is-completed" : ""
                }`}
                key={reminder.id}
              >
                <div className="reminder-date">
                  <CalendarDays size={19} />
                  <span>{formatDate(reminder.date)}</span>
                  <small>{reminder.time}</small>
                </div>

                <div className="reminder-main">
                  <div className="reminder-title-row">
                    <h3>{reminder.title}</h3>
                    <span
                      className={`reminder-type ${reminder.type
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {reminder.type}
                    </span>
                  </div>

                  <p className="reminder-dog">
                    <PawPrint size={15} />
                    {reminder.dog}
                  </p>

                  <span
                    className={`reminder-status ${
                      reminder.completed ? "completed" : "pending"
                    }`}
                  >
                    {reminder.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                <div className="reminder-actions">
                  <button
                    type="button"
                    className="reminder-complete-button"
                    onClick={() => toggleCompleted(reminder.id)}
                  >
                    <CheckCircle2 size={16} />
                    {reminder.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    type="button"
                    className="reminder-delete-button"
                    onClick={() => deleteReminder(reminder.id)}
                    aria-label={`Delete reminder: ${reminder.title}`}
                    title="Delete reminder"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="reminders-empty-state">
            <Bell size={27} />
            <h3>No reminders found</h3>
            <p>Try another filter or create a new reminder.</p>
          </div>
        )}
      </section>

      <p className="reminders-demo-notice">
        Demo mode: reminders are stored temporarily in page state.
        Actual notifications require a notification service and appropriate
        device permissions.
      </p>
    </main>
  );
}
