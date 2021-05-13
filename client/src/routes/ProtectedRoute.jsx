import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';

export default function ProtectedRoute ({ children }) {
  const { isLoggedIn } = useContext(UserContext);
  return (
    isLoggedIn()
      ? <Route>{children}</Route>
      : <Redirect to="/login"/>
  )
}