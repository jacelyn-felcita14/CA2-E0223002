import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MovieList = () => {
  const { state, dispatch } = useContext(AppContext);

  if (state.movies.length === 0) return <p>No movies in your wishlist yet.</p>;

  return (
    <div>
      <h2>All Movies</h2>
      {state.movies.map(movie => (
        <div key={movie.id} style={{ border: '1px solid #444', padding: '10px', margin: '10px', borderRadius: '8px' }}>
          <h3>{movie.name} ({movie.year}) - {movie.genre}</h3>
          <p>Status: {movie.watched ? "✅ Watched" : "⏳ Pending"}</p>
          
          <button onClick={() => dispatch({ type: "TOGGLE_WATCHED", payload: movie.id })}>
            {movie.watched ? "Mark Unwatched" : "Mark Watched"}
          </button>
          
          <button onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: movie.id })}>
            {movie.isFavorite ? "⭐ Unfavorite" : "☆ Favorite"}
          </button>

          <button onClick={() => dispatch({ type: "DELETE_MOVIE", payload: movie.id })} style={{ color: 'red', marginLeft: '10px' }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default MovieList; // <--- MAKE SURE THIS LINE IS HERE