import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuth = () => {
  const { authState, login, logout, setUser } = useContext(AuthContext);

  return {
    authState,
    login,
    logout,
    setUser
  };
};

export default useAuth;
