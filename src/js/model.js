const state = {
  recipe: [],
};

export const searchRecipe = async function (recipeName) {
  try {
    if (!recipeName) throw new Error("Recipe name is required");
    const recipeResponse = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${encodeURIComponent(
        recipeName
      )}`
    );
    if (!recipeResponse.ok)
      throw new Error(`HTTP error: ${recipeResponse.status}`);
    const recipeData = await recipeResponse.json();
    if (!recipeData || !recipeData.recipes) throw new Error("No recipes found");
    const recipe = recipeData.recipes.map(
      ({ recipe_id, title, image_url }) => ({
        recipe_id,
        title,
        image_url,
      })
    );
    state.recipe = recipe;
    return recipe;
  } catch (err) {
    throw new Error(`Failed to fetch recipes: ${err.message}`);
  }
};
