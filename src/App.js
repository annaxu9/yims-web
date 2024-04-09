// App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home'; 
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import NavBar from './components/NavBar'; 
import Admin from './pages/Admin';
import Ref from './pages/Ref';
import ProtectedRoute from './components/ProtectedRoute';
import Test from './pages/test';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data from localStorage when the component mounts
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = async (netid) => {
    const response = await fetch(`http://127.0.0.1:5000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ netid }),
    });
    if (response.ok) {
      const userData = await response.json();
      setUser(userData);
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/');  // Navigate to the home page
    } else {
      // Handle login failure
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    // Clear user data from state and localStorage
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');  // Navigate to the login page
  };

  return (
    <div>
      <NavBar role={user ? user.role : null}/>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={user ? <Home user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route path="/schedules" element={<Schedule/>} />
        <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ref"
          element={
            <ProtectedRoute user={user} allowedRoles={['admin', 'ref']}>
              <Ref />
            </ProtectedRoute>
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
