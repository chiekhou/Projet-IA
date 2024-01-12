import React, { useState, useEffect } from 'react';
import { proposeAccompagnements } from '../../apis/accompagnements'; 

const BoutonProposerAccompagnements = ({ recipeId }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      // Appel de l'API pour proposer des accompagnements
      await proposeAccompagnements(recipeId);
      console.log('Accompagnements proposés avec succès!');
    } catch (error) {
      console.error('Erreur lors de la proposition d\'accompagnements :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? 'En cours...' : 'Proposer des accompagnements'}
    </button>
  );
};

export default BoutonProposerAccompagnements;
