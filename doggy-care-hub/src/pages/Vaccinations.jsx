
import { useState } from "react";

const initialRecords = [
  {
    id: 1,
    dog: "Buddy",
    vaccine: "Rabies",
    date: "2026-08-15",
    nextDate: "2027-08-15",
    status: "Completed",
  },
  {
    id: 2,
    dog: "Buddy",
    vaccine: "DHPP",
    date: "2026-10-10",
    nextDate: "2026-11-10",
    status: "Upcoming",
  },
  {
    id: 3,
    dog: "Luna",
    vaccine: "Rabies",
    date: "2026-11-15",
    nextDate: "2026-11-15",
    status: "Upcoming",
  },
];

function getStatus(record) {
  if (record.status === "Completed") return "Completed";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${record.nextDate}T00:00:00`);

  return dueDate < today ? "Overdue" : "Upcoming";
}

export default function Vaccinations() {
  const [records, setRecords] = useState(initialRecords);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    dog: "Buddy",
    vaccine: "",
    date: "",
    nextDate: "",
    status: "Upcoming",
  });

  const visibleRecords = records.filter((record) => {
    return filter === "All" || getStatus(record) === filter;
  });

  const completedCount = records.filter(
    (record) => getStatus(record) === "Completed"
  ).length;

  const upcomingCount = records.filter(
    (record) => getStatus(record) === "Upcoming"
  ).length;

  const overdueCount = records.filter(
    (record) => getStatus(record) === "Overdue"
  ).length;

  function handleSubmit(event) {
    event.preventDefault();

    setRecords((current) => [
      ...current,
      {
        ...form,
        id: Date.now(),
      },
    ]);

    setForm({
      dog: "Buddy",
      vaccine: "",
      date: "",
      nextDate: "",
      status: "Upcoming",
    });

    setShowForm(false);
  }

  return (
    <main className="vaccinations-page">
      <header className="vaccinations-heading">
        <div>
          <span className="dashboard-section-label">
            PREVENTIVE CARE
          </span>
          <h1>Vaccination Records</h1>
          <p>
            Keep track of vaccination dates and help your dogs stay
            up to date with their preventive care.
          </p>
        </div>

        <button
          className="button button-primary"
          onClick={() => setShowForm((current) => !current)}
        >
          {showForm ? "Cancel" : "+ Add Record"}
        </button>
      </header>

      <section className="vaccination-summary">
        <article className="vaccination-stat">
          <span className="vaccination-stat-icon">💉</span>
          <div>
            <p>Total Records</p>
            <h2>{records.length}</h2>
          </div>
        </article>

        <article className="vaccination-stat">
          <span className="vaccination-stat-icon">✅</span>
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
        </article>

        <article className="vaccination-stat">
          <span className="vaccination-stat-icon">📅</span>
          <div>
            <p>Upcoming</p>
            <h2>{upcomingCount}</h2>
          </div>
        </article>

        <article className="vaccination-stat">
          <span className="vaccination-stat-icon">⚠️</span>
          <div>
            <p>Overdue</p>
            <h2>{overdueCount}</h2>
          </div>
        </article>
      </section>

      {showForm && (
        <section className="vaccination-form-card">
          <h2>Add Vaccination Record</h2>
          <p>Enter the vaccination details below.</p>

          <form onSubmit={handleSubmit} className="vaccination-form">
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
              Vaccine name
              <input
                value={form.vaccine}
                onChange={(event) =>
                  setForm({ ...form, vaccine: event.target.value })
                }
                placeholder="e.g. Rabies"
                required
              />
            </label>

            <label>
              Vaccination date
              <input
                type="date"
                value={form.date}
                onChange={(event) =>
                  setForm({ ...form, date: event.target.value })
                }
                required
              />
            </label>

            <label>
              Next due date
              <input
                type="date"
                value={form.nextDate}
                onChange={(event) =>
                  setForm({ ...form, nextDate: event.target.value })
                }
                min={form.date || undefined}
                required
              />
            </label>

            <label>
              Record status
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value })
                }
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <button className="button button-primary" type="submit">
              Save Record
            </button>
          </form>
        </section>
      )}

      <section className="vaccination-records-section">
        <div className="vaccination-records-heading">
          <div>
            <h2>All Vaccination Records</h2>
            <p>Review vaccination history and upcoming due dates.</p>
          </div>

          <select
            className="vaccination-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">All records</option>
            <option value="Completed">Completed</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {visibleRecords.length > 0 ? (
          <div className="vaccination-table-wrapper">
            <table className="vaccination-table">
              <thead>
                <tr>
                  <th>Dog</th>
                  <th>Vaccine</th>
                  <th>Vaccination Date</th>
                  <th>Next Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {visibleRecords.map((record) => {
                  const status = getStatus(record);

                  return (
                    <tr key={record.id}>
                      <td><strong>{record.dog}</strong></td>
                      <td>{record.vaccine}</td>
                      <td>{record.date}</td>
                      <td>{record.nextDate}</td>
                      <td>
                        <span
                          className={`vaccination-status ${status.toLowerCase()}`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="dogs-empty-state">
            <span>💉</span>
            <h2>No records found</h2>
            <p>No vaccination records match this filter.</p>
          </div>
        )}
      </section>

      <p className="demo-notice">
        Demo mode: records are stored temporarily in page state.
        Dates and vaccination intervals are sample data, not veterinary
        recommendations. Confirm vaccination schedules with a veterinarian.
      </p>
    </main>
  );
}
