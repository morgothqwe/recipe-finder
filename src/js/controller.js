import * as model from "./model";
import view from "./view";

const controlNewRecipe = async function (recipe) {
  try {
    const newRecipe = await model.searchRecipe(recipe);
    if (!model.state || !model.state.pagination) {
      return;
    }
    const paginatedRecipes = model.getPaginatedRecipes();
    view.renderFood(paginatedRecipes, newRecipe.length);
    view.renderPagination(
      model.state.pagination.currentPage,
      model.getTotalPages()
    );
  } catch (err) {
    console.error("Error", err.message);
  }
};

const controlBookmark = function ({ recipeId, bookmarkElement }) {
  try {
    if (!model.state) {
      return;
    }

    const isBookmarked = model.toggleBookmark(recipeId);
    view.renderBookmark({ recipeId, bookmarkElement, isBookmarked });

    if (Array.isArray(model.state.recipe) && model.state.recipe.length > 0) {
      const updatedRecipe = model.state.recipe.find(
        (recipe) => recipe.recipe_id === recipeId
      );
      if (updatedRecipe) {
        updatedRecipe.isBookmarked = isBookmarked;
        view.updateSingleCard(updatedRecipe);
      }
    }
    model.setLocalStorage();
  } catch (err) {
    console.error("Error", err.message);
  }
};

const controlPagination = function (page) {
  try {
    if (!model.state || !model.state.pagination) {
      return;
    }
    if (model.setCurrentPage(page)) {
      const paginatedRecipes = model.getPaginatedRecipes();
      view.renderFood(paginatedRecipes, model.state.recipe.length);
      view.renderPagination(
        model.state.pagination.currentPage,
        model.getTotalPages()
      );
    }
  } catch (err) {
    console.error("Error", err.message);
  }
};

const init = function () {
  model.getLocalStorage();
  view.addHandlerFindFood(controlNewRecipe);
  view.addHandlerBookmark(controlBookmark);
  view.addHandlerPagination(controlPagination);
};

init();
