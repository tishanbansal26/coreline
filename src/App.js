import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext'; // Import the ShopProvider

// Import Page Components
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

// Import Component for Header
import Header from ```````````````````````````````'./components/Header'```````````````````````````````;

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'productDetail', 'cart'
  const [selectedProduct, setSelectedProduct] = useState(null); // Holds the product selected for detail view

  return (
    // Tailwind CSS setup for the entire app
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      {/* Load Tailwind CSS from CDN - crucial for styling */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Load Inter font from Google Fonts */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      {/* ShopProvider wraps the entire application to provide cart context */}
      <ShopProvider>
        {/* Header component is always visible */}
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Conditional rendering based on currentPage state */}
        {currentPage === 'home' && (
          <ProductList
            setCurrentPage={setCurrentPage}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {currentPage === 'productDetail' && (
          <ProductDetail
            product={selectedProduct}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'cart' && (
          <Cart
            setCurrentPage={setCurrentPage}
          />
        )}
      </ShopProvider>

      {/* Footer component */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Coreline. All rights reserved.</p>
          <p className="text-sm mt-2">Designed for students, built with quality.</p>
        </div>
      </footer>
    </div>
  );
}
