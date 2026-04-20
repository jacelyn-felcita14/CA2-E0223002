export const initialState = {
  movies: [],
  loading: true,
  error: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload, loading: false };
      
    case "ADD_MOVIE":
      return { ...state, movies: [action.payload, ...state.movies] };
      
    case "DELETE_MOVIE":
      return { ...state, movies: state.movies.filter(m => m.id !== action.payload) };
      
    case "TOGGLE_WATCHED":
      return {
        ...state,
        movies: state.movies.map(m => 
          m.id === action.payload ? { ...m, watched: !m.watched } : m
        )
      };
      
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        movies: state.movies.map(m => 
          m.id === action.payload ? { ...m, isFavorite: !m.isFavorite } : m
        )
      };
      
    default:
      return state;
  }
};