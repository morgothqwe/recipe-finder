import * as model from "./model";
import view from "./view";

const controlNewRecipe = async function (recipe) {
  try {
    const newRecipe = await model.searchRecipe(recipe);
    view.renderFood(newRecipe);
  } catch (err) {
    console.error("Error in controlNewRecipe:", err.message);
  }
};

const controlBookmark = function ({ recipeId, bookmarkElement }) {
  try {
    if (!model.state) {
      console.error("model.state is undefined");
      return;
    }

    // Toggle bookmark state in model
    const isBookmarked = model.toggleBookmark(recipeId);
    // Render updated bookmark
    view.renderBookmark({ recipeId, bookmarkElement, isBookmarked });

    // Update only the affected recipe card (avoid full re-render for now)
    if (Array.isArray(model.state.recipe) && model.state.recipe.length > 0) {
      const updatedRecipe = model.state.recipe.find(
        (recipe) => recipe.recipe_id === recipeId
      );
      if (updatedRecipe) {
        updatedRecipe.isBookmarked = isBookmarked;
        view.updateSingleCard(updatedRecipe); // Requires new view method
      }
    }
  } catch (err) {
    console.error("Error in controlBookmark:", err.message);
  }
};

const init = function () {
  view.addHandlerFindFood(controlNewRecipe);
  view.addHandlerBookmark(controlBookmark);
};

init();
