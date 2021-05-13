import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from '../components/Login';
import Home from '../components/Home';

export default function AppRouter() {
  return (
    <Router>
      <Switch>

        <ProtectedRoute exact path="/home">
          <Home />
        </ProtectedRoute>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route>
          <Redirect to="/home" />
        </Route>

      </Switch>
    </Router>
  )
}