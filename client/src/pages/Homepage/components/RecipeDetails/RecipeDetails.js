import { useEffect , useState } from 'react';
import {useLocation } from "react-router-dom";
import {getRecipe } from "../../../../apis"
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
        <div  className ={`card ${styles.recipe}`}>
        {/* <div className={styles.imageContainer}>
          <img src={recipe.image} alt="recipe" />
        </div> */}
        <div
          className={`d-flex flex-column justify-content-center align-items-center`}
        >
          <h3 className="mb-10">{recipe.recipeName}</h3>
          
          <p className="mb-10">{recipe.description}</p>
         
          <i 
            className={`${styles.recipeName} fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
          ></i>
         
        </div>
      </div>

      <div>
    
      
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
      
      </div></div>
      </>
    )
};

    export default RecipeDetails ;