import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = ({ setPopupMessage }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPopupMessage({ text: "Passwords don't match", type: 'error' });
      setTimeout(() => setPopupMessage({ text: '', type: '' }), 3000);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signup successful:', userCredential.user); // Debug line
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: `${name} ${lastName}`,
        email: userCredential.user.email,
        createdAt: new Date(),
      });
      setPopupMessage({ text: 'Account created successfully!', type: 'success' });
      navigate('/home'); // Navigate after signup is confirmed
      setTimeout(() => setPopupMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setPopupMessage({ text: 'Account already exists. Please login.', type: 'error' });
      } else {
        setPopupMessage({ text: 'Signup failed. Please try again.', type: 'error' });
      }
      setTimeout(() => setPopupMessage({ text: '', type: '' }), 3000);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Create a DEV@Deakin Account</h1>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
        <button onClick={handleRegister}>Create</button>
      </div>
    </div>
  );
};

export default Signup;
