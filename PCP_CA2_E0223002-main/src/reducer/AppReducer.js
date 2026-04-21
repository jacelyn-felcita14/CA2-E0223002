const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "SET_ACTIVITIES":
      return {
        ...state,
        loading: false,
        error: "",
        activities: Array.isArray(action.payload) ? action.payload : [],
      };

    case "ADD_ACTIVITY":
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };

    case "DELETE_ACTIVITY":
      return {
        ...state,
        activities: state.activities.filter(
          (activity) => String(activity.id) !== String(action.payload),
        ),
      };

    case "TOGGLE_GOAL":
      return {
        ...state,
        activities: state.activities.map((activity) =>
          String(activity.id) === String(action.payload)
            ? { ...activity, goalAchieved: !Boolean(activity.goalAchieved) }
            : activity,
        ),
      };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        activities: state.activities.map((activity) =>
          String(activity.id) === String(action.payload)
            ? { ...activity, favorite: !Boolean(activity.favorite) }
            : activity,
        ),
      };

    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };

    case "SET_FILTER_TEXT":
      return {
        ...state,
        filterText: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
