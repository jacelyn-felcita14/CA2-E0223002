import { useEffect, useContext } from 'react';
import { AppContext } from './context/AppContext';
import AppRouter from './router/AppRouter';

function App() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    // We will use dummy data first to make sure the UI works
    const dummyData = [
      { id: 1, name: "Inception", year: "2010", genre: "Sci-Fi", watched: false, isFavorite: false },
      { id: 2, name: "The Matrix", year: "1999", genre: "Action", watched: true, isFavorite: true }
    ];
    
    dispatch({ type: "SET_MOVIES", payload: dummyData });
  }, [dispatch]);

  return <AppRouter />;
}

export default App;