import * as model from "./model";
import view from "./view";

const init = function () {
  try {
    const recipeName = "pizza";

    model.searchRecipe(recipeName);
  } catch (err) {
    console.log(err.message);
  }
};

init();
