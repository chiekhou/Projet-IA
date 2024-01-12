import { useEffect , useState } from 'react';
import {useLocation } from "react-router-dom";
import {getRecipe } from "../../../../apis"
import {Accordion} from 'react-bootstrap';
import styles from "../RecipeDetails/RecipeDetails.module.scss"

const RecipeDetails = () => {
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [recipe, setRecipe] = useState({});
    const [recommendations, setRecommendations] = useState(null);
  
    useEffect(() => {
        
        const fetchRecipeDetails = async () => {
            try {
              const detailedRecipe = await getRecipe(id);
              setRecipe(detailedRecipe);

              // Fetch recommendations only if recipe details are available
      if (detailedRecipe) {
        fetchRecommendations(detailedRecipe.recipeName);
      }
            } catch (error) {
              console.error('Erreur lors de la récupération des détails de la recette :', error);
            }
          };
      
      // Fetch recommendations from chatgpt
    const fetchRecommendations = async (recipeName) => {
        try {
          const response = await fetch('/api/chatgpt/recommandations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({recipeName}),
          });
  
          if (response.ok) {
            const data = await response.json();

            if(data.ideas.length > 0) {
                
                const parseObject = data.ideas.map(jsonRecipe => JSON.parse(jsonRecipe))
                console.log(parseObject)
                const validRecommendations = parseObject.filter(recommendation => recommendation !== null);
                console.log(validRecommendations)
            setRecommendations(validRecommendations);
            }
          } else {
            console.error('Error fetching recommendations:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error fetching recommendations:', error.message);
        }
      };
  
     // Fetch recommendations only if recipe details are available
      fetchRecipeDetails();
    }, [id]);
      
  
    return(
        <>  
      <div className="flex-fill container d-flex flex-column p-20">
    <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 `}
      >
   <h3 className="mb-10">{recipe.recipeName}</h3>
<Accordion  defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Détails de la recette</Accordion.Header>
            <Accordion.Body>
          
            {recipe.description}<br/>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Difficulté</Accordion.Header>
            <Accordion.Body>
          
           La difficulté pour faire cette recette est de {recipe.difficulte} .
            </Accordion.Body>
          </Accordion.Item>
      </Accordion>
           
        </div>
      </div>
      <div className={`${styles.test}`}>
        
        {recommendations && recommendations[0].recommandations.map((recommendation, index) => (
          
     <div className={`${styles.contentCardRecommandation}`}>
      <div className={`${styles.grid}`}>
     <div key={index} className={`card ${styles.recipeRecommandation}`}>
     <div className="recipe-details">
       <h3>{recommendation.recipeName}</h3>
       <p>{recommendation.description}</p>
     </div>
     <img src={recommendation.image} alt="recipe" className="recipe-image" />
   </div>
   </div>
   </div>
        ))}
    
    </div>

      <div>
      
      </div>
      </>
    )
};

    export default RecipeDetails ;