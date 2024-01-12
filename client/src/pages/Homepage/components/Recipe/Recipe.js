import styles from "./Recipe.module.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context";

function Recipe({ recipe, updateRecipe, deleteRecipe }) {
  const { user } = useContext(AuthContext);

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

  return (
    <div className={styles.recipe}>
      {/* ... autres éléments de la recette */}
      <div className={`d-flex flex-column justify-content-center align-items-center`}>
        <h3 className="mb-10">{recipe.recipeName}</h3>
        <h3 className="mb-10">{recipe.description}</h3>
        {user ? (
          <>
            <i
              onClick={handleClickLike}
              className={`${styles.recipeName} fa-solid fa-heart ${recipe.liked ? 'text-primary' : ''}`}
            ></i>
            <Link to={`/recipe-details/${recipe.id_recipe}`} className="btn btn-reverse-primary">
              <i className="fa-solid fa-comment mr-5"></i>
              <span>Notation et Avis</span>
            </Link>
          </>
        ) : (
          <Link to="login" className="mr-15 btn btn-reverse-primary">
            <i className="fa-solid fa-heart mr-5"></i>
            <span>Favoris</span>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Recipe;
