import { createContext, useState } from "react";
import API from '../api'

  /**
   * User context for auth and session history
   */

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  // Token
  const [token, setToken] = useState("");
  const isLoggedIn = () => !!token;
  const login = (token) => setToken(token);
  const logout = async() => {
    const response = await API.logout(token)
    if (response.status) return
    setToken("")
  };
  const refreshToken = async() => {

    const response = await API.refreshToken()
    if (response.token) login(response.token)

  }
  // Searches and things to keep handy in browser, but not on server
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const states = {token, isLoggedIn, login, logout, refreshToken, searchResults, setSearchResults, searchString, setSearchString}

  return (
    <UserContext.Provider value={states}>
      {children}
    </UserContext.Provider>
  );
}
