import { createContext, useState } from "react";

  /**
   * User context for auth and session history
   */

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  // Token
  const [token, setToken] = useState("");
  const isLoggedIn = () => !!token;
  const login = (token) => setToken(token);
  const logout = () => setToken("");

  // Searches and things to keep handy in browser, but not on server
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const states = {token, isLoggedIn, login, logout, searchResults, setSearchResults, searchString, setSearchString}

  return (
    <UserContext.Provider value={states}>
      {children}
    </UserContext.Provider>
  );
}
