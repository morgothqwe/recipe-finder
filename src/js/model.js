const state = {
  recipe: [],
  bookmarks: [],
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
        isBookmarked: state.bookmarks.includes(recipe_id),
      })
    );
    state.recipe = recipe || []; // Ensure state.recipe is always an array
    return recipe;
  } catch (err) {
    state.recipe = []; // Reset to empty array on error
    throw new Error(`Failed to fetch recipes: ${err.message}`);
  }
};

export const toggleBookmark = function (recipeId) {
  const index = state.bookmarks.findIndex((id) => id === recipeId);
  if (index === -1) {
    state.bookmarks.push(recipeId);
    return true;
  } else {
    state.bookmarks.splice(index, 1);
    return false;
  }
};

export { state }; // Export state explicitly for debugging (optional, can remove later)
