import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await authService.verifyEmail(token);
        setMessage('Email verified successfully');
      } catch (err) {
        setMessage('Verification failed');
      }
    };
    verifyEmail();
  }, [token]);

  return <div>{message}</div>;
};

export default EmailVerification;
