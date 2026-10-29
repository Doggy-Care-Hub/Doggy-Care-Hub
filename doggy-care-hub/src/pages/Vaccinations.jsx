
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Syringe,
  CheckCircle2,
  CalendarDays,
  AlertTriangle,
  Pencil,
  Trash2,
  X,
  Clock3,
  PawPrint,
} from "lucide-react";

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
  // Completed means the vaccination has already been administered.
  if (record.status === "Completed") return "Completed";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = new Date(`${record.nextDate}T00:00:00`);

  return dueDate < today ? "Overdue" : "Upcoming";
}

function formatDate(value) {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const emptyForm = {
  dog: "Buddy",
  vaccine: "",
  date: "",
  nextDate: "",
  status: "Upcoming",
};

export default function Vaccinations() {
  const [records, setRecords] = useState(initialRecords);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const completedCount = records.filter(
    (record) => getStatus(record) === "Completed"
  ).length;

  const upcomingCount = records.filter(
    (record) => getStatus(record) === "Upcoming"
  ).length;

  const overdueCount = records.filter(
    (record) => getStatus(record) === "Overdue"
  ).length;

  const visibleRecords = useMemo(() => {
    return records.filter((record) => {
      const status = getStatus(record);
      const query = search.trim().toLowerCase();

      const matchesSearch =
        record.dog.toLowerCase().includes(query) ||
        record.vaccine.toLowerCase().includes(query);

      const matchesFilter = filter === "All" || status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [records, filter, search]);

  function openAddForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
    setShowForm(true);
  }

  function openEditForm(record) {
    setEditingId(record.id);
    setForm({
      dog: record.dog,
      vaccine: record.vaccine,
      date: record.date,
      nextDate: record.nextDate,
      status: record.status,
    });
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm({ ...emptyForm });
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.nextDate < form.date) {
      setError("The next due date cannot be earlier than the vaccination date.");
      return;
    }

    if (editingId !== null) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingId ? { ...form, id: editingId } : record
        )
      );
    } else {
      setRecords((current) => [
        ...current,
        { ...form, id: Date.now() },
      ]);
    }

    closeForm();
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vaccination record?"
    );

    if (!confirmed) return;

    setRecords((current) => current.filter((record) => record.id !== id));
  }

  return (
    <main className="vaccinations-page">
      <header className="vaccinations-heading">
        <div className="vaccinations-heading-copy">
          <span className="vaccinations-eyebrow">PREVENTIVE CARE</span>
          <h1>Vaccination Records</h1>
          <p>
            Manage vaccination history and keep track of upcoming due dates
            for your dogs.
          </p>
        </div>

        <button
          type="button"
          className="vaccinations-primary-button"
          onClick={showForm ? closeForm : openAddForm}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "Add Record"}
        </button>
      </header>

      <section className="vaccination-summary">
        <article className="vaccination-stat">
          <div className="vaccination-stat-icon total">
            <Syringe size={21} />
          </div>
          <div>
            <p>Total Records</p>
            <h2>{records.length}</h2>
          </div>
        </article>

        <article className="vaccination-stat">
          <div className="vaccination-stat-icon completed">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
        </article>

        <article className="vaccination-stat">
          <div className="vaccination-stat-icon upcoming">
            <CalendarDays size={21} />
          </div>
          <div>
            <p>Upcoming</p>
            <h2>{upcomingCount}</h2>
          </div>
        </article>

        <article className="vaccination-stat">
          <div className="vaccination-stat-icon overdue">
            <AlertTriangle size={21} />
          </div>
          <div>
            <p>Overdue</p>
            <h2>{overdueCount}</h2>
          </div>
        </article>
      </section>

      {showForm && (
        <section className="vaccination-form-card">
          <div className="vaccination-form-heading">
            <div className="vaccination-form-heading-icon">
              <Syringe size={21} />
            </div>
            <div>
              <h2>
                {editingId !== null
                  ? "Edit Vaccination Record"
                  : "Add Vaccination Record"}
              </h2>
              <p>Enter the vaccination details below.</p>
            </div>
          </div>

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

            {error && (
              <p className="vaccination-form-error" role="alert">
                {error}
              </p>
            )}

            <div className="vaccination-form-actions">
              <button
                type="button"
                className="vaccination-secondary-button"
                onClick={closeForm}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="vaccinations-primary-button"
              >
                {editingId !== null ? "Save Changes" : "Save Record"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="vaccination-records-section">
        <div className="vaccination-records-heading">
          <div>
            <h2>All Vaccination Records</h2>
            <p>
              {visibleRecords.length}{" "}
              {visibleRecords.length === 1 ? "record" : "records"} found
            </p>
          </div>
        </div>

        <div className="vaccination-toolbar">
          <div className="vaccination-search">
            <Search size={18} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by dog or vaccine..."
              aria-label="Search vaccination records"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            className="vaccination-filter"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter vaccination records by status"
          >
            <option value="All">All statuses</option>
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
                  <th className="vaccination-actions-heading">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visibleRecords.map((record) => {
                  const status = getStatus(record);

                  return (
                    <tr key={record.id}>
                      <td>
                        <div className="vaccination-dog-cell">
                          <span className="vaccination-dog-avatar">
                            <PawPrint size={17} />
                          </span>
                          <strong>{record.dog}</strong>
                        </div>
                      </td>
                      <td>
                        <span className="vaccination-vaccine-name">
                          {record.vaccine}
                        </span>
                      </td>
                      <td>{formatDate(record.date)}</td>
                      <td>
                        <span className="vaccination-due-date">
                          <Clock3 size={14} />
                          {formatDate(record.nextDate)}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`vaccination-status ${status.toLowerCase()}`}
                        >
                          <span className="vaccination-status-dot" />
                          {status}
                        </span>
                      </td>
                      <td>
                        <div className="vaccination-row-actions">
                          <button
                            type="button"
                            onClick={() => openEditForm(record)}
                            aria-label={`Edit ${record.vaccine} record for ${record.dog}`}
                            title="Edit record"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            className="vaccination-delete-button"
                            onClick={() => handleDelete(record.id)}
                            aria-label={`Delete ${record.vaccine} record for ${record.dog}`}
                            title="Delete record"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="vaccination-empty-state">
            <div className="vaccination-empty-icon">
              <Syringe size={25} />
            </div>
            <h3>No vaccination records found</h3>
            <p>
              Try a different search or status filter, or add a new record.
            </p>
            {search || filter !== "All" ? (
              <button
                type="button"
                className="vaccination-secondary-button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
              >
                Clear filters
              </button>
            ) : (
              <button
                type="button"
                className="vaccinations-primary-button"
                onClick={openAddForm}
              >
                <Plus size={17} />
                Add your first record
              </button>
            )}
          </div>
        )}
      </section>

      <p className="vaccination-demo-notice">
        Demo mode: records are stored temporarily in page state and will reset
        when the page reloads. Sample dates and intervals are not veterinary
        recommendations. Confirm vaccination schedules with a veterinarian.
      </p>
    </main>
  );
}
