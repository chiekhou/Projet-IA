const RECIPE_API = "/api/recipes";

export async function getRecipes(queryParam) {
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();
    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Error fetch recipes");
  }
}


export async function getRecipesLikeUser() {
  const response = await fetch(
    `${RECIPE_API}/likeUser`
  );
  if (response.ok) {
    const body = await response.json();
    console.log(body)
    return body;
  } else {
    throw new Error("Error fetch recipes like");
  }
}


export async function getRecipe(id_recipe) {
  const response = await fetch(`${RECIPE_API}/${id_recipe}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error fetch one recipe");
  }
}

export async function deleteRecipe(id_recipe) {
  const response = await fetch(`${RECIPE_API}/${id_recipe}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return id_recipe;
  } else {
    throw new Error("Error delete recipe");
  }
}

export async function updateRecipe(updatedRecipe,authToken) {
  const { id_recipe, ...restRecipe } = updatedRecipe;
  const response = await fetch(`${RECIPE_API}/${id_recipe}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${authToken}`
    },
    body: JSON.stringify(restRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update recipe");
  }
}

export async function createRecipe(newRecipe) {
  const response = await fetch(RECIPE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create recipe");
  }
}

export async function searchRecipe(searchRecipe) {
  const response = await fetch(RECIPE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error create recipe");
  }
}

