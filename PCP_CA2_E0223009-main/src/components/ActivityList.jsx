import ActivityCard from "./ActivityCard";

const ActivityList = ({ activities }) => {
  if (!activities.length) {
    return <p className="empty-state">No activities found.</p>;
  }

  return (
    <section className="activity-list">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </section>
  );
};

export default ActivityList;
