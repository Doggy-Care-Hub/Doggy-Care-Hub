
import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  HeartPulse,
  CalendarDays,
  PawPrint,
  Pencil,
  Trash2,
  X,
  FileText,
  Stethoscope,
  Activity,
} from "lucide-react";

const initialRecords = [
  {
    id: 1,
    dog: "Buddy",
    date: "2026-10-20",
    category: "General Checkup",
    title: "Routine Health Checkup",
    description: "General physical examination.",
    notes: "No unusual concerns recorded.",
  },
  {
    id: 2,
    dog: "Buddy",
    date: "2026-09-12",
    category: "Illness",
    title: "Skin Irritation",
    description: "Visited for a skin irritation concern.",
    notes: "Follow-up advice was provided.",
  },
  {
    id: 3,
    dog: "Luna",
    date: "2026-10-05",
    category: "General Checkup",
    title: "Routine Checkup",
    description: "General health examination.",
    notes: "Owner advised to monitor general condition.",
  },
];

const emptyForm = {
  dog: "Buddy",
  date: "",
  category: "General Checkup",
  title: "",
  description: "",
  notes: "",
};

function formatDate(value) {
  if (!value) return "—";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HealthHistory() {
  const [records, setRecords] = useState(initialRecords);
  const [selectedDog, setSelectedDog] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);

  const visibleRecords = useMemo(() => {
    return records
      .filter((record) => {
        const matchesDog =
          selectedDog === "All" || record.dog === selectedDog;

        const query = search.trim().toLowerCase();

        const matchesSearch =
          record.title.toLowerCase().includes(query) ||
          record.category.toLowerCase().includes(query) ||
          record.description.toLowerCase().includes(query) ||
          record.dog.toLowerCase().includes(query);

        return matchesDog && matchesSearch;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [records, selectedDog, search]);

  function openAddForm() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      dog: selectedDog === "All" ? "Buddy" : selectedDog,
    });
    setError("");
    setShowForm(true);
  }

  function openEditForm(record) {
    setEditingId(record.id);
    setForm({
      dog: record.dog,
      date: record.date,
      category: record.category,
      title: record.title,
      description: record.description,
      notes: record.notes,
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

    const cleanedRecord = {
      ...form,
      dog: form.dog.trim(),
      title: form.title.trim(),
      description: form.description.trim(),
      notes: form.notes.trim(),
    };

    if (!cleanedRecord.title || !cleanedRecord.description) {
      setError("Please complete all required fields.");
      return;
    }

    if (editingId !== null) {
      setRecords((current) =>
        current.map((record) =>
          record.id === editingId
            ? { ...cleanedRecord, id: editingId }
            : record
        )
      );
    } else {
      setRecords((current) => [
        ...current,
        { ...cleanedRecord, id: Date.now() },
      ]);
    }

    closeForm();
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this health record?"
    );

    if (!confirmed) return;

    setRecords((current) =>
      current.filter((record) => record.id !== id)
    );
  }

  const totalRecords = records.length;

  const buddyRecords = records.filter(
    (record) => record.dog === "Buddy"
  ).length;

  const lunaRecords = records.filter(
    (record) => record.dog === "Luna"
  ).length;

  return (
    <main className="health-history-page">

      {/* Page heading */}
      <header className="health-history-heading">
        <div>
          <span className="health-history-eyebrow">
            HEALTH MANAGEMENT
          </span>

          <h1>Health History</h1>

          <p>
            Keep track of your dogs' health records, checkups,
            and previous health-related information.
          </p>
        </div>

        <button
          type="button"
          className="health-primary-button"
          onClick={showForm ? closeForm : openAddForm}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "Add Health Record"}
        </button>
      </header>

      {/* Summary cards */}
      <section className="health-summary">

        <article className="health-stat-card">
          <div className="health-stat-icon total">
            <FileText size={21} />
          </div>

          <div>
            <p>Total Records</p>
            <h2>{totalRecords}</h2>
          </div>
        </article>

        <article className="health-stat-card">
          <div className="health-stat-icon buddy">
            <PawPrint size={21} />
          </div>

          <div>
            <p>Buddy's Records</p>
            <h2>{buddyRecords}</h2>
          </div>
        </article>

        <article className="health-stat-card">
          <div className="health-stat-icon luna">
            <HeartPulse size={21} />
          </div>

          <div>
            <p>Luna's Records</p>
            <h2>{lunaRecords}</h2>
          </div>
        </article>

      </section>

      {/* Add/Edit form */}
      {showForm && (
        <section className="health-form-card">

          <div className="health-form-heading">
            <div className="health-form-heading-icon">
              <HeartPulse size={21} />
            </div>

            <div>
              <h2>
                {editingId !== null
                  ? "Edit Health Record"
                  : "Add Health Record"}
              </h2>

              <p>
                Enter the health-related information below.
              </p>
            </div>
          </div>

          <form
            className="health-form"
            onSubmit={handleSubmit}
          >

            <label>
              Dog *

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
              Record Date *

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
              Record Category *

              <select
                value={form.category}
                onChange={(event) =>
                  setForm({ ...form, category: event.target.value })
                }
                required
              >
                <option value="General Checkup">General Checkup</option>
                <option value="Illness">Illness</option>
                <option value="Injury">Injury</option>
                <option value="Treatment">Treatment</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              Record Title *

              <input
                type="text"
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                placeholder="e.g. Routine Health Checkup"
                maxLength={100}
                required
              />
            </label>

            <label className="health-field-full">
              Description *

              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({
                    ...form,
                    description: event.target.value,
                  })
                }
                placeholder="Describe the health-related event..."
                rows={3}
                maxLength={1000}
                required
              />
            </label>

            <label className="health-field-full">
              Additional Notes

              <textarea
                value={form.notes}
                onChange={(event) =>
                  setForm({ ...form, notes: event.target.value })
                }
                placeholder="Add any additional notes..."
                rows={3}
                maxLength={1000}
              />
            </label>

            {error && (
              <p className="health-form-error" role="alert">
                {error}
              </p>
            )}

            <div className="health-form-actions">

              <button
                type="button"
                className="health-secondary-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="health-primary-button"
              >
                {editingId !== null
                  ? "Save Changes"
                  : "Save Record"}
              </button>

            </div>

          </form>
        </section>
      )}

      {/* Health records */}
      <section className="health-records-section">

        <div className="health-records-heading">
          <div>
            <h2>Health Records</h2>

            <p>
              {visibleRecords.length}{" "}
              {visibleRecords.length === 1 ? "record" : "records"} found
            </p>
          </div>
        </div>

        {/* Search and filter */}
        <div className="health-toolbar">

          <div className="health-search">
            <Search size={18} />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search health records..."
              aria-label="Search health records"
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
            className="health-filter"
            value={selectedDog}
            onChange={(event) => setSelectedDog(event.target.value)}
            aria-label="Filter records by dog"
          >
            <option value="All">All Dogs</option>
            <option value="Buddy">Buddy</option>
            <option value="Luna">Luna</option>
          </select>

        </div>

        {/* Record list */}
        {visibleRecords.length > 0 ? (

          <div className="health-record-list">

            {visibleRecords.map((record) => (

              <article className="health-record-card" key={record.id}>

                <div className="health-record-icon">
                  {record.category === "General Checkup" ? (
                    <Stethoscope size={21} />
                  ) : record.category === "Illness" ? (
                    <HeartPulse size={21} />
                  ) : (
                    <Activity size={21} />
                  )}
                </div>

                <div className="health-record-content">

                  <div className="health-record-top">

                    <div>
                      <span className="health-record-category">
                        {record.category}
                      </span>

                      <h3>{record.title}</h3>
                    </div>

                    <span className="health-record-date">
                      <CalendarDays size={14} />
                      {formatDate(record.date)}
                    </span>

                  </div>

                  <p className="health-record-description">
                    {record.description}
                  </p>

                  {record.notes && (
                    <div className="health-record-notes">
                      <strong>Notes:</strong> {record.notes}
                    </div>
                  )}

                  <div className="health-record-footer">

                    <span className="health-record-dog">
                      <PawPrint size={15} />
                      {record.dog}
                    </span>

                    <div className="health-record-actions">

                      <button
                        type="button"
                        onClick={() => openEditForm(record)}
                        aria-label={`Edit ${record.title}`}
                        title="Edit record"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        className="health-delete-button"
                        onClick={() => handleDelete(record.id)}
                        aria-label={`Delete ${record.title}`}
                        title="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="health-empty-state">

            <div className="health-empty-icon">
              <HeartPulse size={27} />
            </div>

            <h3>No health records found</h3>

            <p>
              Try a different search or select another dog,
              or add a new health record.
            </p>

            {search || selectedDog !== "All" ? (

              <button
                type="button"
                className="health-secondary-button"
                onClick={() => {
                  setSearch("");
                  setSelectedDog("All");
                }}
              >
                Clear Filters
              </button>

            ) : (

              <button
                type="button"
                className="health-primary-button"
                onClick={openAddForm}
              >
                <Plus size={17} />
                Add Your First Record
              </button>

            )}

          </div>

        )}

      </section>

      <p className="health-demo-notice">
        Demo mode: health records are stored temporarily in page
        state and will reset when the page reloads. Firebase
        integration will be needed to save records permanently.
        Health records do not replace professional veterinary advice.
      </p>

    </main>
  );
}
