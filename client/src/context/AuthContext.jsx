import { Loading } from '@components/base';
import { createContext, useContext, useState } from 'react';

export const INITIAL_USER_INFO = {
    "_id": "65d367864697cd06a2b51cc6",
    "fullName": "Admin",
    "username": "admin",
    "email": "bachtv150902@gmail.com",
    "password": "$2b$10$gd9Hbj2tIKQoOelVl7/c5uCM3.4WyaJFlh5faeuNpZm6OYZg0lmfC",
    "saves": [],
    "status": 1,
    "createdAt": "2024-02-19T14:36:54.871Z",
    "updatedAt": "2024-02-25T13:13:12.155Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzNjc4NjQ2OTdjZDA2YTJiNTFjYzYiLCJpYXQiOjE3MDg4NjY3OTJ9.KNkNEv6PRXFVRTMdmlLvJN9R21F0_aMC4WwJa0wSTHs",
    "address": "",
    "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg",
    "bio": "I am admin"
}

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
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    userInfo,
    setUserInfo,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
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
