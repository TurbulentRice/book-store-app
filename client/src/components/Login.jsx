import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import API from '../api'

export default function Login({ logo }) {
  const { login } = useContext(UserContext);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    try {
      const response = await API.login(username, password)
      // Thought throwing/catching manually would stop 401 error in console, it didn't, but this works anyway
      if (response.status) throw response;
      setIsLoading(false);
      setErrorMessage("");
      login(response.token);
      setUsername("");
      setPassword("");
      history.push("/bookshelf")
    } catch (error) {
      // Fail
      setIsLoading(false);
      error.status === 401 
        ? setErrorMessage(error.data.message)
        : setErrorMessage("Something went wrong... Please try again.")
    }
  }

  return (
    <div className="d-flex justify-content-center fadeInDown">
    <div className="col-auto text-center fadeInDown">
        <form className="form-signin" onSubmit={handleSubmit}>

          <div className="m-4">
            <img src={logo} id="icon" alt="Novella" height='80'/>
          </div>

          <h1 className="h3 mb-3 font-weight-normal">Welcome to Novella!</h1>

          <label htmlFor="inputUsername" className="sr-only">Username</label>
          <input
            type="username"
            id="inputUsername"
            className="form-control mb-2"
            placeholder="Username"
            required={true}
            autoFocus=""
            value={username}
            onChange={e => setUsername(e.target.value)}/>

          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control mb-2"
            placeholder="Password"
            required={true}
            value={password}
            onChange={e => setPassword(e.target.value)} />

          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

          <p className="mt-5 mb-3 text-muted">app by Sean Russell 2021</p>
        </form>

        {errorMessage && <div>{errorMessage}</div>}
        {isLoading && <div>Loading...</div>}
    </div>
    </div>
  )
}