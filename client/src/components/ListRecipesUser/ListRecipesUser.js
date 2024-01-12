import { useState, useEffect } from 'react';
import { listDisplayState , recipesState} from "../../state"
import { useSetRecoilState} from 'recoil'
import { updateRecipe , getRecipesLikeUser,getRecipe } from "../../apis"
import styles from "../ListRecipesUser/ListRecipesUser.module.scss"

function ListRecipesUser(){
    const setListDisplay = useSetRecoilState(listDisplayState)
    const setRecipes = useSetRecoilState(recipesState)
    const [remove , setRemove] = useState(false)
    const [likedRecipes, setLikedRecipes] = useState([]);
    const [detailedRecipes, setDetailedRecipes] = useState([]);

    useEffect(() => {
 
      const fetchLikedRecipes = async () => {
        try {
          const response = await getRecipesLikeUser();
  
          setLikedRecipes(response);
        } catch (error) {
          console.error('Erreur lors de la récupération des recettes aimées :', error);
        }
      };
      fetchLikedRecipes();
    }, []);


    useEffect(() => {
     
      const fetchDetailedRecipes = async () => {
        try {
          const recipePromises = likedRecipes.map(async (likedRecipe) => {
            const detailedRecipe = await getRecipe(likedRecipe.recipeId);
            return detailedRecipe;
          });
          const detailedRecipesData = await Promise.all(recipePromises);
  
          setDetailedRecipes(detailedRecipesData);
        } catch (error) {
          console.error('Erreur lors de la récupération des détails des recettes aimées :', error);
        }
      };
  
      fetchDetailedRecipes();
    }, [likedRecipes]);

    async function handleClick(recipe) {
        const updatedRecipe = await updateRecipe({ ...recipe, liked: false });
        setRecipes((oldRecipes) =>
          oldRecipes.map((or) =>
            or.id_recipe === updatedRecipe.id_recipe ? updatedRecipe : or
          )
        );
      }

      function handleRemoveList() {
        if (!remove) {
          setTimeout(() => {
            setListDisplay(false);
          }, 200);
          setRemove(true);
        }
      }

    return(
        <div onClick={handleRemoveList} className={styles.container}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${styles.listRecipe} ${remove ? styles.remove : ''}`}
        >
          <h4 className="mb-20">Favoris</h4>
          <ul>
            {detailedRecipes.length &&
              detailedRecipes.map((detailedRecipe)=> (
                <li key={detailedRecipe.id} className="d-flex align-items-center mb-10">
                  <span className="flex-fill mr-15">{detailedRecipe.recipeName}</span>
                  <button
                    onClick={() => handleClick(detailedRecipe)}
                    className="btn btn-danger"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
}

export default ListRecipesUser