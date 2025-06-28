
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchMealsByCategory } from '../features/meals/mealSlice';
import React, { useEffect } from 'react';


import { FaBars } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClickCategory = (category) => {
    dispatch(fetchMealsByCategory(category));
  };

  return (
    <>
      <nav className="navbar navbar-dark px-4 sticky-top" style={{ backgroundColor: '#f26522' }}>
        <div className="container-fluid d-flex justify-content-between">
          <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
            <MdFastfood size={24} />
            MEAL FINDER
          </a>
          <button
            className="btn text-white"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            aria-controls="offcanvasMenu"
          >
            <FaBars size={22} />
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Categories</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            {categories.map((cat) => (
              <li key={cat.idCategory} className="nav-item">
                <span className="nav-link" style={{ cursor: 'pointer' }} onClick={() => handleClickCategory(cat.strCategory)}>
                  {cat.strCategory}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
