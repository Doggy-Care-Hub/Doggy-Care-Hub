
import { useState } from "react";
import {
  Search,
  PawPrint,
  Heart,
  Clock,
  Sparkles,
  Ruler,
  X,
} from "lucide-react";

const breeds = [
  {
    name: "Golden Retriever",
    size: "Large",
    temperament: "Friendly, intelligent, devoted",
    lifespan: "10–12 years",
    care: "Regular exercise, brushing, and companionship.",
    emoji: "🐕",
  },
  {
    name: "Shih Tzu",
    size: "Small",
    temperament: "Affectionate, playful, outgoing",
    lifespan: "10–16 years",
    care: "Frequent coat grooming, gentle exercise, and dental care.",
    emoji: "🐩",
  },
  {
    name: "Labrador Retriever",
    size: "Large",
    temperament: "Friendly, active, outgoing",
    lifespan: "11–13 years",
    care: "Daily exercise, weight management, and regular grooming.",
    emoji: "🦮",
  },
  {
    name: "German Shepherd",
    size: "Large",
    temperament: "Confident, loyal, intelligent",
    lifespan: "9–13 years",
    care: "Consistent exercise, training, and coat maintenance.",
    emoji: "🐕‍🦺",
  },
  {
    name: "Beagle",
    size: "Medium",
    temperament: "Curious, cheerful, friendly",
    lifespan: "10–15 years",
    care: "Daily walks, scent-based activities, and ear care.",
    emoji: "🐶",
  },
  {
    name: "Pomeranian",
    size: "Small",
    temperament: "Lively, curious, confident",
    lifespan: "12–16 years",
    care: "Regular brushing, dental care, and supervised exercise.",
    emoji: "🐕",
  },
];

const sizes = ["All", "Small", "Medium", "Large"];

export default function Breeds() {
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedBreed, setSelectedBreed] = useState(null);

  const filteredBreeds = breeds.filter((breed) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      `${breed.name} ${breed.temperament} ${breed.care}`
        .toLowerCase()
        .includes(query);

    const matchesSize =
      selectedSize === "All" || breed.size === selectedSize;

    return matchesSearch && matchesSize;
  });

  function clearFilters() {
    setSearch("");
    setSelectedSize("All");
  }

  return (
    <main className="breeds-page">
      {/* Page heading */}
      <header className="breeds-heading">
        <div>
          <span className="breeds-eyebrow">EXPLORE AND LEARN</span>
          <h1>Dog Breeds</h1>
          <p>
            Discover breed characteristics, expected lifespans,
            and everyday care essentials.
          </p>
        </div>

        <div className="breeds-total">
          <PawPrint size={19} />
          <div>
            <strong>{breeds.length}</strong>
            <span>Sample breeds</span>
          </div>
        </div>
      </header>

      {/* Search and filters */}
      <section className="breeds-filter-panel">
        <div className="breeds-search">
          <Search size={17} />
          <input
            type="search"
            aria-label="Search dog breeds"
            placeholder="Search by breed, temperament, or care..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              type="button"
              className="breeds-clear-search"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        <div className="breeds-size-filter">
          <span className="breeds-filter-label">
            <Ruler size={15} />
            Size
          </span>

          <div className="breeds-filter-options">
            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                className={`breeds-filter-button ${
                  selectedSize === size ? "selected" : ""
                }`}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results heading */}
      <div className="breeds-results-heading">
        <div>
          <h2>Browse Breeds</h2>
          <p>
            Showing {filteredBreeds.length} of {breeds.length} breeds
          </p>
        </div>

        {(search || selectedSize !== "All") && (
          <button
            type="button"
            className="breeds-reset-button"
            onClick={clearFilters}
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {/* Breed cards */}
      {filteredBreeds.length > 0 ? (
        <section className="breed-grid">
          {filteredBreeds.map((breed) => (
            <article className="breed-card" key={breed.name}>
              <div className="breed-art">
                <span className="breed-emoji">{breed.emoji}</span>

                <span className="breed-size-badge">
                  {breed.size}
                </span>
              </div>

              <div className="breed-card-body">
                <div className="breed-card-title">
                  <div>
                    <h3>{breed.name}</h3>
                    <p className="breed-temperament">
                      {breed.temperament}
                    </p>
                  </div>

                  <span className="breed-card-paw">
                    <PawPrint size={17} />
                  </span>
                </div>

                <div className="breed-lifespan">
                  <Clock size={16} />
                  <span>Expected lifespan</span>
                  <strong>{breed.lifespan}</strong>
                </div>

                <div className="breed-care">
                  <h4>
                    <Heart size={15} />
                    Care essentials
                  </h4>
                  <p>{breed.care}</p>
                </div>

                <button
                  type="button"
                  className="breed-details-button"
                  onClick={() => setSelectedBreed(breed)}
                >
                  Explore breed
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="breeds-empty-state">
          <div className="breeds-empty-icon">
            <Search size={27} />
          </div>
          <h2>No breeds found</h2>
          <p>
            Try another search term or choose a different size.
          </p>
          <button
            type="button"
            className="breeds-reset-button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </section>
      )}

      {/* Breed details dialog */}
      {selectedBreed && (
        <div
          className="breed-modal-backdrop"
          onClick={() => setSelectedBreed(null)}
        >
          <section
            className="breed-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="breed-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="breed-modal-close"
              aria-label="Close breed details"
              onClick={() => setSelectedBreed(null)}
            >
              <X size={19} />
            </button>

            <div className="breed-modal-art">
              <span>{selectedBreed.emoji}</span>
            </div>

            <span className="breeds-eyebrow">
              BREED INFORMATION
            </span>
            <h2 id="breed-modal-title">{selectedBreed.name}</h2>

            <div className="breed-modal-facts">
              <div>
                <span>Size</span>
                <strong>{selectedBreed.size}</strong>
              </div>
              <div>
                <span>Expected lifespan</span>
                <strong>{selectedBreed.lifespan}</strong>
              </div>
            </div>

            <div className="breed-modal-section">
              <h3>
                <Sparkles size={16} />
                Temperament
              </h3>
              <p>{selectedBreed.temperament}</p>
            </div>

            <div className="breed-modal-section">
              <h3>
                <Heart size={16} />
                Everyday care
              </h3>
              <p>{selectedBreed.care}</p>
            </div>

            <p className="breed-modal-note">
              Individual dogs have different needs. Consult a
              veterinarian or qualified dog-care professional for
              advice tailored to your dog.
            </p>

            <button
              type="button"
              className="breeds-modal-done"
              onClick={() => setSelectedBreed(null)}
            >
              Close details
            </button>
          </section>
        </div>
      )}

      <p className="breeds-demo-notice">
        Sample breed information for the frontend demo. Breed
        profiles can be expanded and reviewed before release.
      </p>
    </main>
  );
}
