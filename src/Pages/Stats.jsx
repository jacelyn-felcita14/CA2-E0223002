import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Stats = () => {
  const { state } = useContext(AppContext);

  // Requirements: Use .filter() and .reduce() to compute
  const totalMovies = state.movies.length;
  const watchedMovies = state.movies.filter(m => m.watched).length;
  
  const genres = state.movies.reduce((acc, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: '20px' }}>
      <h1>Analysis Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h3>Total Movies</h3>
          <p style={{ fontSize: '24px' }}>{totalMovies}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '15px' }}>
          <h3>Watched</h3>
          <p style={{ fontSize: '24px' }}>{watchedMovies}</p>
        </div>
      </div>

      <h3>Movies Grouped by Genre:</h3>
      <ul>
        {Object.entries(genres).map(([genre, count]) => (
          <li key={genre}>{genre}: {count}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stats; // <--- THIS LINE WAS MISSING