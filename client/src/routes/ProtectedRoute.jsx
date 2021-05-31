import { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function ProtectedRoute ({ children, ...props }) {
  const { isLoggedIn, refreshToken } = useContext(UserContext);
  const hasToken = isLoggedIn()
  const [isRefreshing, setIsRefreshing] = useState(!hasToken);

  useEffect(() => {
    if (isRefreshing) refreshToken().then(() => setIsRefreshing(false)).catch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshing]);

  if (isRefreshing) return <></>;

  return (
    hasToken
      ? <Route {...props}>{children}</Route>
      : <Redirect to="/login"/>
  )
}