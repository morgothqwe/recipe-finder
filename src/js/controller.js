import * as model from "./model";
import view from "./view";

console.log("controller.js loaded, model:", model); // Debug: Confirm model import

const controlNewRecipe = async function (recipe) {
  try {
    console.log("controlNewRecipe, model.state:", model.state); // Debug
    const newRecipe = await model.searchRecipe(recipe);
    if (!model.state || !model.state.pagination) {
      console.error("model.state or model.state.pagination is undefined");
      return;
    }
    const paginatedRecipes = model.getPaginatedRecipes();
    view.renderFood(paginatedRecipes, newRecipe.length);
    view.renderPagination(
      model.state.pagination.currentPage,
      model.getTotalPages()
    );
  } catch (err) {
    console.error("Error in controlNewRecipe:", err.message);
  }
};

const controlBookmark = function ({ recipeId, bookmarkElement }) {
  try {
    console.log("controlBookmark, model.state:", model.state); // Debug
    if (!model.state) {
      console.error("model.state is undefined");
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
  } catch (err) {
    console.error("Error in controlBookmark:", err.message);
  }
};

const controlPagination = function (page) {
  try {
    console.log("controlPagination, model.state:", model.state); // Debug
    if (!model.state || !model.state.pagination) {
      console.error("model.state or model.state.pagination is undefined");
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
    console.error("Error in controlPagination:", err.message);
  }
};

const init = function () {
  view.addHandlerFindFood(controlNewRecipe);
  view.addHandlerBookmark(controlBookmark);
  view.addHandlerPagination(controlPagination);
};

init();
