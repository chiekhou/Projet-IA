import { useFetchRecipes } from "../../../../../../hooks";
import styles from "./AdminRecipesList.module.scss";
import { deleteRecipe as deleteR } from "../../../../../../apis";
import { NavLink } from "react-router-dom";

function AdminRecipesList() {
  const [recipes, setRecipes] = useFetchRecipes();

  async function deleteRecipe(id_recipe) {
    await deleteR(id_recipe);
    setRecipes(recipes.filter((r) => r.id_recipe !== id_recipe));
  }

  return (
    <ul className={styles.list}>
      {recipes.length
        ? recipes.map((r) => (
            <li key={r.id_recipe} className="d-flex align-items-center">
              <span className="flex-fill">{r.recipeName}</span>
              <NavLink to={`../edit/${r.id_recipe}`}>
                <button className="btn btn-primary mr-15">Editer</button>
              </NavLink>
              <button
                onClick={() => deleteRecipe(r.id_recipe)}
                className="btn btn-danger"
              >
                Supprimer
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default AdminRecipesList;
