import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
        <button onClick={handleLogin}>Login</button>
        <button onClick={() => navigate('/signup')}>Sign up</button>
      </div>
    </div>
  );
};

export default Login;
