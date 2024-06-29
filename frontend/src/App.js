import './App.css';
import React from 'react';
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import AppRoutes from './Routes';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Link to="/">Home</Link>}
      <AppRoutes />
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;