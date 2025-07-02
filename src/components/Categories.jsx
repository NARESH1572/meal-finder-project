
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchMealsByCategory } from '../features/meals/mealSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container my-5">
      <h4 className="fw-bold border-bottom pb-2 mb-4">Categories</h4>
      <div className="row">
        {categories.map((cat) => (
          <div
            key={cat.idCategory}
            className="col-6 col-sm-4 col-md-3 mb-4 text-center"
            style={{ cursor: 'pointer' }}
            onClick={() => dispatch(fetchMealsByCategory(cat.strCategory))}
          >
            <div className="border rounded shadow-sm p-2">
              <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-100 rounded" />
              <span className="badge bg-warning text-white mt-2">{cat.strCategory}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
