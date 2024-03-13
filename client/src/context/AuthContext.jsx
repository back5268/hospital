import { getInfoApi } from '@api/auth';
import { Loading } from '@components/base';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER_INFO = {}

const INITIAL_STATE = {
  userInfo: INITIAL_USER_INFO,
  isLoading: false,
  isAuthenticated: true,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getInfoApi();
      setIsLoading(false)
      if (response) {
        setUserInfo(response);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        navigate('/auth/signin')
      }
    } catch (error) {
      navigate('/auth/signin')
      return false;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) checkAuth();
    else {
      setIsLoading(false)
      navigate('/auth/signin')
    }
  }, []);

  const value = {
    userInfo,
    setUserInfo,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="fixed inset-x-0 inset-y-0 bg-black z-50 opacity-30 flex justify-center items-center">
          <Loading size={8} border={4} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
