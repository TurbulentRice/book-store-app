import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

import Login from '../components/Login';
import BookShelf from '../components/BookShelf';
import Search from '../components/Search';
import Navbar from '../components/Navbar';
import BookDetails from '../components/BookDetails';

import logo from '../images/logo.svg';

export default function AppRouter() {
  return (
    <Router>
      
      <ProtectedRoute path="/">
          <Navbar logo={logo} />
      </ProtectedRoute>

      <Switch>

        <Route exact path="/login">
          <Login logo={logo}/>
        </Route>

        <ProtectedRoute exact path="/bookshelf">
          <BookShelf />
        </ProtectedRoute>

        <ProtectedRoute exact path="/search">
          <Search />
        </ProtectedRoute>

        <Route path="/book/:bookID">
          <BookDetails />
        </Route>

      </Switch>
    </Router>
  )
}