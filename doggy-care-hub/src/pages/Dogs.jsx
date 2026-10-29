
import { useState } from "react";
import {
  Plus,
  Search,
  PawPrint,
  Pencil,
  Trash2,
  X,
  Dog as DogIcon,
  Weight,
  CalendarDays,
  VenusAndMars,
} from "lucide-react";

const initialDogs = [
  {
    id: 1,
    name: "Buddy",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    weight: "28 kg",
    emoji: "🐕",
  },
  {
    id: 2,
    name: "Luna",
    breed: "Shih Tzu",
    age: "8 months",
    gender: "Female",
    weight: "5 kg",
    emoji: "🐩",
  },
];

const emptyForm = {
  name: "",
  breed: "",
  age: "",
  gender: "Male",
  weight: "",
};

export default function Dogs() {
  const [dogs, setDogs] = useState(initialDogs);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingDogId, setEditingDogId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredDogs = dogs.filter((dog) =>
    `${dog.name} ${dog.breed}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  function openAddForm() {
    setForm(emptyForm);
    setEditingDogId(null);
    setShowForm(true);
  }

  function openEditForm(dog) {
    setForm({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      gender: dog.gender,
      weight: dog.weight,
    });
    setEditingDogId(dog.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeForm() {
    setShowForm(false);
    setEditingDogId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedDog = {
      name: form.name.trim(),
      breed: form.breed.trim(),
      age: form.age.trim(),
      gender: form.gender,
      weight: form.weight.trim(),
      emoji: editingDogId
        ? dogs.find((dog) => dog.id === editingDogId)?.emoji || "🐶"
        : "🐶",
    };

    if (editingDogId !== null) {
      setDogs((currentDogs) =>
        currentDogs.map((dog) =>
          dog.id === editingDogId
            ? { ...dog, ...cleanedDog }
            : dog
        )
      );
    } else {
      setDogs((currentDogs) => [
        ...currentDogs,
        { ...cleanedDog, id: Date.now() },
      ]);
    }

    closeForm();
  }

  function handleDelete(dog) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${dog.name}'s profile?`
    );

    if (!confirmed) return;

    setDogs((currentDogs) =>
      currentDogs.filter((item) => item.id !== dog.id)
    );
  }

  return (
    <main className="dogs-page">
      {/* Page heading */}
      <header className="dogs-heading">
        <div>
          <span className="dogs-eyebrow">YOUR COMPANIONS</span>
          <h1>My Dogs</h1>
          <p>
            Manage your dogs' profiles and keep their care
            information organized in one place.
          </p>
        </div>

        <button
          type="button"
          className="dogs-primary-button"
          onClick={showForm ? closeForm : openAddForm}
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Cancel" : "Add Dog"}
        </button>
      </header>

      {/* Add/Edit form */}
      {showForm && (
        <section className="dog-form-card">
          <div className="dog-form-heading">
            <div className="dog-form-heading-icon">
              <PawPrint size={21} />
            </div>

            <div>
              <h2>
                {editingDogId ? "Edit Dog Profile" : "Add a Dog Profile"}
              </h2>
              <p>
                {editingDogId
                  ? "Update your dog's information below."
                  : "Enter your dog's details to create a profile."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="dog-form">
            <div className="dog-form-field">
              <label htmlFor="dog-name">Dog's name *</label>
              <input
                id="dog-name"
                type="text"
                required
                maxLength={60}
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
                type="text"
                required
                maxLength={80}
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
                type="text"
                value={form.age}
                onChange={(event) =>
                  setForm({ ...form, age: event.target.value })
                }
                placeholder="e.g. 2 years"
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="dog-form-field">
              <label htmlFor="dog-weight">Weight</label>
              <input
                id="dog-weight"
                type="text"
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
                className="dogs-secondary-button"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="dogs-primary-button"
              >
                {editingDogId ? "Save Changes" : "Save Dog"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Search and count */}
      <section className="dogs-toolbar">
        <div className="dogs-count">
          <strong>{filteredDogs.length}</strong>
          <span>
            {filteredDogs.length === 1 ? " dog found" : " dogs found"}
          </span>
        </div>

        <label className="dogs-search">
          <Search size={17} />
          <input
            type="search"
            aria-label="Search dogs by name or breed"
            placeholder="Search dogs..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button
              type="button"
              className="dogs-clear-search"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              <X size={15} />
            </button>
          )}
        </label>
      </section>

      {/* Dog profile cards */}
      {filteredDogs.length > 0 ? (
        <section className="managed-dog-grid">
          {filteredDogs.map((dog) => (
            <article className="managed-dog-card" key={dog.id}>
              <div className="managed-dog-art">
                <span className="managed-dog-emoji">{dog.emoji}</span>
                <span className="managed-dog-badge">Active profile</span>
              </div>

              <div className="managed-dog-body">
                <div className="managed-dog-title-row">
                  <div>
                    <h2>{dog.name}</h2>
                    <p className="managed-dog-breed">{dog.breed}</p>
                  </div>

                  <span className="managed-dog-paw">
                    <PawPrint size={19} />
                  </span>
                </div>

                <div className="managed-dog-details">
                  <div>
                    <CalendarDays size={15} />
                    <span>Age</span>
                    <strong>{dog.age || "Not provided"}</strong>
                  </div>

                  <div>
                    <VenusAndMars size={15} />
                    <span>Gender</span>
                    <strong>{dog.gender}</strong>
                  </div>

                  <div>
                    <Weight size={15} />
                    <span>Weight</span>
                    <strong>{dog.weight || "Not provided"}</strong>
                  </div>
                </div>

                <div className="managed-dog-footer">
                  <span className="profile-status">
                    <span className="profile-status-dot" />
                    Active
                  </span>

                  <div className="managed-dog-actions">
                    <button
                      type="button"
                      className="dog-action-button"
                      onClick={() => openEditForm(dog)}
                      aria-label={`Edit ${dog.name}'s profile`}
                      title="Edit profile"
                    >
                      <Pencil size={15} />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className="dog-action-button dog-delete-button"
                      onClick={() => handleDelete(dog)}
                      aria-label={`Delete ${dog.name}'s profile`}
                      title="Delete profile"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <button
            type="button"
            className="managed-add-dog-card"
            onClick={openAddForm}
          >
            <span className="managed-add-dog-icon">
              <Plus size={23} />
            </span>
            <strong>Add a Dog</strong>
            <span>Create another dog profile</span>
          </button>
        </section>
      ) : (
        <section className="dogs-empty-state">
          <div className="dogs-empty-icon">
            <DogIcon size={32} />
          </div>

          <h2>{search ? "No dogs found" : "No dog profiles yet"}</h2>

          <p>
            {search
              ? "Try searching with a different name or breed."
              : "Add your first dog to start organizing their care details."}
          </p>

          {search ? (
            <button
              type="button"
              className="dogs-secondary-button"
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>
          ) : (
            <button
              type="button"
              className="dogs-primary-button"
              onClick={openAddForm}
            >
              <Plus size={17} />
              Add Your First Dog
            </button>
          )}
        </section>
      )}

      <p className="dogs-demo-notice">
        Demo mode: profile changes are stored temporarily in this page.
        They will reset when you refresh. Firestore integration will be
        needed to save profiles permanently.
      </p>
    </main>
  );
}
