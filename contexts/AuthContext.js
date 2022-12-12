import React , { useContext } from 'react';
import { auth } from '../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth'

const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const value = {
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children}
    </AuthContext.Provider>
  )
}