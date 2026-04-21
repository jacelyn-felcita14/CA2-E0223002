import { Link, useParams } from "react-router-dom";
import { isValidActivity, useApp } from "../context/AppContext";

const ActivityDetails = () => {
  const { id } = useParams();
  const { activities, loading } = useApp();

  if (loading) {
    return <p className="page-wrap">Loading activity...</p>;
  }

  const activity = activities.find(
    (item) => String(item.id) === String(id) && isValidActivity(item),
  );

  if (!activity) {
    return (
      <section className="page-wrap">
        <h2>Activity not found</h2>
        <Link to="/activities">Back to activities</Link>
      </section>
    );
  }

  const efficiency =
    Number(activity.workoutMinutes) > 0
      ? Number(activity.caloriesBurned) / Number(activity.workoutMinutes)
      : 0;

  return (
    <section className="page-wrap">
      <h2>{activity.name}</h2>
      <p>Activity ID: {activity.activityId}</p>
      <p>Steps: {activity.steps}</p>
      <p>Calories Burned: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Goal Status: {activity.goalAchieved ? "Achieved" : "Not Achieved"}</p>
      <p>Date: {activity.date}</p>
      <p>Efficiency Score: {efficiency.toFixed(2)}</p>
      <Link to="/activities">Back to activities</Link>
    </section>
  );
};

export default ActivityDetails;
