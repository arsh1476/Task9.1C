import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import Signup from './Signup';
import Homepage from './Homepage';
import { auth } from './firebase';
import '../css/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ text: '', type: '' });

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  // Handle logout
  const handleSignOut = async () => {
    await signOut(auth);
    setIsAuthenticated(false);
    setPopupMessage({ text: 'Signed out successfully.', type: 'success' });
    setTimeout(() => setPopupMessage({ text: '', type: '' }), 3000);
  };

  return (
    <Router>
      <div className="App">
        {popupMessage.text && (
          <div className={`popup-message ${popupMessage.type}`}>
            {popupMessage.text}
          </div>
        )}
        <Routes>
          <Route
            path="/login"
            element={<Login setPopupMessage={setPopupMessage} />}
          />
          <Route
            path="/signup"
            element={<Signup setPopupMessage={setPopupMessage} />}
          />
          <Route
            path="/home"
            element={<Homepage isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />}
          />
          <Route
            path="/"
            element={<Homepage isAuthenticated={isAuthenticated} onSignOut={handleSignOut} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
