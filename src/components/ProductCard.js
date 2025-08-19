import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import context
import Modal from './Modal'; // Import Modal component

// Product Card Component
const ProductCard = ({ product, setCurrentPage, setSelectedProduct }) => {
  const { addToCart } = useContext(ShopContext); // Access addToCart from context
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => {
          setSelectedProduct(product);
          setCurrentPage('productDetail');
        }}
        // Fallback for broken images
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x400/CCCCCC/333333?text=${product.name.replace(/\s/g, '+')}`; }}
      />
      <div className="p-5 flex flex-col flex-grow">
        <h3
          className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => {
            setSelectedProduct(product);
            setCurrentPage('productDetail');
          }}
        >
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 flex-grow">{product.description.substring(0, 80)}...</p>
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal for "Item Added" confirmation */}
      <Modal show={showModal} onClose={closeModal} title="Item Added to Cart!">
        <p className="text-center">"{product.name}" has been added to your cart.</p>
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
    </div>
  );
};

export default ProductCard;
