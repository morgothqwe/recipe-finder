import * as model from "./model";
import view from "./view";

const controlNewRecipe = async function (recipe) {
  try {
    const newRecipe = await model.searchRecipe(recipe);
    if (!newRecipe || newRecipe.length === 0) {
      return;
    }
    const paginatedRecipes = model.getPaginatedRecipes();
    view.renderFood(paginatedRecipes, newRecipe.length);
    view.renderPagination(model.getCurrentPage(), model.getTotalPages());
  } catch (err) {
    console.error("Error", err.message);
  }
};

const controlBookmark = function ({ recipeId, bookmarkElement }) {
  try {
    const isBookmarked = model.toggleBookmark(recipeId);
    view.renderBookmark({ recipeId, bookmarkElement, isBookmarked });

    const updatedRecipe = model.getRecipeById(recipeId);
    if (updatedRecipe) {
      updatedRecipe.isBookmarked = isBookmarked;
      view.updateSingleCard(updatedRecipe);
    }
    model.setLocalStorage();
  } catch (err) {
    console.error("Error", err.message);
  }
};

const controlPagination = function (page) {
  try {
    if (model.setCurrentPage(page)) {
      const paginatedRecipes = model.getPaginatedRecipes();
      if (!paginatedRecipes) return;
      view.renderFood(paginatedRecipes, model.getRecipeCount());
      view.renderPagination(model.getCurrentPage(), model.getTotalPages());
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
