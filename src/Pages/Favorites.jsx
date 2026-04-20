import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Favorites = () => {
  const { state, dispatch } = useContext(AppContext);
  const favoriteMovies = state.movies.filter(m => m.isFavorite);

  return (
    <div style={{ padding: '20px' }}>
      <h1>⭐ My Favorites</h1>
      {favoriteMovies.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        favoriteMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
            <h3>{movie.name} ({movie.year})</h3>
            <button onClick={() => dispatch({ type: "TOGGLE_FAVORITE", payload: movie.id })}>
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites; // <--- MAKE SURE THIS IS HERE