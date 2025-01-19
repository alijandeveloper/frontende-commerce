import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProductUploadForm from './components/ProductUploadForm';
import ProductDetails from './components/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductUploadForm />} />
        <Route path="/product/:id" element={<ProductDetails />} /> {/* Fixed route */}
      </Routes>
    </Router>
  );
};

export default App;
