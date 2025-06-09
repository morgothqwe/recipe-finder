import * as view from "./view";
import model from "./model";

const init = function () {
  try {
    const recipeName = "pizza";

    model.searchRecipe(recipeName);
  } catch (err) {
    console.log(err.message);
  }
};

init();
