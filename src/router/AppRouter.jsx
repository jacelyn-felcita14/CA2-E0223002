import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../Pages/Home';
import Favorites from '../Pages/Favorites';
import Stats from '../Pages/Stats';

const AppRouter = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/stats">Stats</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  </Router>
);

export default AppRouter;