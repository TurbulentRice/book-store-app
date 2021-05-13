import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import API from '../api'
import logo from '../logo.svg';

export default function Login() {
  const { login } = useContext(UserContext);
  const history = useHistory();

  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");

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
    <div className="wrapper fadeInDown">
      <div id="formContent">

        <div className="fadeIn first">
          <img src={logo} id="icon" alt="Novella" height='40'/>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            className="fadeIn second"
            name="username"
            placeholder="username"
            value={username}
            onChange={e => setUsername(e.target.value)}/>
          <input
            type="text"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>

        {errorMessage && <div>{errorMessage}</div>}
        {/* <div id="formFooter">
          <p className="underlineHover" href="#">Forgot Password?</p>
        </div> */}

      </div>
    </div>
  )
}