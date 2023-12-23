import { selectorFamily , selector } from 'recoil';
import { recipesState } from './atoms';
import { getRecipe } from '../apis';

export const selectFilteredRecipes = selectorFamily({
  key: 'selectFilteredRecipes',
  get:
    (filter) =>
    ({ get }) => {
      const recipes = get(recipesState);
      return (
        recipes.length &&
        recipes.filter((r) => r.recipeName.toLowerCase().startsWith(filter))
      );
    },
});

export const selectActiveRecipe = selectorFamily({
  key: 'selectActiveRecipe',
  get: (recipeId) => async () => recipeId && (await getRecipe(recipeId)),
});

export const selectListRecipes = selector({
  key: 'selectListRecipes',
  get: ({ get }) => get(recipesState)?.filter((r) => r.liked),
});