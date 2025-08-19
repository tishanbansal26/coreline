import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx'; // Import context

// Cart Page Component
const Cart = ({ setCurrentPage }) => {
  const { cart, updateQuantity, removeFromCart } = useContext(ShopContext); // Access cart functions from context

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <main className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        // Display message if cart is empty
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty. Start shopping for some awesome Coreline tees!</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Go to Shop
          </button>
        </div>
      ) : (
        // Display cart items and total if cart is not empty
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            {cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg mr-6 shadow-sm"
                  // Fallback for broken images
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/CCCCCC/333333?text=${item.name.replace(/\s/g, '+')}`; }}
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">Color: {item.selectedColor}, Size: {item.selectedSize}</p>
                  <p className="text-lg font-medium text-gray-800">₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Quantity adjustment buttons */}
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                    className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                  {/* Remove item button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    className="text-red-600 hover:text-red-800 transition-colors ml-4"
                    aria-label="Remove item"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart total and checkout button */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200 flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900">Total: ₹{calculateTotal()}</span>
            <button
              className="bg-green-600 text-white text-xl font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
