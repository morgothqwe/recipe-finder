import { STORAGE_KEY } from "./config";

const state = {
  recipe: [],
  bookmarks: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 8,
  },
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
    state.recipe = recipe || [];
    state.pagination.currentPage = 1;
    return recipe;
  } catch (err) {
    state.recipe = [];
    state.pagination.currentPage = 1;
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

export const getPaginatedRecipes = function () {
  if (!state.pagination) return [];
  const { currentPage, itemsPerPage } = state.pagination;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return state.recipe.slice(start, end);
};

export const getTotalPages = function () {
  if (!state.pagination) return 0;
  return Math.ceil(state.recipe.length / state.pagination.itemsPerPage);
};

export const setCurrentPage = function (page) {
  if (!state.pagination) return false;
  if (page < 1 || page > getTotalPages()) return false;
  state.pagination.currentPage = page;
  return true;
};

export const getCurrentPage = function () {
  return state.pagination ? state.pagination.currentPage : 1;
};

export const getRecipeById = function (recipeId) {
  return state.recipe.find((recipe) => recipe.recipe_id === recipeId);
};

export const getRecipeCount = function () {
  return state.recipe.length;
};

export const setLocalStorage = function () {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.bookmarks));
};

export const getLocalStorage = function () {
  const storedBookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (Array.isArray(storedBookmarks)) state.bookmarks = storedBookmarks;
};
