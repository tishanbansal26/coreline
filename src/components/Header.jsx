import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContextDefinition.js'; // Import context

// Header Component with navigation and cart icon
const Header = ({ currentPage, setCurrentPage }) => {
  const { cart } = useContext(ShopContext); // Access cart from context
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold font-inter cursor-pointer" onClick={() => setCurrentPage('home')}>
          Coreline
        </h1>
        <nav className="flex items-center space-x-6">
          <button
            className={`text-lg font-medium hover:text-blue-300 transition-colors ${currentPage === 'home' ? 'text-blue-400' : ''}`}
            onClick={() => setCurrentPage('home')}
          >
            Shop
          </button>
          <button
            className={`text-lg font-medium hover:text-blue-300 transition-colors ${currentPage === 'cart' ? 'text-blue-400' : ''}`}
            onClick={() => setCurrentPage('cart')}
          >
            <div className="relative">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 111-4 2 2 0 011 4z"></path>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
