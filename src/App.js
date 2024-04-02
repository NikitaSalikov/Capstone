import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Locations from './sidebarComponents/Locations';
import LocationDetails from './sidebarComponents/LocationDetails'; // Import the component
import DashboardLayout from './components/DashboardLayout';
import Settings from './sidebarComponents/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/locations" element={<DashboardLayout><Locations /></DashboardLayout>} />
        <Route path="/locations/:name" element={<DashboardLayout><LocationDetails /></DashboardLayout>} /> {/* Add this line */}
        <Route path="/Settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;




