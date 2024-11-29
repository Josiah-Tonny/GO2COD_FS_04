import React, { useState } from 'react';
import { authService } from '../../services/authService';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.passwordReset(email);
      setMessage('Password reset link sent to your email');
    } catch (err) {
      setError('Email not found');
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
