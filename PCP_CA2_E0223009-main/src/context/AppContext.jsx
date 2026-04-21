import { createContext, useContext, useEffect, useReducer } from "react";
import AppReducer from "../reducer/AppReducer";
import { getDataset, getToken } from "../services/api";

const STUDENT_ID = "e0223002";
const PASSWORD = "250202";
const DATA_SET = "setB";

const initialState = {
  activities: [],
  loading: true,
  error: "",
  searchText: "",
  filterText: "",
};

const toSafeNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
};

export const isValidActivity = (activity) =>
  Number(activity.steps) > 0 &&
  Number(activity.caloriesBurned) > 0 &&
  Number(activity.workoutMinutes) > 0 &&
  typeof activity.goalAchieved === "boolean";

const normalizeActivity = (activity, index) => {
  const rawGoal = activity.goalAchieved ?? activity.goalAcheived;

  return {
    id: activity.activityId ?? activity.id ?? `${Date.now()}-${index}`,
    activityId: activity.activityId ?? activity.id ?? `${Date.now()}-${index}`,
    name:
      typeof activity.name === "string" && activity.name.trim()
        ? activity.name.trim()
        : "Unknown",
    steps: toSafeNumber(activity.steps),
    caloriesBurned: toSafeNumber(activity.caloriesBurned),
    workoutMinutes: toSafeNumber(activity.workoutMinutes),
    goalAchieved: typeof rawGoal === "boolean" ? rawGoal : null,
    date:
      typeof activity.date === "string" && activity.date.trim()
        ? activity.date.trim()
        : "No date",
    favorite: Boolean(activity.favorite),
  };
};

const extractActivities = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.activities)) {
    return payload.activities;
  }

  if (payload && payload.data && Array.isArray(payload.data.activities)) {
    return payload.data.activities;
  }

  return [];
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    let active = true;

    const loadActivities = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const tokenResponse = await getToken(STUDENT_ID, PASSWORD, DATA_SET);
        const dataset = await getDataset(tokenResponse.token, tokenResponse.dataUrl);
        const normalizedActivities = extractActivities(dataset).map(normalizeActivity);

        if (active) {
          dispatch({ type: "SET_ACTIVITIES", payload: normalizedActivities });
        }
      } catch (error) {
        if (active) {
          dispatch({
            type: "SET_ERROR",
            payload: error?.message || "Failed to fetch activities",
          });
        }
      }
    };

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  const addActivity = (activity) =>
    dispatch({ type: "ADD_ACTIVITY", payload: normalizeActivity(activity, 0) });

  const deleteActivity = (id) =>
    dispatch({ type: "DELETE_ACTIVITY", payload: id });

  const toggleGoal = (id) => dispatch({ type: "TOGGLE_GOAL", payload: id });

  const toggleFavorite = (id) =>
    dispatch({ type: "TOGGLE_FAVORITE", payload: id });

  const setSearchText = (text) =>
    dispatch({ type: "SET_SEARCH_TEXT", payload: text });

  const setFilterText = (text) =>
    dispatch({ type: "SET_FILTER_TEXT", payload: text });

  return (
    <AppContext.Provider
      value={{
        activities: state.activities,
        loading: state.loading,
        error: state.error,
        searchText: state.searchText,
        filterText: state.filterText,
        addActivity,
        deleteActivity,
        toggleGoal,
        toggleFavorite,
        setSearchText,
        setFilterText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
