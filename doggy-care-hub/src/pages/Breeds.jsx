
import { useState } from "react";

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

export default function Breeds() {
  const [search, setSearch] = useState("");
  const [selectedSize, setSelectedSize] = useState("All");

  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch = `${breed.name} ${breed.temperament}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesSize =
      selectedSize === "All" || breed.size === selectedSize;

    return matchesSearch && matchesSize;
  });

  return (
    <main className="breeds-page">
      <section className="breeds-hero">
        <span className="dashboard-section-label">
          DISCOVER YOUR DOG
        </span>
        <h1>Dog Breed Information</h1>
        <p>
          Explore different breeds and learn about their characteristics,
          lifespans, and everyday care needs.
        </p>
      </section>

      <section className="breed-controls">
        <input
          type="text"
          placeholder="Search breeds or temperament..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="breed-search"
        />

        <select
          value={selectedSize}
          onChange={(event) => setSelectedSize(event.target.value)}
          className="breed-size-filter"
        >
          <option value="All">All sizes</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </section>

      <section className="breed-grid">
        {filteredBreeds.length > 0 ? (
          filteredBreeds.map((breed) => (
            <article className="breed-card" key={breed.name}>
              <div className="breed-art">
                <span>{breed.emoji}</span>
                <span className="breed-size-badge">{breed.size}</span>
              </div>

              <div className="breed-card-body">
                <h2>{breed.name}</h2>
                <p className="breed-temperament">
                  {breed.temperament}
                </p>

                <div className="breed-info-row">
                  <span>Expected lifespan</span>
                  <strong>{breed.lifespan}</strong>
                </div>

                <div className="breed-care">
                  <strong>Care essentials</strong>
                  <p>{breed.care}</p>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="dogs-empty-state">
            <span>🐾</span>
            <h2>No breeds found</h2>
            <p>Try a different search or size filter.</p>
          </div>
        )}
      </section>

      <p className="demo-notice">
        These are sample breed profiles for the frontend demo.
        Breed information can be expanded and reviewed before release.
      </p>
    </main>
  );
}
