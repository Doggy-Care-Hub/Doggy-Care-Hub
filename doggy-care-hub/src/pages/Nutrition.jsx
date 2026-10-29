
import { useState } from "react";

const dogs = [
  {
    id: 1,
    name: "Bruno",
    breed: "Golden Retriever",
    age: "3 Years",
    weight: "25 kg",
    dailyFood: "400 - 500 g",
    meals: "Two times / day",
  },
  {
    id: 2,
    name: "Buddy",
    breed: "Labrador Retriever",
    age: "2 Years",
    weight: "22 kg",
    dailyFood: "300 - 400 g",
    meals: "Two times / day",
  },
  {
    id: 3,
    name: "Luna",
    breed: "Shih Tzu",
    age: "1 Year",
    weight: "6 kg",
    dailyFood: "100 - 150 g",
    meals: "Two to three times / day",
  },
];

const recommendedFoods = [
  "Protein",
  "Vegetables",
  "Balanced dog food",
];

const foodsToAvoid = [
  "Chocolate",
  "Onions",
  "Grapes",
];

export default function Nutrition() {
  const [selectedDogId, setSelectedDogId] = useState("1");

  const selectedDog = dogs.find(
    (dog) => dog.id === Number(selectedDogId)
  );

  return (
    <div className="nutrition-page">
      <div className="nutrition-breadcrumb">
        Home <span>&gt;</span> Nutrition
      </div>

      <div className="nutrition-heading">
        <h1>Nutrition Recommendation</h1>
      </div>

      <div className="nutrition-dog-selector">
        <label htmlFor="nutrition-dog">Select Dog</label>

        <select
          id="nutrition-dog"
          value={selectedDogId}
          onChange={(event) =>
            setSelectedDogId(event.target.value)
          }
        >
          {dogs.map((dog) => (
            <option key={dog.id} value={dog.id}>
              {dog.name} ({dog.breed})
            </option>
          ))}
        </select>
      </div>

      {selectedDog && (
        <>
          <div className="nutrition-cards">
            <section className="nutrition-card">
              <h2>Dog Information</h2>

              <div className="nutrition-card-content">
                <div className="nutrition-detail-row">
                  <span>Age</span>
                  <strong>{selectedDog.age}</strong>
                </div>

                <div className="nutrition-detail-row">
                  <span>Breed</span>
                  <strong>{selectedDog.breed}</strong>
                </div>

                <div className="nutrition-detail-row">
                  <span>Weight</span>
                  <strong>{selectedDog.weight}</strong>
                </div>
              </div>
            </section>

            <section className="nutrition-card">
              <h2>Recommended Diet</h2>

              <div className="nutrition-card-content">
                <div className="nutrition-diet-item">
                  <span>Daily Food</span>
                  <strong>{selectedDog.dailyFood}</strong>
                </div>

                <div className="nutrition-diet-item">
                  <span>Meals</span>
                  <strong>{selectedDog.meals}</strong>
                </div>
              </div>
            </section>

            <section className="nutrition-card">
              <h2>Recommended Foods</h2>

              <div className="nutrition-food-list">
                {recommendedFoods.map((food) => (
                  <div
                    className="nutrition-food-item"
                    key={food}
                  >
                    {food}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="nutrition-avoid-card">
            <h2>Foods to Avoid</h2>

            <div className="nutrition-avoid-list">
              {foodsToAvoid.map((food) => (
                <div
                  className="nutrition-avoid-item"
                  key={food}
                >
                  {food}
                </div>
              ))}
            </div>
          </section>

          <p className="nutrition-disclaimer">
            These recommendations are general guidance. Actual
            food requirements depend on your dog's age, activity,
            health, and individual needs. Consult a veterinarian
            for personalized dietary advice.
          </p>
        </>
      )}
    </div>
  );
}
