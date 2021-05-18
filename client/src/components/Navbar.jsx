// Main search bar, persistent across all routes

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={props.logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
        Novella
      </a>
    </nav>
  )
}