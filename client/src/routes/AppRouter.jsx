import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

import logo from '../images/logo.svg';
import ProtectedRoute from './ProtectedRoute';
import Login from '../components/Login';
import Bookshelf from '../components/Bookshelf';
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import BookDetails from '../components/BookDetails';

export default function AppRouter() {
  const { isLoggedIn } = useContext(UserContext)
  return (
    <Router>

      {isLoggedIn() && <Navbar logo={logo} />}

      <Switch>

        <Route path="/login">
          <Login logo={logo}/>
        </Route>

        <ProtectedRoute exact path="/bookshelf">
          <Bookshelf />
        </ProtectedRoute>

        <ProtectedRoute exact path="/search">
          <Search />
        </ProtectedRoute>

        <ProtectedRoute path="/book/:bookID">
          <BookDetails />
        </ProtectedRoute>
        
        <Redirect to="/login"/>

      </Switch>
    </Router>
  )
}