import { useEffect } from "react";
import { isValidActivity, useApp } from "../context/AppContext";

const Stats = () => {
  const { activities } = useApp();

  const validActivities = activities.filter(isValidActivity);

  const totalActivities = validActivities.length;
  const goalAchievedCount = validActivities.filter(
    (activity) => activity.goalAchieved === true,
  ).length;
  const goalNotAchievedCount = validActivities.filter(
    (activity) => activity.goalAchieved !== true,
  ).length;

  const totalCalories = validActivities.reduce(
    (sum, activity) => sum + Number(activity.caloriesBurned || 0),
    0,
  );

  useEffect(() => {
    window.appState = {
      totalActivities,
      goalAchievedCount,
      goalNotAchievedCount,
      totalActivites: totalActivities,
      goalAcheivedCount: goalAchievedCount,
      goalNOtAcheivedCount: goalNotAchievedCount,
      totalCalories,
    };
  }, [totalActivities, goalAchievedCount, goalNotAchievedCount, totalCalories]);

  return (
    <section className="page-wrap">
      <h1>Activity Stats</h1>
      <p data-testid="total-activities">{totalActivities}</p>
      <p data-testid="goal-achieved">{goalAchievedCount}</p>
      <p data-testid="goal-not-achieved">{goalNotAchievedCount}</p>

      <p>Total Calories Burned: {totalCalories}</p>
    </section>
  );
};

export default Stats;
