
import React, { useMemo, useState } from "react";
import {
  Search,
  Heart,
  ShieldCheck,
  Utensils,
  Dumbbell,
  Bath,
  Stethoscope,
  BookOpen,
  PawPrint,
  AlertTriangle,
} from "lucide-react";

const guidanceItems = [
  {
    id: 1,
    title: "Daily Exercise",
    category: "Exercise",
    icon: Dumbbell,
    description:
      "Regular physical activity helps dogs maintain a healthy weight and supports their physical and mental well-being.",
    tips: [
      "Provide daily walks appropriate for your dog's age and breed.",
      "Include safe play activities.",
      "Allow enough rest between exercise sessions.",
    ],
  },
  {
    id: 2,
    title: "Balanced Nutrition",
    category: "Nutrition",
    icon: Utensils,
    description:
      "A balanced diet provides the nutrients dogs need for growth, energy and overall health.",
    tips: [
      "Choose food suitable for your dog's age and size.",
      "Provide clean drinking water throughout the day.",
      "Avoid giving foods that are unsafe for dogs.",
    ],
  },
  {
    id: 3,
    title: "Grooming and Hygiene",
    category: "Hygiene",
    icon: Bath,
    description:
      "Regular grooming helps maintain your dog's coat, skin, nails and general cleanliness.",
    tips: [
      "Brush your dog's coat regularly.",
      "Keep nails at a suitable length.",
      "Check ears, eyes and skin for unusual changes.",
    ],
  },
  {
    id: 4,
    title: "Routine Health Check-ups",
    category: "Health",
    icon: Stethoscope,
    description:
      "Routine veterinary check-ups can help identify potential health concerns and support preventive care.",
    tips: [
      "Follow a suitable veterinary check-up schedule.",
      "Keep vaccination and health records updated.",
      "Discuss unusual behaviour or physical changes with a veterinarian.",
    ],
  },
  {
    id: 5,
    title: "Dental Care",
    category: "Hygiene",
    icon: Heart,
    description:
      "Good dental care supports oral hygiene and helps reduce the risk of dental problems.",
    tips: [
      "Use dental products designed specifically for dogs.",
      "Introduce tooth brushing gradually.",
      "Ask a veterinarian about your dog's dental care needs.",
    ],
  },
  {
    id: 6,
    title: "Vaccination Awareness",
    category: "Preventive Care",
    icon: ShieldCheck,
    description:
      "Vaccinations help protect dogs against certain infectious diseases. Requirements depend on individual circumstances.",
    tips: [
      "Follow the vaccination schedule recommended by your veterinarian.",
      "Keep vaccination dates and records.",
      "Ask your veterinarian about booster vaccinations.",
    ],
  },
];

const preventiveItems = [
  {
    title: "Vaccination Schedule",
    description:
      "Keep vaccinations up to date according to your veterinarian's recommendations.",
    icon: ShieldCheck,
  },
  {
    title: "Parasite Prevention",
    description:
      "Discuss suitable flea, tick and worm prevention with your veterinarian.",
    icon: Heart,
  },
  {
    title: "Healthy Diet",
    description:
      "Provide balanced meals and fresh drinking water every day.",
    icon: Utensils,
  },
  {
    title: "Regular Exercise",
    description:
      "Maintain an exercise routine appropriate for your dog's age and condition.",
    icon: Dumbbell,
  },
];

const categories = [
  "All",
  "Health",
  "Nutrition",
  "Exercise",
  "Hygiene",
  "Preventive Care",
];

function CareGuidance() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuidance = useMemo(() => {
    return guidanceItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      const searchText =
        `${item.title} ${item.description} ${item.category}`.toLowerCase();

      return matchesCategory && searchText.includes(searchTerm.toLowerCase());
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="care-guidance-page">
      <div className="care-guidance-header">
        <div>
          <span className="care-guidance-eyebrow">
            <PawPrint size={16} /> DOGGY CARE HUB
          </span>
          <h1>Health Guidance</h1>
          <p>
            Helpful information and recommendations to support your dog's
            everyday health and well-being.
          </p>
        </div>
      </div>

      <section className="care-guidance-intro">
        <div className="care-guidance-intro-content">
          <span className="care-guidance-tag">CARE STARTS WITH KNOWLEDGE</span>
          <h2>Give your dog the care they deserve.</h2>
          <p>
            Explore practical guidance on nutrition, exercise, hygiene and
            preventive care to help you build healthy routines for your dog.
          </p>
        </div>
        <div className="care-guidance-intro-icon">
          <Heart size={76} strokeWidth={1.4} />
        </div>
      </section>

      <section className="preventive-section">
        <div className="care-section-heading">
          <div>
            <h2>Preventive Care</h2>
            <p>Simple practices that support your dog's long-term well-being.</p>
          </div>
        </div>

        <div className="preventive-grid">
          {preventiveItems.map((item) => {
            const Icon = item.icon;

            return (
              <div className="preventive-card" key={item.title}>
                <div className="preventive-icon">
                  <Icon size={22} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="guidance-library-section">
        <div className="care-section-heading">
          <div>
            <h2>Explore Health Topics</h2>
            <p>Browse useful guidance for your dog's daily care.</p>
          </div>
          <span className="guidance-count">
            {filteredGuidance.length} topics
          </span>
        </div>

        <div className="guidance-search">
          <Search size={19} />
          <input
            type="text"
            placeholder="Search health topics..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="guidance-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category ? "active" : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="guidance-grid">
          {filteredGuidance.length > 0 ? (
            filteredGuidance.map((item) => {
              const Icon = item.icon;

              return (
                <article className="guidance-card" key={item.id}>
                  <div className="guidance-card-top">
                    <div className="guidance-card-icon">
                      <Icon size={23} />
                    </div>
                    <span className="guidance-category-label">
                      {item.category}
                    </span>
                  </div>

                  <h3>{item.title}</h3>
                  <p className="guidance-description">
                    {item.description}
                  </p>

                  <div className="guidance-tips">
                    <h4>Helpful Tips</h4>
                    <ul>
                      {item.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="guidance-empty">
              <BookOpen size={35} />
              <h3>No topics found</h3>
              <p>Try another search term or select a different category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="guidance-disclaimer">
        <AlertTriangle size={22} />
        <div>
          <h3>Important Health Notice</h3>
          <p>
            This information is provided for general educational purposes
            only. It does not replace professional veterinary advice,
            diagnosis or treatment. If your dog shows unusual symptoms or
            appears unwell, contact a qualified veterinarian.
          </p>
        </div>
      </section>
    </div>
  );
}

export default CareGuidance;
