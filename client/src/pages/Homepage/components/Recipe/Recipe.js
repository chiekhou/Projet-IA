import styles from "./Recipe.module.scss";
import {data} from "../../../../apis/image"
import { useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { AuthContext } from "../../../../context"

function Recipe({ recipe, updateRecipe, deleteRecipe }) {

  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  function handleClickLike() {
    updateRecipe({
      ...recipe,
      liked: !recipe.liked,
    });
  }

  async function handleClickDelete(e) {
    e.stopPropagation();
    deleteRecipe(recipe.id_recipe);
  }

  async function handleClickRecipeDetails(e) {
    navigate(`/recipe/${recipe.id_recipe}`);
  
  }

  return (
    <div  className={styles.recipe}>
      <i onClick={handleClickDelete} className="fa-solid fa-xmark"></i>
     
      <div onClick={handleClickRecipeDetails} className={styles.imageContainer}>
      <Link>
      <img src={data[recipe.id_recipe - 1].image} alt={`Image ${recipe.id_recipe}`} />
      </Link>
      </div>
      <div
        className={`d-flex flex-column justify-content-center align-items-center`}
      >
         
        <h3  className="mb-10">{recipe.recipeName}</h3>
  
        {user ? (
        <i onClick={handleClickLike} 
          className={`${styles.recipeName} fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
        ></i>
         ) : ( 
          <Link to="login" className="mr-15 btn btn-reverse-primary" > 
          <i className="fa-solid fa-heart mr-5"></i>
          <span>Favoris</span>
        </Link>
       )} 
      </div>
    </div>
  );
}

export default Recipe;
