



import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMealById } from '../features/meals/mealSlice';
import { FaCheckSquare, FaUtensilSpoon } from 'react-icons/fa';

const MealDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMeal: meal } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchMealById(id));
  }, [dispatch, id]);

  if (!meal) return <div className="p-4">Loading...</div>;

  // Ingredients & Measures extraction
  const ingredients = [];
  const measures = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(ing);
      measures.push(measure);
    }
  }

  // Split measures into 2 columns
  const chunk = (arr) => {
    const size = Math.ceil(arr.length / 2);
    return [arr.slice(0, size), arr.slice(size)];
  };
  const [measureCol1, measureCol2] = chunk(measures);

  // Instructions pointwise
  const instructionLines = meal.strInstructions
    ?.split(/\r?\n|\.\s+/)
    .filter(line => line.trim() !== '')
    .slice(0, 5);

  return (
    <div className="container my-5">
      {/* ✅ Top: Left (Image) + Right (Title + Info + Ingredients) */}
      <div className="row align-items-start mb-4">
        {/* Left Image */}
        <div className="col-md-5 mb-4 mb-md-0">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-100 rounded shadow"
          />
        </div>

        {/* Right Info + Ingredients */}
        <div className="col-md-7">
          <h1 className="fw-bold text-warning mb-3">{meal.strMeal}</h1>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p>
            <strong>Source:</strong>{' '}
            <a href={meal.strSource} target="_blank" rel="noreferrer">
              {meal.strSource || 'N/A'}
            </a>
          </p>
          <p><strong>Tags:</strong> {meal.strTags ? meal.strTags.split(',').join(', ') : 'None'}</p>

          {/* Ingredients in orange box */}
          <div className="p-3 rounded shadow-sm mt-4" style={{ backgroundColor: '#f26522', color: 'white' }}>
            <h5 className="fw-bold mb-3">Ingredients:</h5>
            <div className="row">
              {ingredients.map((ing, index) => (
                <div className="col-6 col-md-4 mb-3 d-flex align-items-start" key={index}>
                  <div
                    className="me-2 text-white fw-bold text-center"
                    style={{
                      width: '30px',
                      height: '30px',
                      lineHeight: '30px',
                      borderRadius: '50%',
                      backgroundColor: 'green',
                      fontSize: '14px',
                    }}
                  >
                    {index + 1}
                  </div>
                  <span>{ing}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Measures Section (Orange Border) */}
      <div className="p-3 border border-warning rounded shadow-sm mb-4">
        <h5 className="fw-bold mb-3 text-dark">Measure:</h5>
        <div className="row">
          <div className="col-6">
            {measureCol1.map((m, i) => (
              <div key={i} className="mb-2 d-flex align-items-center">
                <FaUtensilSpoon className="text-warning me-2" />
                <span>{m}</span>
              </div>
            ))}
          </div>
          <div className="col-6">
            {measureCol2.map((m, i) => (
              <div key={i} className="mb-2 d-flex align-items-center">
                <FaUtensilSpoon className="text-warning me-2" />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Instructions Section */}
      <div className="mt-4">
        <h4 className="fw-bold text-dark mb-3">Instructions:</h4>
        <div className="border p-3 rounded bg-light">
          {instructionLines.map((line, idx) => (
            <div key={idx} className="mb-3 d-flex align-items-start">
              <FaCheckSquare className="text-danger me-2 mt-1" />
              <span>{line.trim()}.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetail;











