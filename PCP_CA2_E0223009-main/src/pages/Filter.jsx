import { useMemo } from "react";
import { isValidActivity, useApp } from "../context/AppContext";
import ActivityList from "../components/ActivityList";

const Filter = () => {
  const { activities, filterText, setFilterText, loading, error } = useApp();

  const inputError = useMemo(() => {
    const trimmed = filterText.trim();

    if (trimmed === "") {
      return "Please enter steps value";
    }

    if (!/^\d+$/.test(trimmed)) {
      return "Please enter a valid numeric value";
    }

    return "";
  }, [filterText]);

  const stepThreshold = Number(filterText);

  const filteredActivities = activities
    .filter(isValidActivity)
    .filter((activity) => !inputError && activity.steps >= stepThreshold);

  return (
    <section className="page-wrap">
      <h1>Filter Activities</h1>
      <input
        data-testid="filter-input"
        className="search-input"
        type="number"
        placeholder="Enter minimum steps"
        value={filterText}
        onChange={(event) => setFilterText(event.target.value)}
      />

      {loading ? <p>Loading activities...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      {!loading && !error && inputError ? (
        <p className="error-text">{inputError}</p>
      ) : null}
      {!loading && !error && !inputError ? (
        <ActivityList activities={filteredActivities} />
      ) : null}
    </section>
  );
};

export default Filter;
