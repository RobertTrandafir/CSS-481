import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/drivers">Drivers</NavLink>
        <NavLink to="/races">Races</NavLink>
      </nav>
    </header>
  )
}

export default Navbar
