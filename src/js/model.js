const state = {
  recipe: [],
};

export const searchRecipe = async function (recipeName) {
  try {
    const recipeResponse = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${recipeName}`
    );

    if (!recipeResponse) throw new Error(recipeResponse.status);

    const recipeData = await recipeResponse.json();
    if (!recipeData) throw new Error(recipeData.status);

    console.log(recipeData);
  } catch (err) {
    throw new Error(`Failed, ${err.message}`);
  }
};
