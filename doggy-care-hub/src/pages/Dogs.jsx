
import { useState } from "react";

const initialDogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    weight: "28 kg",
    emoji: "🐕",
    color: "gold",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Shih Tzu",
    age: "8 months",
    gender: "Female",
    weight: "5 kg",
    emoji: "🐩",
    color: "pink",
  },
];

export default function Dogs() {
  const [dogs, setDogs] = useState(initialDogs);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "Male",
    weight: "",
  });

  const filteredDogs = dogs.filter((dog) =>
    `${dog.name} ${dog.breed}`.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(event) {
    event.preventDefault();

    const newDog = {
      ...form,
      id: Date.now(),
      emoji: "🐶",
      color: "gold",
    };

    setDogs((currentDogs) => [...currentDogs, newDog]);
    setForm({
      name: "",
      breed: "",
      age: "",
      gender: "Male",
      weight: "",
    });
    setShowForm(false);
  }

  return (
    <main className="dogs-page">
      <header className="dogs-heading">
        <div>
          <span className="dashboard-section-label">YOUR COMPANIONS</span>
          <h1>My Dogs</h1>
          <p>Every dog has a story. Keep their details together in one place.</p>
        </div>

        <button
          className="button button-primary"
          onClick={() => setShowForm((visible) => !visible)}
        >
          {showForm ? "Cancel" : "+ Add New Dog"}
        </button>
      </header>

      {showForm && (
        <section className="dog-form-card">
          <h2>Add a Dog Profile</h2>
          <p>Enter your dog's basic details below.</p>

          <form onSubmit={handleSubmit} className="dog-form">
            <div className="dog-form-field">
              <label htmlFor="dog-name">Dog's name *</label>
              <input
                id="dog-name"
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="e.g. Max"
              />
            </div>

            <div className="dog-form-field">
              <label htmlFor="dog-breed">Breed *</label>
              <input
                id="dog-breed"
                required
                value={form.breed}
                onChange={(event) =>
                  setForm({ ...form, breed: event.target.value })
                }
                placeholder="e.g. Labrador"
              />
            </div>

            <div className="dog-form-field">
              <label htmlFor="dog-age">Age</label>
              <input
                id="dog-age"
                value={form.age}
                onChange={(event) =>
                  setForm({ ...form, age: event.target.value })
                }
                placeholder="e.g. 1 year"
              />
            </div>

            <div className="dog-form-field">
              <label htmlFor="dog-gender">Gender</label>
              <select
                id="dog-gender"
                value={form.gender}
                onChange={(event) =>
                  setForm({ ...form, gender: event.target.value })
                }
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="dog-form-field">
              <label htmlFor="dog-weight">Weight</label>
              <input
                id="dog-weight"
                value={form.weight}
                onChange={(event) =>
                  setForm({ ...form, weight: event.target.value })
                }
                placeholder="e.g. 12 kg"
              />
            </div>

            <div className="dog-form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Save Dog
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="dogs-toolbar">
        <div>
          <strong>{filteredDogs.length} dogs</strong>
          <span> in your collection</span>
        </div>

        <input
          aria-label="Search dogs"
          className="dog-search"
          placeholder="Search by name or breed..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </section>

      {filteredDogs.length > 0 ? (
        <section className="managed-dog-grid">
          {filteredDogs.map((dog) => (
            <article className="managed-dog-card" key={dog.id}>
              <div className={`managed-dog-art ${dog.color}`}>
                <span>{dog.emoji}</span>
                <span className="managed-dog-badge">Dog profile</span>
              </div>

              <div className="managed-dog-body">
                <h2>{dog.name}</h2>
                <p className="managed-dog-breed">{dog.breed}</p>

                <div className="managed-dog-details">
                  <div>
                    <span>Age</span>
                    <strong>{dog.age || "Not provided"}</strong>
                  </div>
                  <div>
                    <span>Gender</span>
                    <strong>{dog.gender}</strong>
                  </div>
                  <div>
                    <span>Weight</span>
                    <strong>{dog.weight || "Not provided"}</strong>
                  </div>
                </div>

                <div className="managed-dog-footer">
                  <span>🐾 Care profile</span>
                  <span className="profile-status">Active</span>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="dogs-empty-state">
          <span>🐶</span>
          <h2>No dogs found</h2>
          <p>Try another search or add a new dog profile.</p>
        </div>
      )}

      <p className="demo-notice">
        Demo mode: dog profiles are stored temporarily in the page's state.
        They will reset when the page is refreshed. Firestore integration comes later.
      </p>
    </main>
  );
}
