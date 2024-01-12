import React, { useState } from 'react';
import {Accordion} from 'react-bootstrap';
import styles from "./SearchComponent.modules.scss";

const SearchComponent = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ideas, setIdeas] = useState(null);
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

          const parseObject = data.ideas.map(jsonRecipe => JSON.parse(jsonRecipe))
          console.log(parseObject)
          const validRecommendations = parseObject.filter(recettes => recettes  !== null);
          console.log(validRecommendations)
          setIdeas(validRecommendations);
        } else {
          setIdeas([{ recettes: [] }]);
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

    <>
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
      {error && <p className={styles.errorText}>{error}</p>}
      <Accordion  defaultActiveKey="0">
        {ideas && ideas[0].recettes.map((recette, index) => (
          <Accordion.Item key={index} eventKey="0">
            <Accordion.Header><h2>{recette.nom}</h2></Accordion.Header>
            <Accordion.Body>
          
            {recette.description}<br/>

            Voici les ingrédients qu'il faut :<br/>{recette.ingredients}
            </Accordion.Body>
          </Accordion.Item>
           
        ))}
      </Accordion>
  
    </div>
    </div>

</>

    
  );
};

export default SearchComponent;
