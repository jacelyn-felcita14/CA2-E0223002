import React from 'react';
import AddMovieForm from '../components/AddMovieform';
import MovieList from '../components/MovieList';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎬 Movie Wishlist Manager</h1>
      <AddMovieForm />
      <hr />
      <MovieList />
    </div>
  );
};

export default Home;