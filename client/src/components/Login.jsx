import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import API from '../api'
import logo from '../logo.svg';

export default function Login() {
  const { login } = useContext(UserContext);
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await API.login(username, password)
      // Success - set state, clear input, redirect
      setIsLoading(false);
      setErrorMessage("");
      login(response.data.token);
      setUsername("");
      setPassword("");
      history.push("/home")
    } catch (error) {
      // Fail
      console.log(error);
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect username or password")
      } else {
        setErrorMessage("Something went wrong...")
      }
    }
  }

  return (
    <div className="row justify-content-center fadeInDown">
    <div className="col-4 text-center fadeInDown">
        <form className="form-signin" onSubmit={handleSubmit}>

          <div className="m-4">
            <img src={logo} id="icon" alt="Novella" height='80'/>
          </div>

          <h1 className="h3 mb-3 font-weight-normal">Welcome!</h1>

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
          <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
        </form>

        {errorMessage && <div>{errorMessage}</div>}
        {isLoading && <div>Loading...</div>}
    </div>
    </div>
  )
}