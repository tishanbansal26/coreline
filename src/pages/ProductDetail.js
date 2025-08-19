import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import context
import Modal from '../components/Modal'; // Import Modal component

// Product Detail Page Component
const ProductDetail = ({ product, setCurrentPage }) => {
  const { addToCart } = useContext(ShopContext); // Access addToCart from context
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || ''); // Initialize with first size or empty
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || ''); // Initialize with first color or empty
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // If product is not provided (e.g., direct navigation to detail page without selecting)
  if (!product) {
    return (
      <div className="container mx-auto p-6 text-center text-red-600">
        <p className="text-2xl mb-4">Product not found! Please select a product from the shop.</p>
        <button
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Pass selected size, color, and quantity along with product details
    addToCart({ ...product, selectedSize, selectedColor, quantity });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="container mx-auto p-6">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Shop
      </button>

      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-lg shadow-md object-cover"
            // Fallback for broken images
            onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x600/CCCCCC/333333?text=${product.name.replace(/\s/g, '+')}`; }}
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h2>
          <p className="text-2xl font-semibold text-gray-800 mb-6">₹{product.price}</p>
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

          <div className="mb-6">
            <p className="font-semibold text-gray-800 mb-2">Category: <span className="font-normal text-gray-600">{product.category}</span></p>
            <p className="font-semibold text-gray-800 mb-2">Design Type: <span className="font-normal text-gray-600">{product.designType}</span></p>
          </div>

          <div className="mb-6">
            <label htmlFor="size-select" className="block text-gray-800 font-semibold mb-2">Select Size:</label>
            <select
              id="size-select"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="color-select" className="block text-gray-800 font-semibold mb-2">Select Color:</label>
            <select
              id="color-select"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className="mb-8 flex items-center space-x-4">
            <label htmlFor="quantity-input" className="text-gray-800 font-semibold">Quantity:</label>
            <input
              type="number"
              id="quantity-input"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 p-3 border border-gray-300 rounded-lg text-center focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white text-xl font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal for "Item Added" confirmation */}
      <Modal show={showModal} onClose={closeModal} title="Item Added to Cart!">
        <p className="text-center">"{product.name}" in {selectedColor}, size {selectedSize} (x{quantity}) has been added to your cart.</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => { closeModal(); setCurrentPage('cart'); }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            View Cart
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default ProductDetail;
