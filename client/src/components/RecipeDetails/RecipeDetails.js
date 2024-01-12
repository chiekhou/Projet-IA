import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.scss';

const RecipeDetails = ({ recipe, checkExistingRating, updateRating, createRating }) => {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  const handleRatingChange = (event) => {
    setUserRating(parseInt(event.target.value, 10));
  };

  const handleCommentChange = (event) => {
    setUserComment(event.target.value);
  };

  const handleAddRating = async () => {
    
    try {
        if (!recipe || !recipe.id) {
          console.error('La recette est mal définie ou ne possède pas de propriété "id".');
          return;
        }
      const existingRating = await checkExistingRating(recipe.id, /* userId pour l'ID de l'utilisateur */);

      if (existingRating) {
        await updateRating(existingRating.id, { rating: userRating, comment: userComment });
      } else {
        await createRating({ recipeId: recipe.id, rating: userRating, comment: userComment });
      }

      setUserRating(0);
      setUserComment('');
    }catch (error) {
      console.error('Erreur lors de l\'ajout de la note :', error);
      // Gérez les erreurs d'ajout de la note ici
    }
  };

  return (
    <div>
      {/* ... autres détails de la recette */}
      <div>
        <label htmlFor="rating">Notes:</label>
        <select id="rating" value={userRating} onChange={handleRatingChange}>
          <option value={0}>-- Selectionnez --</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <br />
        <label htmlFor="comment">Commentaire:</label>
        <textarea id="comment" value={userComment} onChange={handleCommentChange} />
        <br />
        <button onClick={handleAddRating}>Ajoutée une note</button>
      </div>

      {/* Afficher les évaluations existantes */}
      <h3>Notation et Avis</h3>
      {recipe && recipe.ratings && (
        <ul>
        {recipe.ratings.map((rating) => (
            <li key={rating.id}>
            <p>Notes: {rating.rating}</p>
            <p>Commentaire: {rating.comment}</p>
            </li>
        ))}
        </ul>
     )}
    </div>
  );
};

export default RecipeDetails;
