import { createContext, useState } from "react";

  /**
   * User auth context
   */

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  
  const [token, setToken] = useState("");

  const isLoggedIn = () => !!token;
  const login = (token) => setToken(token);
  const logout = () => setToken("");

  return (
    <UserContext.Provider value={{token, isLoggedIn, login, logout}}>
      {children}
    </UserContext.Provider>
  );
}
