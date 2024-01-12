import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipeDetails from '../../components/RecipeDetails/RecipeDetails.js';
import BoutonProposerAccompagnements from '../../components/BoutonProposerAccompagnements/BoutonProposerAccompagnements.js'; 
import { proposeAccompagnements } from '../../apis/accompagnements'; // Assurez-vous que le chemin est correct

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(/* ... votre état de recette ici */);

  // Fonction pour proposer des accompagnements
  const handleProposeAccompagnements = async () => {
    try {
      // Appel de la fonction API proposeAccompagnements
      const result = await proposeAccompagnements(recipeId);
      console.log('Accompagnements proposés avec succès:', result);

      // Mettez à jour l'état de la recette si nécessaire
      // ...

    } catch (error) {
      console.error('Erreur lors de la proposition des accompagnements :', error);
      // Gérez les erreurs ici
    }
  };

  return (
    <div>
      <h2>Détails de la recette</h2>
      <RecipeDetails recipe={recipe} />

      {/* Ajoutez le bouton pour proposer des accompagnements */}
      <BoutonProposerAccompagnements onClick={handleProposeAccompagnements} />
    </div>
  );
};

export default RecipeDetailsPage;
