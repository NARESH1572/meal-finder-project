
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MealPage from '../pages/MealPage';
import Header from '../components/Header';

const Routings = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meal/:id" element={<MealPage />} />
    </Routes>
  </>
);

export default Routings;


