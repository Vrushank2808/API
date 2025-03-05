import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">API Apps</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Weather</Link>
          <Link to="/dog" className="nav-link">Dogs</Link>
          <Link to="/movie" className="nav-link">Movies</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;