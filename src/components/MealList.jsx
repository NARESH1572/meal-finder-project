
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MealList = () => {
  const { meals } = useSelector((state) => state.meals);

  if (!meals || meals.length === 0) return <h5 className="text-center mt-4">No meals found.</h5>;

  return (
    <div className="container my-4">
      <h4 className="fw-bold border-bottom pb-2">Meals</h4>
      <div className="row">
        {meals.map((meal) => (
          <div className="col-6 col-sm-4 col-md-3 mb-4" key={meal.idMeal}>
            <Link to={`/meal/${meal.idMeal}`} className="text-decoration-none text-dark">
              <div className="card shadow-sm">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="card-img-top" />
                <div className="card-body p-2 text-center">
                  <h6 className="card-title">{meal.strMeal}</h6>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealList;
