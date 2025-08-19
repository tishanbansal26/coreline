import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import { mockProducts } from '../data/mockProducts'; // Import mock data

// Product Listing Page Component
const ProductList = ({ setCurrentPage, setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDesignType, setFilterDesignType] = useState('All');
  const [sortBy, setSortBy] = useState('price-asc'); // 'price-asc', 'price-desc', 'name-asc'

  useEffect(() => {
    // In a real app, this would be a fetch call to your backend API:
    // fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
    setProducts(mockProducts); // Using mock data for now
  }, []);

  // Helper to get unique categories for filter dropdown
  const getUniqueCategories = () => {
    const categories = new Set(mockProducts.map(p => p.category));
    return ['All', ...Array.from(categories)];
  };

  // Helper to get unique design types for filter dropdown
  const getUniqueDesignTypes = () => {
    const designTypes = new Set(mockProducts.map(p => p.designType));
    return ['All', ...Array.from(designTypes)];
  };

  // Apply filters and sorting to the products
  const filteredProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      filterCategory === 'All' || product.category === filterCategory
    )
    .filter(product =>
      filterDesignType === 'All' || product.designType === filterDesignType
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
      } else if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  return (
    <main className="container mx-auto p-6">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Latest Collection</h2>

      {/* Search, Filter, Sort Controls */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 col-span-full md:col-span-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {getUniqueCategories().map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={filterDesignType}
          onChange={(e) => setFilterDesignType(e.target.value)}
        >
          {getUniqueDesignTypes().map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A-Z</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              setCurrentPage={setCurrentPage}
              setSelectedProduct={setSelectedProduct}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-xl">No products found matching your criteria.</p>
        )}
      </div>
    </main>
  );
};

export default ProductList;
