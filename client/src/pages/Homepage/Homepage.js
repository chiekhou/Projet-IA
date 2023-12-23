import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Search from "./components/Search/Search";
import { useFetchRecipes } from "../../hooks";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectFilteredRecipes,
  recipesState,
} from '../../state';
import { updateRecipe as updateR, deleteRecipe as deleteR } from "../../apis";

function Homepage() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading] = useFetchRecipes(page);
  const recipes = useRecoilValue(selectFilteredRecipes(filter));
  const setRecipes = useSetRecoilState(recipesState);




  async function updateRecipe(updatedRecipe) {
    const savedRecipe = await updateR(updatedRecipe);
    console.log(savedRecipe)
    setRecipes(
      recipes.map((r) => (r.id_recipe === savedRecipe.id_recipe ? savedRecipe : r))
      
    );
  }

  async function deleteRecipe(id_recipe) {
    await deleteR(id_recipe);
    setRecipes(recipes.filter((r) => r.id_recipe !== id_recipe));
  }


  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">
        Découvrez nos nouvelles recettes{" "}
        <small className={styles.small}>- {recipes.length}</small>
      </h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !recipes.length ? (
          
          <Loading />
        ) : (
          <div className={styles.grid}>
            {recipes
              .filter((r) => r.recipeName.toLowerCase().startsWith(filter))
              .map((r) => (
                <Recipe
                  key={r.id_recipe}
                  recipe={r}
                  deleteRecipe={deleteRecipe}
                  updateRecipe={updateRecipe}
                />
              ))}
          </div>
        )}
        <div className="d-flex flex-row justify-content-center align-items-center p-20">
          <button onClick={() => setPage(page + 1)} className="btn btn-primary">
            Charger plus de recettes
          </button>
        </div>
      </div>
    </div>

    
    
  );
}

export default Homepage;
