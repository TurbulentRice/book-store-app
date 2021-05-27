import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

// Main search bar, persistent across all routes

export default function Navbar({ logo }) {
  let history = useHistory();
  const goToSearch = () => {
    history.push('/search')
  }
  const goToBookshelf = () => {
    history.push('/bookshelf')
  }

  const { logout } = useContext(UserContext)
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="navbar-brand" href="/">
        <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
        Novella
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <button className="nav-link btn btn-outline-link my-2 my-sm-0" onClick={goToBookshelf}>My Bookshelf</button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-outline-link my-2 my-sm-0" onClick={goToSearch}>Search</button>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-outline-link my-2 my-sm-0" onClick={logout}>Logout</button>
        </li>
      </ul>
    </nav>
  )
}