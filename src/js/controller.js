import * as model from "./model";
import view from "./view";

const controlNewRecipe = async function (recipe) {
  try {
    const newRecipe = await model.searchRecipe(recipe);
    view.renderFood(newRecipe);
  } catch (err) {
    console.log(err.message);
  }
};

const init = function () {
  view.addHandlerFindFood(controlNewRecipe);
};

init();
