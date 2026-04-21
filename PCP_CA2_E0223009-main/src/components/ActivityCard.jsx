import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ActivityCard = ({ activity }) => {
  const { deleteActivity, toggleFavorite, toggleGoal } = useApp();

  return (
    <article className="activity-card" data-testid="activity-item">
      <h3>{activity.name}</h3>
      <p>Steps: {activity.steps}</p>
      <p>Calories: {activity.caloriesBurned}</p>
      <p>Workout Minutes: {activity.workoutMinutes}</p>
      <p>Status: {activity.goalAchieved ? "Goal Achieved" : "Goal Not Achieved"}</p>
      <p>Date: {activity.date}</p>

      <div className="card-actions">
        <button onClick={() => toggleGoal(activity.id)}>Toggle Goal</button>
        <button onClick={() => toggleFavorite(activity.id)}>
          {activity.favorite ? "Unfavorite" : "Favorite"}
        </button>
        <button onClick={() => deleteActivity(activity.id)}>Delete</button>
        <Link to={`/activities/${activity.id}`}>View Details</Link>
      </div>
    </article>
  );
};

export default ActivityCard;
