
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMealById } from '../features/meals/mealSlice';

const MealDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMeal: meal } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchMealById(id));
  }, [dispatch, id]);

  if (!meal) return <div className="p-4">Loading...</div>;

  // Collect up to 8 ingredients
  const ingredients = [];
  for (let i = 1; i <= 8; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  // Split into 3 vertical columns
  const col1 = ingredients.filter((_, i) => i % 3 === 0);
  const col2 = ingredients.filter((_, i) => i % 3 === 1);
  const col3 = ingredients.filter((_, i) => i % 3 === 2);

  const renderColumn = (items, start) => (
    <div className="col-md-4">
      {items.map((item, i) => (
        <div key={i} className="d-flex align-items-center mb-2">
          <span
            className="me-2 d-inline-block text-center fw-bold"
            style={{
              width: '30px',
              height: '30px',
              lineHeight: '30px',
              borderRadius: '50%',
              backgroundColor: 'green',
              color: 'white',
              fontSize: '14px',
            }}
          >
            {start + i + 1}
          </span>
          <span>{item.ingredient} - {item.measure}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left: Image */}
        <div className="col-md-5">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-100 rounded shadow"
          />
        </div>

        {/* Right: Meal Info */}
        <div className="col-md-7">
          <h3 className="fw-bold mb-3" style={{ color: '#f26522' }}>{meal.strMeal}</h3>
          <p><strong>Category:</strong> {meal.strCategory}</p>
          <p><strong>Source:</strong> <a href={meal.strSource} target="_blank" rel="noopener noreferrer">{meal.strSource}</a></p>
          <p><strong>Tags:</strong> {meal.strTags ? meal.strTags.split(',').join(', ') : 'None'}</p>

          <div style={{ backgroundColor: '#f26522' }} className="text-white p-1 rounded mt-4 shadow-sm">
            <h5 className="fw-bold mb-3">Ingredients</h5>
            <div className="row">
              {renderColumn(col1, 0)}
              {renderColumn(col2, col1.length)}
              {renderColumn(col3, col1.length + col2.length)}
            </div>
          </div>
        </div>
      </div>

    
      <div className="mt-5">
        <h2 className="fw-bold border-bottom pb-2" style={{ color: '#f26522' }}>Instructions</h2>
        <p className="border p-3 rounded" style={{ backgroundColor: '#f9f9f9' }}>
          {meal.strInstructions}
        </p>
      </div>
    </div>
  );
};

export default MealDetail;








