import { NavLink } from 'react-router-dom';
import routes from 'routes';

const Navbar = () => {
  const { home, movies } = routes;
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink exact to={home}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={movies}>Movies</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
