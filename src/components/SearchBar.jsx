
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMealsByName } from '../features/meals/mealSlice';
import { FaSearch } from 'react-icons/fa';
import heroImage from '../assets/hero-img.jpg';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (term.trim()) dispatch(fetchMealsByName(term));
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '60vh',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="d-flex bg-white shadow rounded-pill overflow-hidden" style={{ maxWidth: '500px', width: '90%' }}>
        <input
          type="text"
          className="form-control border-0 ps-4"
          placeholder="Search recipes here ..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="btn" style={{ backgroundColor: '#f26522' }} onClick={handleSearch}>
          <FaSearch className="text-white" />
        </button>
      </div>

      <h2 className="text-white fw-bold mt-4">What are your favorite cuisines?</h2>
      <p className="text-white text-uppercase">Personalize your experience</p>
    </div>
  );
};

export default SearchBar;

