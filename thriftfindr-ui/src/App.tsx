import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Layout from './Layout'; 
import HomePage from './HomePage';
import StoreListingPage from './StoreListingPage'; 
import StoreDetailPage from './StoreDetailPage';
import ARTryOnPage from './ARTryOnPage'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="stores" element={<StoreListingPage />} />
          <Route path="stores/:storeId" element={<StoreDetailPage />} />
          <Route path="try-on-ar" element={<ARTryOnPage />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
