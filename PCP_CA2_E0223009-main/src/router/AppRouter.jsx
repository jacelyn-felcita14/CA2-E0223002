import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Activities from "../pages/Activities";
import ActivityDetails from "../pages/ActivityDetails";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
      <main className="app-shell">
        <Routes>
          <Route caseSensitive path="/" element={<Activities />} />
          <Route caseSensitive path="/activities" element={<Activities />} />
          <Route
            caseSensitive
            path="/activities/:id"
            element={<ActivityDetails />}
          />
          <Route caseSensitive path="/filter" element={<Filter />} />
          <Route caseSensitive path="/stats" element={<Stats />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>
    </Router>
  );
};

export default AppRouter;
