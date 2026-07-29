import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';

/**
 * App Router Component
 * 
 * Central routing table for Delibird Mart frontend application.
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        } 
      />
      {/* Additional Phase routes (Auth, Products, Cart, Profile) will be added here in future phases */}
      <Route 
        path="*" 
        element={
          <MainLayout>
            <div className="text-center py-20 space-y-4">
              <h1 className="text-6xl font-extrabold text-red-500">404</h1>
              <p className="text-xl text-gray-300">Lost in the Kalos region? Route not found.</p>
            </div>
          </MainLayout>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
