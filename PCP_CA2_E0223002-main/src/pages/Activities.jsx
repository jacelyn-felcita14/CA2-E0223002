import { isValidActivity, useApp } from "../context/AppContext";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

const Activities = () => {
  const { activities, loading, error, searchText, setSearchText } = useApp();

  const visibleActivities = activities
    .filter(isValidActivity)
    .filter((activity) =>
      activity.name.toLowerCase().includes(searchText.toLowerCase()),
    );

  return (
    <section className="page-wrap">
      <h1>Activity Dashboard</h1>
      <ActivityForm />

      <input
        className="search-input"
        type="text"
        placeholder="Search by name"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      {loading ? <p>Loading activities...</p> : null}
      {error ? <p className="error-text">{error}</p> : null}
      {!loading && !error ? <ActivityList activities={visibleActivities} /> : null}
    </section>
  );
};

export default Activities;
