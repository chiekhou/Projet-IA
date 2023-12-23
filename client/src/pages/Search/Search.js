import React, { useState } from 'react';
import styles from "./SearchComponent.modules.scss";

const SearchComponent = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const handleSearch = async () => {
    try {
      setLoading(true)
      setError(''); 
      
      const responseRecipes = await fetch('/api/recipes/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeName }),
      });

      if (responseRecipes.ok) {
        const data = await responseRecipes.json();

        if(data.ideas.length > 0) {
          console.log(data.ideas)
          setIdeas(data.ideas);
        } else {
          setIdeas(["Aucune recette avec ce nom"]);
        }
      
      } else {
        console.error('Erreur lors de la recherche :', responseRecipes.statusText);
      }

    } catch (error) {
      setError(`Erreur lors de la recherche : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };



  return (

    <div className="flex-fill container d-flex flex-column p-20">
    <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
         <h1 className="my-20">
        Rechercher une recette
        
      </h1>
        
    <div
      className={`d-flex flex-row justify-content-center align-items-center my-30 ${styles.searchBar}`}
    >
      <i className="fa-solid fa-magnifying-glass mr-15"></i>
      <input className="flex-fill"
        type="text"
        placeholder="Rechercher"
       value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
       
      <button onClick={handleSearch}  disabled={loading} className="fa-solid  mr-15">
       {loading ? 'Recherche en cours ...' : 'Search'} 
        </button>
      </div>
      {setError && <p className={styles.errorText}>{setError}</p>}
      <ul>
        {ideas.map((idea, index) => (
          <li key={index}>{idea}</li>
        ))}
      </ul>
  
    </div>
    </div>
  );
};

export default SearchComponent;
