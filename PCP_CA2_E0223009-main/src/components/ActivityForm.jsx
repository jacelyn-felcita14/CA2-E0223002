import { useState } from "react";
import { useApp } from "../context/AppContext";

const initialForm = {
  name: "",
  steps: "",
  caloriesBurned: "",
  workoutMinutes: "",
  date: "",
};

const ActivityForm = () => {
  const { addActivity } = useApp();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNameValid = /^[A-Za-z\s]{2,}$/.test(form.name.trim());
    const isStepsValid = form.steps !== "" && Number(form.steps) >= 0;
    const isCaloriesValid =
      form.caloriesBurned !== "" && Number(form.caloriesBurned) >= 0;
    const isMinutesValid =
      form.workoutMinutes !== "" && Number(form.workoutMinutes) >= 0;

    if (!isNameValid || !isStepsValid || !isCaloriesValid || !isMinutesValid) {
      setError("Enter valid values for all fields.");
      return;
    }

    addActivity({
      id: Date.now(),
      name: form.name.trim(),
      steps: Number(form.steps),
      caloriesBurned: Number(form.caloriesBurned),
      workoutMinutes: Number(form.workoutMinutes),
      goalAchieved: Number(form.steps) >= 10000,
      date: form.date || new Date().toISOString().slice(0, 10),
      favorite: false,
    });

    setError("");
    setForm(initialForm);
  };

  return (
    <form className="activity-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="steps"
        placeholder="Steps"
        value={form.steps}
        onChange={handleChange}
      />
      <input
        type="number"
        name="caloriesBurned"
        placeholder="Calories Burned"
        value={form.caloriesBurned}
        onChange={handleChange}
      />
      <input
        type="number"
        name="workoutMinutes"
        placeholder="Workout Minutes"
        value={form.workoutMinutes}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <button type="submit">Add Activity</button>
      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
};

export default ActivityForm;
