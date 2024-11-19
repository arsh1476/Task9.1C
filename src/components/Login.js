import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setPopupMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user); // Debug line
      setPopupMessage({ text: 'Login successful!', type: 'success' });
      navigate('/home'); // Navigate after login is confirmed
      setTimeout(() => setPopupMessage({ text: '', type: '' }), 3000); // Hide popup after 3 seconds
    } catch (error) {
      console.error('Login failed:', error.message); // Detailed error message
      setPopupMessage({ text: 'Login failed. Please check your credentials.', type: 'error' });
      setTimeout(() => setPopupMessage({ text: '', type: '' }), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
        <button onClick={handleLogin}>Login</button>
        <p className="signup-link">
          Create new account? <span onClick={() => navigate('/signup')}>Click here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
