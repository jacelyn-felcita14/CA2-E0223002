import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const AddMovieForm = () => {
  const { dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: '', year: '', genre: 'Action' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameRegex = /^[A-Za-z\s]+$/;
    const yearRegex = /^\d{4}$/;

    if (!nameRegex.test(formData.name) || !yearRegex.test(formData.year)) {
      alert("Invalid Input! Name should be letters only and Year should be 4 digits.");
      return;
    }

    dispatch({ 
      type: "ADD_MOVIE", 
      payload: { ...formData, id: Date.now(), watched: false, isFavorite: false } 
    });
    setFormData({ name: '', year: '', genre: 'Action' }); // Clear form
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px' }}>
      <input type="text" placeholder="Movie Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
      <input type="text" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} />
      <select value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})}>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Comedy">Comedy</option>
      </select>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm; // <--- MAKE SURE THIS LINE IS HERE